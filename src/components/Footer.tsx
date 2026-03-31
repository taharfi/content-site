import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-20">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-md bg-indigo-600 text-white text-xs font-bold">M</span>
              <span className="text-sm font-bold text-slate-900">Mango Oasis</span>
            </Link>
            <p className="text-xs text-slate-500 max-w-xs">
              Plain-English explanations of tech and internet terms.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
              <li><Link href="/blog/" className="hover:text-indigo-600 transition-colors">Articles</Link></li>
              <li><Link href="/about/" className="hover:text-indigo-600 transition-colors">About</Link></li>
              <li><Link href="/contact/" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
              <li><Link href="/privacy/" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="hover:text-indigo-600 transition-colors">Terms of Use</Link></li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} Mango Oasis. All rights reserved.</p>
      </div>
    </footer>
  );
}
