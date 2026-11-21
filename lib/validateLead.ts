import type { LeadFormErrors, LeadPayload } from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Turns anything the server receives into a safe LeadPayload. */
export function readLeadPayload(raw: unknown): LeadPayload {
  const data = (typeof raw === "object" && raw !== null ? raw : {}) as Record<
    string,
    unknown
  >;

  return {
    email: readText(data.email),
    phone: readText(data.phone),
    website: readText(data.website),
  };
}

/** Checks the lead form. Returns an empty object when everything is fine. */
export function validateLead(payload: LeadPayload): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!EMAIL_PATTERN.test(payload.email) || payload.email.length > 120) {
    errors.email = "Please enter a valid email address.";
  }

  // The phone number is optional, but if it is given it must look right.
  if (payload.phone !== "") {
    const digits = payload.phone.replace(/[\s\-()]/g, "");
    if (!/^\+?\d{7,15}$/.test(digits)) {
      errors.phone = "Please enter a valid phone number or leave it empty.";
    }
  }

  return errors;
}