import { services } from "@/data/services";
import { OTHER_SERVICE } from "@/lib/validateQuote";
import type { QuoteRequestPayload } from "@/types";

/** Stops visitor text from being read as HTML inside the email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** 08149589933 becomes 2348149589933, the format WhatsApp links need. */
function toWhatsappNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  return digits;
}

function serviceTitle(serviceId: string): string {
  if (serviceId === OTHER_SERVICE) return "Other / not sure";
  return services.find((service) => service.id === serviceId)?.title ?? serviceId;
}

export interface BuiltEmail {
  subject: string;
  html: string;
  text: string;
}

/** Builds the email he receives for a new quote request. */
export function buildQuoteEmail(payload: QuoteRequestPayload): BuiltEmail {
  const service = serviceTitle(payload.service);
  const budget = payload.budget || "Not given";

  // Remove line breaks so nothing can sneak into the subject line.
  const subject = `New quote request: ${service} - ${payload.fullName}`.replace(
    /[\r\n]+/g,
    " "
  );

  const rows: [string, string][] = [
    ["Name", payload.fullName],
    ["Phone", payload.phone],
    ["Email", payload.email],
    ["Service needed", service],
    ["Location", payload.location],
    ["Preferred contact", payload.preferredContact],
    ["Budget", budget],
  ];

  const text =
    `New quote request from the website\n\n` +
    rows.map(([label, value]) => `${label}: ${value}`).join("\n") +
    `\n\nProject description:\n${payload.message}\n\n` +
    `Reply to this email to answer ${payload.fullName} directly.`;

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:6px 12px 6px 0;color:#5b6676;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;color:#1f2937;"><strong>${escapeHtml(value)}</strong></td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
      <h2 style="color:#0b1f3a;margin-bottom:4px;">New quote request</h2>
      <p style="margin-top:0;color:#5b6676;">Sent from your website contact form.</p>
      <table style="border-collapse:collapse;width:100%;font-size:15px;">${tableRows}</table>
      <h3 style="color:#0b1f3a;margin-bottom:6px;">Project description</h3>
      <p style="white-space:pre-line;margin-top:0;font-size:15px;line-height:1.5;">${escapeHtml(payload.message)}</p>
      <p style="margin-top:24px;">
        <a href="https://wa.me/${toWhatsappNumber(payload.phone)}"
           style="background:#f5b301;color:#0b1f3a;padding:10px 16px;text-decoration:none;font-weight:bold;border-radius:6px;display:inline-block;">
          Reply on WhatsApp
        </a>
      </p>
      <p style="color:#5b6676;font-size:13px;">You can also reply to this email to answer ${escapeHtml(payload.fullName)} directly.</p>
    </div>`;

  return { subject, html, text };
}