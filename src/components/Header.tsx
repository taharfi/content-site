import Link from "next/link";

const nav = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-900 hover:text-blue-600">
          Mango Oasis
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex gap-6 text-sm font-medium text-gray-600">
            {nav.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-blue-600 transition-colors">
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
