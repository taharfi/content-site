import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "All articles published on Mango Oasis — practical guides and in-depth explainers.",
  alternates: { canonical: "/blog/" },
};

export default function Blog() {
  const articles = getAllArticles();

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">All Articles</h1>
      <p className="text-gray-600 mb-8">
        Plain-English explainers for tech and internet terms — written for real people, not engineers.
      </p>

      {articles.length > 0 ? (
        articles.map((a) => <ArticleCard key={a.slug} {...a} />)
      ) : (
        <p className="text-gray-500 py-10">No articles published yet. Check back soon.</p>
      )}
    </>
  );
}
