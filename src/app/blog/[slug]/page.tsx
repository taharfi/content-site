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

  return (
    <article className="max-w-2xl">
      <Link href="/blog/" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← All Articles
      </Link>
      <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
      <p className="text-sm text-gray-400 mb-8">{article.date} · {article.author}</p>
      <div className="prose prose-gray max-w-none">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
