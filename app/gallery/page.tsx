import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery of Electrical Projects",
  description:
    "Photos of wiring, conduit, panel, lighting and solar installations completed by Austine Francis Electricals in Onitsha and Anambra State.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Page heading */}
      <section className="bg-brand-navy py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Our Work</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            A look at some of the wiring, installations, panels, lighting and solar
            jobs we have completed. Tap any photo to view it larger.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* GalleryGrid is a client component; the data is passed in from the server. */}
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </>
  );
}