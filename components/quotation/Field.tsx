import { sanitizeDecimal } from "@/lib/quotationMath";

/** Shared look for every input box. */
export const inputClass =
  "w-full rounded-lg border border-brand-navy/20 bg-white px-3 py-2.5 text-base text-brand-ink placeholder:text-brand-muted";

const labelClass = "mb-1 block text-sm font-semibold text-brand-ink";

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "date" | "email" | "tel";
  hint?: string;
}

/** A labelled single-line text box. */
export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
      {hint && <p className="mt-1 text-xs text-brand-muted">{hint}</p>}
    </div>
  );
}

interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
}

/** A labelled box that accepts numbers only (digits and one decimal point). */
export function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder = "0",
  hint,
}: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(sanitizeDecimal(event.target.value))}
        className={inputClass}
      />
      {hint && <p className="mt-1 text-xs text-brand-muted">{hint}</p>}
    </div>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}

/** A labelled multi-line text box. */
export function TextAreaField({
  id,
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
      {hint && <p className="mt-1 text-xs text-brand-muted">{hint}</p>}
    </div>
  );
}