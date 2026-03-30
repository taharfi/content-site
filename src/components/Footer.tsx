import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Mango Oasis. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-4">
            <li><Link href="/privacy/" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-blue-600 transition-colors">Terms of Use</Link></li>
            <li><Link href="/contact/" className="hover:text-blue-600 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
