import { Plus, Trash2 } from "lucide-react";
import { formatNaira } from "@/lib/formatNaira";
import { createEmptyItem, sanitizeDecimal } from "@/lib/quotationMath";
import type { QuoteItem } from "@/types";
import { inputClass } from "./Field";

// Column widths on larger screens: S/N, description, quantity, unit price, total, delete button.
const ROW_GRID =
  "md:grid md:grid-cols-[2.5rem_minmax(0,1fr)_6rem_9rem_9rem_2.5rem] md:gap-3";

const cellLabelClass =
  "mb-1 block text-xs font-semibold text-brand-muted md:sr-only";

interface ItemsEditorProps {
  items: QuoteItem[];
  rowTotals: number[];
  onChange: (items: QuoteItem[]) => void;
}

export default function ItemsEditor({
  items,
  rowTotals,
  onChange,
}: ItemsEditorProps) {
  function updateItem(id: string, patch: Partial<QuoteItem>) {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  // S/N numbers come from the position in the list, so they renumber by themselves.
  function removeItem(id: string) {
    const remaining = items.filter((item) => item.id !== id);
    onChange(remaining.length > 0 ? remaining : [createEmptyItem()]);
  }

  function addItem() {
    onChange([...items, createEmptyItem()]);
  }

  return (
    <div>
      {/* Column titles, shown on larger screens only */}
      <div
        className={`hidden border-b border-brand-navy/10 pb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted ${ROW_GRID}`}
        aria-hidden="true"
      >
        <span className="text-center">S/N</span>
        <span>Materials / Tools / Equipment</span>
        <span>Quantity</span>
        <span>Unit Price (₦)</span>
        <span className="text-right">Total (₦)</span>
        <span />
      </div>

      <ul className="mt-3 space-y-3 md:mt-3">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`rounded-xl border border-brand-navy/10 bg-brand-light p-3 md:items-start md:border-0 md:bg-transparent md:p-0 ${ROW_GRID}`}
          >
            <p className="mb-2 text-sm font-bold text-brand-navy md:mb-0 md:pt-3 md:text-center">
              <span className="md:hidden">Item </span>
              {index + 1}
            </p>

            <div className="mb-3 md:mb-0">
              <label htmlFor={`item-desc-${item.id}`} className={cellLabelClass}>
                Description of item {index + 1}
              </label>
              <textarea
                id={`item-desc-${item.id}`}
                rows={2}
                value={item.description}
                placeholder="e.g. 2.5mm copper wire (roll)"
                onChange={(event) =>
                  updateItem(item.id, { description: event.target.value })
                }
                className={inputClass}
              />
            </div>

            {/* On phones: quantity and price sit side by side. On larger screens this wrapper disappears. */}
            <div className="mb-3 grid grid-cols-2 gap-3 md:contents">
              <div>
                <label htmlFor={`item-qty-${item.id}`} className={cellLabelClass}>
                  Quantity
                </label>
                <input
                  id={`item-qty-${item.id}`}
                  type="text"
                  inputMode="decimal"
                  value={item.quantity}
                  placeholder="0"
                  onChange={(event) =>
                    updateItem(item.id, {
                      quantity: sanitizeDecimal(event.target.value),
                    })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`item-price-${item.id}`} className={cellLabelClass}>
                  Unit price (₦)
                </label>
                <input
                  id={`item-price-${item.id}`}
                  type="text"
                  inputMode="decimal"
                  value={item.unitPrice}
                  placeholder="0"
                  onChange={(event) =>
                    updateItem(item.id, {
                      unitPrice: sanitizeDecimal(event.target.value),
                    })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center justify-between md:block md:pt-3 md:text-right">
              <span className="text-xs font-semibold text-brand-muted md:sr-only">
                Total
              </span>
              <span className="font-semibold text-brand-navy">
                {formatNaira(rowTotals[index])}
              </span>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label={`Delete item ${index + 1}`}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-brand-navy/20 px-3 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white md:mt-0 md:h-11 md:w-10 md:px-0"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              <span className="md:hidden">Delete item</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={addItem}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-brand-navy px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add row
      </button>
    </div>
  );
}