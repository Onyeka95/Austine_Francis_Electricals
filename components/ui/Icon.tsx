import {
  BadgeCheck,
  Banknote,
  Cable,
  ClipboardCheck,
  Clock,
  HardHat,
  LayoutGrid,
  Lightbulb,
  Plug,
  ShieldCheck,
  Siren,
  Sun,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types";

// Connects each icon name (used in the data files) to a real icon
const icons: Record<IconName, LucideIcon> = {
  zap: Zap,
  cable: Cable,
  plug: Plug,
  lightbulb: Lightbulb,
  wrench: Wrench,
  sun: Sun,
  "clipboard-check": ClipboardCheck,
  siren: Siren,
  "layout-grid": LayoutGrid,
  "shield-check": ShieldCheck,
  "badge-check": BadgeCheck,
  banknote: Banknote,
  clock: Clock,
  "hard-hat": HardHat,
};

interface IconProps {
  name: IconName;
  className?: string;
}

/** Shows an icon from its name. Decorative, so it is hidden from screen readers. */
export default function Icon({ name, className = "h-6 w-6" }: IconProps) {
  const Component = icons[name];
  return <Component className={className} aria-hidden="true" />;
}