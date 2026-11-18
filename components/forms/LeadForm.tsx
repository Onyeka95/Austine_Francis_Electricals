"use client"; // uses state and browser events

import { useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

type Status = "idle" | "loading" | "success" | "error";

// Minimum gap between submissions (stops rapid duplicate clicks, LC-4)
const COOLDOWN_MS = 10_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s()-]{7,20}$/;

/** Footer sign-up form. Sends to /api/lead (the API route is built in Phase 9). */
export default function LeadForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot: real people never fill this
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const lastSubmitAt = useRef(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    // Client-side validation (the server validates again in Phase 9)
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    if (phone.trim() !== "" && !PHONE_PATTERN.test(phone.trim())) {
      setStatus("error");
      setMessage("Please enter a valid phone number, or leave it blank.");
      return;
    }

    const now = Date.now();
    if (now - lastSubmitAt.current < COOLDOWN_MS) {
      setStatus("error");
      setMessage("Please wait a few seconds before trying again.");
      return;
    }
    lastSubmitAt.current = now;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), phone: phone.trim(), website }),
      });
      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setMessage("Thank you! We will be in touch soon.");
      setEmail("");
      setPhone("");
    } catch {
      setStatus("error");
      setMessage(`Something went wrong. Please try again or call ${siteConfig.phone}.`);
    }
  }

  const inputClasses =
    "w-full rounded-lg bg-white px-3 py-2.5 text-sm text-brand-ink placeholder:text-brand-muted";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-3">
      <div>
        <label htmlFor="lead-email" className="sr-only">
          Email address
        </label>
        <input
          id="lead-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="lead-phone" className="sr-only">
          Phone number (optional)
        </label>
        <input
          id="lead-phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone number (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* Honeypot field: hidden from people, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-amber px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-amber-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {status === "loading" ? "Sending..." : "Keep me updated"}
      </button>

      {/* aria-live announces the result to screen readers */}
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${
          status === "success" ? "text-green-300" : "text-red-300"
        }`}
      >
        {message}
      </p>
    </form>
  );
}