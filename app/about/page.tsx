import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import AboutStory from "@/components/about/AboutStory";
import SkillsSection from "@/components/about/SkillsSection";
import CredentialsSection from "@/components/about/CredentialsSection";
import ValuesSection from "@/components/about/ValuesSection";
import ServiceAreasSection from "@/components/about/ServiceAreasSection";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Iwuji C.A. Francis and Austine Francis Electricals: our story, skills, values and the areas we serve in Onitsha and Anambra State.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Safe, neat and honest electrical work in Onitsha and surrounding areas."
      />
      <AboutStory />
      <SkillsSection />
      <CredentialsSection />
      <ValuesSection />
      <ServiceAreasSection />
      <CtaBanner />
    </>
  );
}