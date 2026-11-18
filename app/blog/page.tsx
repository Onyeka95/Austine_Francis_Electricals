import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/getPosts";

export const metadata: Metadata = {
  title: "Blog: Projects, Tips and News",
  description:
    "Project write-ups, electrical safety tips and news from Austine Francis Electricals in Onitsha, Anambra State.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Page heading */}
      <section className="bg-brand-navy py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Project write-ups, electrical safety tips and news from our work in
            Onitsha and surrounding areas.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="py-12 text-center text-brand-muted">
              No posts yet. Please check back soon.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}