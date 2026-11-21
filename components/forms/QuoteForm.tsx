"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Check, MessageCircle } from "lucide-react";
import { services } from "@/data/services";
import { whatsappLink } from "@/lib/whatsappLink";
import {
  FIELD_LIMITS,
  OTHER_SERVICE,
  validateQuote,
} from "@/lib/validateQuote";
import { CONTACT_METHODS } from "@/types";
import type {
  ApiResponse,
  QuoteFormErrors,
  QuoteRequestPayload,
} from "@/types";
import FormField, { controlClass } from "./FormField";

type Status = "idle" | "submitting" | "success" | "error";

/** The fields that can show an error, in the order they appear on the page. */
const FIELD_ORDER: (keyof QuoteFormErrors)[] = [
  "fullName",
  "phone",
  "email",
  "service",
  "location",
  "message",
  "preferredContact",
  "budget",
];

function emptyForm(service: string): QuoteRequestPayload {
  return {
    fullName: "",
    phone: "",
    email: "",
    service,
    location: "",
    message: "",
    preferredContact: "WhatsApp",
    budget: "",
    website: "",
  };
}

interface QuoteFormProps {
  /** A service id to pre-select, from /contact?service=... (SV-1). */
  initialService?: string;
}

export default function QuoteForm({ initialService = "" }: QuoteFormProps) {
  const [values, setValues] = useState<QuoteRequestPayload>(() =>
    emptyForm(initialService)
  );
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  // After a successful send, move the screen reader and keyboard focus to the thank-you message.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  /** Changes one field, and clears that field's error. */
  function setField<K extends keyof QuoteRequestPayload>(
    key: K,
    value: QuoteRequestPayload[K]
  ) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  /** Attributes that tell screen readers a field has an error. */
  function ariaFor(field: keyof QuoteFormErrors) {
    return {
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? `quote-${field}-error` : undefined,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // stops double clicks sending twice

    // Check the form in the browser first (CT-2).
    const found = validateQuote(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`quote-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as ApiResponse;

      if (response.ok && result.ok) {
        setValues(emptyForm(initialService));
        setErrors({});
        setStatus("success");
        return;
      }

      if (result.errors) setErrors(result.errors);
      setServerMessage(
        result.message ?? "Something went wrong. Please try again."
      );
      setStatus("error");
    } catch {
      setServerMessage(
        "We could not reach the server. Please check your internet connection and try again."
      );
      setStatus("error");
    }
  }

  // ---------- Success message (CT-3) ----------
  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border-2 border-brand-amber bg-brand-amber/10 p-6 text-center sm:p-8"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-amber text-brand-navy">
          <Check className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-brand-navy">
          Your request has been sent
        </h2>
        <p className="mt-2 text-brand-ink">
          Thank you. We will contact you as soon as possible. For something urgent,
          message us on WhatsApp.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-amber px-5 py-3 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Chat on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="rounded-lg border-2 border-brand-navy px-5 py-3 text-base font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  // ---------- The form (CT-1) ----------
  return (
    <form
      onSubmit={handleSubmit}
      noValidate // we show our own clear messages instead of the browser's
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="quote-fullName"
          label="Full name"
          required
          error={errors.fullName}
        >
          <input
            id="quote-fullName"
            type="text"
            autoComplete="name"
            maxLength={FIELD_LIMITS.fullName}
            value={values.fullName}
            onChange={(event) => setField("fullName", event.target.value)}
            className={controlClass(Boolean(errors.fullName))}
            {...ariaFor("fullName")}
          />
        </FormField>

        <FormField id="quote-phone" label="Phone" required error={errors.phone}>
          <input
            id="quote-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            placeholder="08012345678"
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            className={controlClass(Boolean(errors.phone))}
            {...ariaFor("phone")}
          />
        </FormField>
      </div>

      <FormField id="quote-email" label="Email" required error={errors.email}>
        <input
          id="quote-email"
          type="email"
          autoComplete="email"
          maxLength={FIELD_LIMITS.email}
          value={values.email}
          onChange={(event) => setField("email", event.target.value)}
          className={controlClass(Boolean(errors.email))}
          {...ariaFor("email")}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="quote-service"
          label="Service needed"
          required
          error={errors.service}
        >
          <select
            id="quote-service"
            value={values.service}
            onChange={(event) => setField("service", event.target.value)}
            className={controlClass(Boolean(errors.service))}
            {...ariaFor("service")}
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
            <option value={OTHER_SERVICE}>Other / not sure</option>
          </select>
        </FormField>

        <FormField
          id="quote-location"
          label="Job location"
          required
          error={errors.location}
          hint="Town and area, for example Fegge, Onitsha."
        >
          <input
            id="quote-location"
            type="text"
            maxLength={FIELD_LIMITS.location}
            value={values.location}
            onChange={(event) => setField("location", event.target.value)}
            className={controlClass(Boolean(errors.location))}
            {...ariaFor("location")}
          />
        </FormField>
      </div>

      <FormField
        id="quote-message"
        label="Project description"
        required
        error={errors.message}
        hint="Tell us what you need done, the size of the property, and when you want it done."
      >
        <textarea
          id="quote-message"
          rows={5}
          maxLength={FIELD_LIMITS.message}
          value={values.message}
          onChange={(event) => setField("message", event.target.value)}
          className={controlClass(Boolean(errors.message))}
          {...ariaFor("message")}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="quote-preferredContact"
          label="How should we contact you?"
          required
          error={errors.preferredContact}
        >
          <select
            id="quote-preferredContact"
            value={values.preferredContact}
            onChange={(event) => {
              const chosen = CONTACT_METHODS.find(
                (method) => method === event.target.value
              );
              setField("preferredContact", chosen ?? "");
            }}
            className={controlClass(Boolean(errors.preferredContact))}
            {...ariaFor("preferredContact")}
          >
            {CONTACT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="quote-budget"
          label="Budget"
          error={errors.budget}
          hint="An estimate helps us recommend the right materials."
        >
          <input
            id="quote-budget"
            type="text"
            maxLength={FIELD_LIMITS.budget}
            placeholder="e.g. ₦150,000"
            value={values.budget}
            onChange={(event) => setField("budget", event.target.value)}
            className={controlClass(Boolean(errors.budget))}
            {...ariaFor("budget")}
          />
        </FormField>
      </div>

      {/* Spam trap (CT-5): hidden from people, but bots fill it in. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="quote-website">Leave this field empty</label>
        <input
          id="quote-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setField("website", event.target.value)}
        />
      </div>

      {/* Error from the server (CT-3) */}
      {status === "error" && serverMessage && (
        <p
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-amber px-6 py-3 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-brand-navy border-t-transparent"
              aria-hidden="true"
            />
            Sending...
          </>
        ) : (
          "Request a Quote"
        )}
      </button>
    </form>
  );
}