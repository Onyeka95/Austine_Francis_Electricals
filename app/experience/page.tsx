import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Timeline from "@/components/experience/Timeline";
import ClientsStrip from "@/components/experience/ClientsStrip";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A timeline of electrical projects completed by Austine Francis Electricals, and the clients and companies we have worked with.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        title="Professional Experience"
        subtitle="Proof of the work we have done for homes, shops and companies."
      />
      <Timeline />
      <ClientsStrip />
      <CtaBanner />
    </>
  );
}