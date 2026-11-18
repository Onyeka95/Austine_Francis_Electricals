import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

/**
 * Tailwind classes for each Markdown element, so posts have good typography
 * without extra plugins. Edit here to change how every post looks.
 * An h1 inside a post is shown as an h2, because the post title is already the page's one H1.
 */
const components: Components = {
  h1: ({ children }) => (
    <h2 className="mb-3 mt-10 text-2xl font-bold text-brand-navy">{children}</h2>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-10 text-2xl font-bold text-brand-navy">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-8 text-xl font-semibold text-brand-navy">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-base leading-8 text-brand-ink">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-brand-ink">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-brand-ink">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-8">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-brand-navy">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-brand-amber bg-brand-light py-3 pl-5 pr-4 italic text-brand-ink">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    // Links to other websites open in a new tab.
    const isExternal = typeof href === "string" && href.startsWith("http");
    return (
      <a
        href={href}
        className="font-medium text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-amber-dark"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};

interface MarkdownContentProps {
  content: string;
}

/** Renders the Markdown body of a blog post (BL-2). */
export default function MarkdownContent({ content }: MarkdownContentProps) {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}