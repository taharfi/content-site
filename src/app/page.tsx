import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Mango Oasis — Tech Terms Explained in Plain English",
  description: "Clear, jargon-free explanations of tech and internet terms. No fluff, no assumptions — just real answers.",
  alternates: { canonical: "/" },
};

const topics = [
  { label: "What is a VPN?", href: "/blog/what-is-a-vpn/" },
  { label: "What is DNS?", href: "/blog/what-is-dns/" },
  { label: "What is HTTPS?", href: "/blog/what-is-https/" },
  { label: "What is an API?", href: "/blog/what-is-an-api/" },
  { label: "What is the Cloud?", href: "/blog/what-is-the-cloud/" },
  { label: "What is Cache?", href: "/blog/what-is-cache/" },
];

export default function Home() {
  const articles = getAllArticles().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="hero-grid relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-8 py-16 mb-16 text-center">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
            Plain English Tech Guides
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 text-balance">
            Tech Jargon,{" "}
            <span className="text-indigo-600">Finally Explained</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 text-balance">
            We break down tech and internet terms the way a knowledgeable friend would —
            clearly, honestly, without assuming you already know the answer.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog/"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Browse All Articles
            </Link>
            <Link
              href="/about/"
              className="bg-white text-slate-700 px-6 py-3 rounded-lg text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              About This Site
            </Link>
          </div>
        </div>
      </section>

      {/* Quick topic links */}
      <section className="mb-16">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Popular Topics</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-sm px-4 py-2 rounded-full transition-colors font-medium"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Recent Articles</h2>
          <Link href="/blog/" className="text-sm text-indigo-600 font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => <ArticleCard key={a.slug} {...a} />)}
        </div>
      </section>

      {/* Trust strip */}
      <section className="mt-20 grid sm:grid-cols-3 gap-4">
        {[
          { icon: "✦", title: "Original Content", body: "Every article is written from scratch — no copied or AI-spun text." },
          { icon: "✦", title: "No Fake Reviews", body: "We do not fabricate ratings, testimonials, or endorsements." },
          { icon: "✦", title: "Kept Up to Date", body: "Articles are reviewed and corrected when information changes." },
        ].map(({ icon, title, body }) => (
          <div key={title} className="flex gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50">
            <span className="text-indigo-500 mt-0.5 text-lg leading-none">{icon}</span>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
