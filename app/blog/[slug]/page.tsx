import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GalleryImage from "@/components/gallery/GalleryImage";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { siteConfig } from "@/data/siteConfig";
import { formatPostDate } from "@/lib/formatDate";
import { getAllPosts, getPostBySlug } from "@/lib/getPosts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

/** Tells Next.js which post pages to build ahead of time (one per .md file). */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Per-post SEO title, description and Open Graph image (BL-6). */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  // Open Graph needs a full web address for the image.
  const imageUrl = `${siteConfig.siteUrl}${post.coverImage}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Shows your custom 404 page if the post does not exist.
  if (!post) notFound();

  return (
    <article className="bg-white pb-16 pt-10 sm:pt-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-amber-dark"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to blog
        </Link>

        <header className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-amber-dark">
            {post.category}
            <span className="mx-2 text-brand-muted" aria-hidden="true">
              •
            </span>
            <time dateTime={post.date} className="normal-case text-brand-muted">
              {formatPostDate(post.date)}
            </time>
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-brand-navy sm:text-4xl">
            {post.title}
          </h1>
        </header>

        {/* Cover image */}
        <div className="relative mt-8 aspect-[1200/630] w-full overflow-hidden rounded-xl bg-brand-light">
          <GalleryImage
            src={post.coverImage}
            alt={post.title}
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Post body */}
        <div className="mt-8">
          <MarkdownContent content={post.content} />
        </div>

        {/* Call to action */}
        <aside className="mt-12 rounded-2xl border-2 border-brand-amber bg-brand-amber/10 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-brand-navy">
            Need an electrician you can trust?
          </h2>
          <p className="mt-2 text-brand-ink">
            Tell us about your project and we will send you a quotation.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-brand-amber px-5 py-3 text-base font-bold text-brand-navy transition hover:bg-brand-amber-dark"
          >
            Get a Quote
          </Link>
        </aside>
      </div>
    </article>
  );
}