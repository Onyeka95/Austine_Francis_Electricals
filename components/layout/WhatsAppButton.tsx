import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsappLink";

/** Floating WhatsApp button, fixed bottom-right on every page (GL-3). Hidden when printing. */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 print:hidden"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}