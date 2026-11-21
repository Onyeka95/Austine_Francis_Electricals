import type { ReactNode } from "react";

/** Input look. A red border is used when the field has an error. */
export function controlClass(hasError: boolean): string {
  const base =
    "w-full rounded-lg border bg-white px-3 py-2.5 text-base text-brand-ink placeholder:text-brand-muted";
  return hasError
    ? `${base} border-red-600`
    : `${base} border-brand-navy/20`;
}

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode; // the input, select or textarea
}

/** Label, control, hint and error message, wired up for screen readers. */
export default function FormField({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-semibold text-brand-ink"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-red-600">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-brand-muted"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1 text-xs text-brand-muted">{hint}</p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}