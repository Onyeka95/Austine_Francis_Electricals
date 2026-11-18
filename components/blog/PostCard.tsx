import Link from "next/link";
import GalleryImage from "@/components/gallery/GalleryImage";
import { formatPostDate } from "@/lib/formatDate";
import type { BlogPost } from "@/types";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm transition hover:shadow-md">
      {/* Cover image: 1200 x 630, as recommended in the PRD */}
      <div className="relative aspect-[1200/630] w-full bg-brand-light">
        <GalleryImage
          src={post.coverImage}
          alt={post.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-amber-dark">
          {post.category}
          <span className="mx-2 text-brand-muted" aria-hidden="true">
            •
          </span>
          <time dateTime={post.date} className="normal-case text-brand-muted">
            {formatPostDate(post.date)}
          </time>
        </p>

        <h2 className="mt-2 text-lg font-semibold text-brand-navy">
          {/* The link covers the whole card (see the ::after below). */}
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
          {post.excerpt}
        </p>

        <p className="mt-4 text-sm font-semibold text-brand-navy">
          Read more <span aria-hidden="true">→</span>
        </p>
      </div>
    </article>
  );
}