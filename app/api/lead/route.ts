import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { isRateLimited } from "@/lib/rateLimit";
import { getEmailSettings } from "@/lib/resend";
import { readLeadPayload, validateLead } from "@/lib/validateLead";
import type { ApiResponse } from "@/types";

function reply(body: ApiResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  // 1. Rate limit: 3 sign-ups per 10 minutes per visitor (LC-4).
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(`lead:${ip}`, 3)) {
    return reply(
      { ok: false, message: "Too many attempts. Please try again in a few minutes." },
      429
    );
  }

  // 2. Read the body, refusing anything unreasonably large.
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 2_000) {
      return reply({ ok: false, message: "That request is too large." }, 413);
    }
    raw = JSON.parse(text);
  } catch {
    return reply({ ok: false, message: "We could not read that request." }, 400);
  }

  const payload = readLeadPayload(raw);

  // 3. Spam trap: a bot fills the hidden field, so we pretend it worked and do nothing.
  if (payload.website !== "") {
    return reply({ ok: true }, 200);
  }

  // 4. Validate on the server too.
  const errors = validateLead(payload);
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
      "Email is not set up. Add RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL."
    );
    return reply(
      {
        ok: false,
        message: `Sign-up is not available right now. Please call or WhatsApp us on ${siteConfig.phone}.`,
      },
      500
    );
  }

  // 6. Send the notification email AND save the contact, at the same time.
  const text =
    `New website sign-up\n\n` +
    `Email: ${payload.email}\n` +
    `Phone: ${payload.phone || "Not given"}\n\n` +
    `This email address was also added to your Resend Contacts list.`;

  const [emailResult, contactResult] = await Promise.allSettled([
    settings.client.emails.send({
      from: settings.from,
      to: [settings.to],
      replyTo: payload.email,
      subject: "New website sign-up",
      text,
    }),
    settings.client.contacts.create({
      email: payload.email,
      unsubscribed: false,
    }),
  ]);

  // The Resend library returns { data, error } instead of throwing, so check both ways.
  const emailOk =
    emailResult.status === "fulfilled" && !emailResult.value.error;
  const contactOk =
    contactResult.status === "fulfilled" && !contactResult.value.error;

  if (!emailOk) console.error("Lead email failed:", emailResult);
  if (!contactOk) console.error("Saving the contact failed:", contactResult);

  // If both failed, tell the visitor. If one worked, the lead is safe.
  if (!emailOk && !contactOk) {
    return reply(
      {
        ok: false,
        message: "We could not save your details. Please try again in a moment.",
      },
      502
    );
  }

  return reply({ ok: true, message: "Thank you! You are on our list." }, 200);
}