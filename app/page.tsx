import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import AboutPreview from "@/components/home/AboutPreview";
import CtaBanner from "@/components/home/CtaBanner";
import type { Metadata } from "next";

// The home page uses the default title and description from app/layout.tsx.
// This is a server component. Only FadeIn and SafeImage run in the browser.
export const metadata: Metadata = {
  title: {
    absolute: "Austine Francis Electricals | Electrician in Onitsha, Anambra State",
  },
  description:
    "Professional electrical wiring, installations, repairs and electrical materials in Onitsha and surrounding areas. Request a free quote or call today.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <FeaturedProjects />
      <WhyChooseUs />
      <Testimonials />
      <AboutPreview />
      <CtaBanner />
    </>
  );
}