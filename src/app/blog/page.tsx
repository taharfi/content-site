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
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">All Articles</h1>
        <p className="text-slate-500">
          Plain-English explainers for tech and internet terms — {articles.length} articles and counting.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => <ArticleCard key={a.slug} {...a} />)}
        </div>
      ) : (
        <p className="text-slate-500 py-10">No articles published yet. Check back soon.</p>
      )}
    </>
  );
}
