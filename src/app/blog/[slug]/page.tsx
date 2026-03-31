import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${params.slug}/` },
    openGraph: { title: article.title, description: article.description, type: "article" },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const wordCount = article.content.split(/\s+/).length;
  const readTime = Math.max(2, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-8"
      >
        ← All Articles
      </Link>

      {/* Article header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">Explainer</span>
          <span className="text-xs text-slate-400">{readTime} min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 text-balance">
          {article.title}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-6">{article.description}</p>
        <div className="flex items-center gap-3 py-4 border-y border-slate-100">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            M
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">{article.author}</p>
            <p className="text-xs text-slate-400">{article.date}</p>
          </div>
        </div>
      </header>

      {/* Article body */}
      <div className="prose prose-slate prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8
        prose-p:text-slate-600 prose-p:leading-relaxed
        prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-slate-800 prose-strong:font-semibold
        prose-li:text-slate-600
        prose-ul:my-4 prose-ol:my-4
        prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
      ">
        <MDXRemote source={article.content} />
      </div>

      {/* Footer CTA */}
      <div className="mt-14 p-6 rounded-xl bg-indigo-50 border border-indigo-100">
        <p className="text-sm font-semibold text-slate-900 mb-1">Found this helpful?</p>
        <p className="text-sm text-slate-600 mb-4">Browse more plain-English explanations of tech and internet terms.</p>
        <Link
          href="/blog/"
          className="inline-block bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Browse All Articles
        </Link>
      </div>
    </div>
  );
}
