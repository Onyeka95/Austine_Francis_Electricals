import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";

/** Folder that holds the Markdown posts. */
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

/**
 * gray-matter turns an unquoted date like 2026-11-10 into a Date object.
 * We always want a plain "YYYY-MM-DD" string, so we convert it here.
 */
function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : "";
}

/** Reads one .md file and returns it as a BlogPost. */
function readPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw); // data = frontmatter, content = the post body

  return {
    slug,
    title: String(data.title ?? slug),
    date: toDateString(data.date),
    coverImage: String(data.coverImage ?? ""),
    excerpt: String(data.excerpt ?? ""),
    category: String(data.category ?? "General"),
    content,
  };
}

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** One post by its slug, or null if it does not exist. */
export function getPostBySlug(slug: string): BlogPost | null {
  // Only allow simple slugs, so nobody can ask for a file outside the blog folder.
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;

  const fileName = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, fileName))) return null;
  return readPost(fileName);
}