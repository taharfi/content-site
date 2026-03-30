import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

export default function ArticleCard({ slug, title, description, date, author }: ArticleMeta) {
  return (
    <article className="border-b border-gray-200 py-6 last:border-0">
      <p className="text-xs text-gray-400 mb-1">{date} · {author}</p>
      <h2 className="text-xl font-semibold mb-2">
        <Link href={`/blog/${slug}/`} className="text-gray-900 hover:text-blue-600 transition-colors">
          {title}
        </Link>
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      <Link href={`/blog/${slug}/`} className="inline-block mt-3 text-sm text-blue-600 hover:underline">
        Read more →
      </Link>
    </article>
  );
}
