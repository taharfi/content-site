import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Mango Oasis — Tech Terms Explained in Plain English",
  description: "Clear, jargon-free explanations of tech and internet terms. No fluff, no assumptions — just real answers.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <>
      <section className="py-10 border-b border-gray-200 mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tech Terms Explained in Plain English
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          We explain tech and internet jargon the way a knowledgeable friend would — clearly,
          honestly, without assuming you already know what everything means.
        </p>
        <Link
          href="/blog/"
          className="inline-block mt-6 bg-blue-600 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Browse All Articles
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Articles</h2>
        {articles.length > 0 ? (
          articles.map((a) => <ArticleCard key={a.slug} {...a} />)
        ) : (
          <p className="text-gray-500 py-6">No articles yet. Check back soon.</p>
        )}
        {articles.length > 0 && (
          <Link href="/blog/" className="inline-block mt-4 text-blue-600 text-sm hover:underline">
            View all articles →
          </Link>
        )}
      </section>

      <section className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
        {[
          { title: "Original Research", body: "Every article is written from scratch based on real information." },
          { title: "No Fake Reviews", body: "We don't fabricate ratings, testimonials, or endorsements." },
          { title: "Updated Regularly", body: "Articles are reviewed and updated to stay accurate over time." },
        ].map(({ title, body }) => (
          <div key={title} className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
