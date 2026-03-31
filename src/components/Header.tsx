import Link from "next/link";

const nav = [
  { label: "Articles", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold group-hover:bg-indigo-700 transition-colors">M</span>
          <span className="text-base font-bold text-slate-900">Mango Oasis</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {nav.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
