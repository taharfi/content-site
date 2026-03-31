import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

export default function ArticleCard({ slug, title, description, date }: ArticleMeta) {
  const readTime = Math.max(2, Math.ceil(description.split(" ").length / 4)) + " min read";

  return (
    <Link
      href={`/blog/${slug}/`}
      className="group flex flex-col p-5 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-0.5 rounded-full">
          Explainer
        </span>
        <span className="text-xs text-slate-400">{readTime}</span>
      </div>
      <h2 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
        {title}
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">
        {description}
      </p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-400">{date}</span>
        <span className="text-xs text-indigo-600 font-medium group-hover:underline">Read more →</span>
      </div>
    </Link>
  );
}
