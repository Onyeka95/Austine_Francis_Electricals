import { services } from "@/data/services";
import { CONTACT_METHODS } from "@/types";
import type { QuoteFormErrors, QuoteRequestPayload } from "@/types";

/** The dropdown value for "Other / not sure". */
export const OTHER_SERVICE = "other";

/** Longest text allowed in each field. */
export const FIELD_LIMITS = {
  fullName: 100,
  phone: 20,
  email: 120,
  location: 150,
  message: 2000,
  budget: 50,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Turns anything the server receives into a safe QuoteRequestPayload.
 * We never trust the browser: the data could come from anyone.
 */
export function readQuotePayload(raw: unknown): QuoteRequestPayload {
  const data = (typeof raw === "object" && raw !== null ? raw : {}) as Record<
    string,
    unknown
  >;

  const chosenMethod = readText(data.preferredContact);

  return {
    fullName: readText(data.fullName),
    phone: readText(data.phone),
    email: readText(data.email),
    service: readText(data.service),
    location: readText(data.location),
    message: readText(data.message),
    preferredContact:
      CONTACT_METHODS.find((method) => method === chosenMethod) ?? "",
    budget: readText(data.budget),
    website: readText(data.website),
  };
}

/** Checks the form. Returns an empty object when everything is fine. */
export function validateQuote(payload: QuoteRequestPayload): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (payload.fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  } else if (payload.fullName.length > FIELD_LIMITS.fullName) {
    errors.fullName = `Please keep your name under ${FIELD_LIMITS.fullName} characters.`;
  }

  // Allow spaces, dashes and brackets, then expect 7 to 15 digits (an optional + at the start).
  const phoneDigits = payload.phone.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{7,15}$/.test(phoneDigits)) {
    errors.phone = "Please enter a valid phone number, for example 08012345678.";
  }

  if (
    !EMAIL_PATTERN.test(payload.email) ||
    payload.email.length > FIELD_LIMITS.email
  ) {
    errors.email = "Please enter a valid email address.";
  }

  const validServices = [...services.map((service) => service.id), OTHER_SERVICE];
  if (!validServices.includes(payload.service)) {
    errors.service = "Please choose the service you need.";
  }

  if (payload.location.length < 2) {
    errors.location = "Please tell us where the job is.";
  } else if (payload.location.length > FIELD_LIMITS.location) {
    errors.location = `Please keep the location under ${FIELD_LIMITS.location} characters.`;
  }

  if (payload.message.length < 10) {
    errors.message = "Please describe your project (at least 10 characters).";
  } else if (payload.message.length > FIELD_LIMITS.message) {
    errors.message = `Please keep the description under ${FIELD_LIMITS.message} characters.`;
  }

  if (payload.preferredContact === "") {
    errors.preferredContact = "Please choose how we should contact you.";
  }

  if (payload.budget.length > FIELD_LIMITS.budget) {
    errors.budget = `Please keep the budget under ${FIELD_LIMITS.budget} characters.`;
  }

  return errors;
}