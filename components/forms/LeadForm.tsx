"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { validateLead } from "@/lib/validateLead";
import type { ApiResponse, LeadFormErrors, LeadPayload } from "@/types";

type Status = "idle" | "submitting" | "success" | "error";

interface LeadFormProps {
  /** "dark" for a navy footer (default), "light" for a white background. */
  tone?: "dark" | "light";
}

export default function LeadForm({ tone = "dark" }: LeadFormProps) {
  const [values, setValues] = useState<LeadPayload>({
    email: "",
    phone: "",
    website: "",
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // Remembers the last email that signed up, so a double submit does nothing (LC-4).
  const lastSignedUp = useRef("");

  const isDark = tone === "dark";
  const labelClass = `mb-1 block text-sm font-semibold ${
    isDark ? "text-white" : "text-brand-ink"
  }`;
  const errorClass = `mt-1 text-sm font-medium ${
    isDark ? "text-red-300" : "text-red-700"
  }`;
  // The inputs are white on both backgrounds, so they are always easy to read.
  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-3 py-2.5 text-base text-brand-ink placeholder:text-brand-muted ${
      hasError ? "border-red-500" : "border-transparent"
    }`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validateLead(values);
    setErrors(found);
    if (found.email) {
      document.getElementById("lead-email")?.focus();
      return;
    }
    if (found.phone) {
      document.getElementById("lead-phone")?.focus();
      return;
    }

    // Same email as a moment ago: no need to send again.
    if (values.email.toLowerCase() === lastSignedUp.current) {
      setMessage("You are already on our list. Thank you!");
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as ApiResponse;

      if (response.ok && result.ok) {
        lastSignedUp.current = values.email.toLowerCase();
        setValues({ email: "", phone: "", website: "" });
        setMessage(result.message ?? "Thank you! You are on our list.");
        setStatus("success");
        return;
      }

      if (result.errors) setErrors(result.errors);
      setMessage(result.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage(
        "We could not reach the server. Please check your internet connection and try again."
      );
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-email" className={labelClass}>
            Email address
          </label>
          <input
            id="lead-email"
            type="email"
            autoComplete="email"
            maxLength={120}
            value={values.email}
            onChange={(event) => {
              setValues({ ...values, email: event.target.value });
              setErrors({ ...errors, email: undefined });
            }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "lead-email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
          {errors.email && (
            <p id="lead-email-error" role="alert" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-phone" className={labelClass}>
            Phone <span className="font-normal opacity-80">(optional)</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            value={values.phone}
            onChange={(event) => {
              setValues({ ...values, phone: event.target.value });
              setErrors({ ...errors, phone: undefined });
            }}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
          {errors.phone && (
            <p id="lead-phone-error" role="alert" className={errorClass}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Spam trap: hidden from people, but bots fill it in. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="lead-website">Leave this field empty</label>
        <input
          id="lead-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) =>
            setValues({ ...values, website: event.target.value })
          }
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-amber px-5 py-2.5 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark disabled:cursor-not-allowed disabled:opacity-70"
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
          "Sign up"
        )}
      </button>

      {/* Result messages (LC-4) */}
      {status === "success" && (
        <p
          role="status"
          className={`text-sm font-semibold ${
            isDark ? "text-brand-amber" : "text-brand-navy"
          }`}
        >
          {message}
        </p>
      )}
      {status === "error" && message && (
        <p role="alert" className={errorClass}>
          {message}
        </p>
      )}

      <p className={`text-xs ${isDark ? "text-white/70" : "text-brand-muted"}`}>
        We only use your details to send occasional offers and updates. You can
        ask us to remove you at any time.
      </p>
    </form>
  );
}