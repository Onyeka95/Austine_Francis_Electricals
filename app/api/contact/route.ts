import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { buildQuoteEmail } from "@/lib/quoteEmail";
import { isRateLimited } from "@/lib/rateLimit";
import { getEmailSettings } from "@/lib/resend";
import { readQuotePayload, validateQuote } from "@/lib/validateQuote";
import type { ApiResponse } from "@/types";

/** Small helper so every reply has the same shape. */
function reply(body: ApiResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  // 1. Rate limit by visitor address (CT-5).
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(`contact:${ip}`)) {
    return reply(
      {
        ok: false,
        message: `You have sent several requests already. Please wait a few minutes, or call us on ${siteConfig.phone}.`,
      },
      429
    );
  }

  // 2. Read the body. Refuse anything unreasonably large (CT-5 length check).
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 10_000) {
      return reply({ ok: false, message: "That request is too large." }, 413);
    }
    raw = JSON.parse(text);
  } catch {
    return reply({ ok: false, message: "We could not read that request." }, 400);
  }

  const payload = readQuotePayload(raw);

  // 3. Spam trap (CT-5). Real people never fill the hidden field. A bot does,
  //    so we pretend it worked and send nothing.
  if (payload.website !== "") {
    return reply({ ok: true }, 200);
  }

  // 4. Validate on the server too (section 14.3).
  const errors = validateQuote(payload);
  if (Object.keys(errors).length > 0) {
    return reply(
      { ok: false, message: "Please check the highlighted fields.", errors },
      400
    );
  }

  // 5. Check that email is set up.
  const settings = getEmailSettings();
  if (!settings) {
    console.error(
      "Email is not set up. Add RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL to .env.local."
    );
    return reply(
      {
        ok: false,
        message: `Our contact form is not available right now. Please call or WhatsApp us on ${siteConfig.phone}.`,
      },
      500
    );
  }

  // 6. Send the email. replyTo makes "Reply" in Gmail go straight to the visitor.
  const email = buildQuoteEmail(payload);
  try {
    const { error } = await settings.client.emails.send({
      from: settings.from,
      to: [settings.to],
      replyTo: payload.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    if (error) {
      console.error("Resend could not send the email:", error);
      return reply(
        {
          ok: false,
          message: `We could not send your request. Please try again, or call or WhatsApp us on ${siteConfig.phone}.`,
        },
        502
      );
    }
  } catch (error) {
    console.error("Unexpected error while sending email:", error);
    return reply(
      {
        ok: false,
        message: `Something went wrong. Please try again, or call or WhatsApp us on ${siteConfig.phone}.`,
      },
      502
    );
  }

  return reply(
    {
      ok: true,
      message: "Thank you! Your request has been sent. We will contact you soon.",
    },
    200
  );
}