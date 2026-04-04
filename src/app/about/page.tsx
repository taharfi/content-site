import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Mango Oasis, why we started, and what we stand for.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">About Mango Oasis</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        Mango Oasis was started because tech jargon is everywhere and clear explanations are
        surprisingly hard to find. Most results are either too technical, too vague, or written
        to rank rather than to actually help.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        We take a different approach: every article is written to genuinely answer the question
        a reader came to ask. We do not accept sponsored content, and we do not fabricate reviews
        or testimonials. If we have not verified something, we say so.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        To help support the site, we may display ads and clearly labeled affiliate links. Those
        links do not change what we write, and any material relationship is disclosed on the page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">What We Cover</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        We cover tech and internet terms — from everyday concepts like DNS, VPNs, and cookies
        to less-obvious things like what an API actually is or why your browser stores cache.
        Written in plain language for people who want real answers, not a computer science lecture.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Editorial Standards</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
        <li>All articles are written or reviewed by a human editor.</li>
        <li>Sources are cited when claims are based on data or third-party research.</li>
        <li>Articles are updated when information changes.</li>
        <li>We disclose any material relationships with companies we mention.</li>
        <li>Affiliate links are labeled so readers can distinguish them from editorial content.</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mt-6">
        Have a question or want to get in touch?{" "}
        <Link href="/contact/" className="text-blue-600 hover:underline">
          Contact us here
        </Link>.
      </p>
    </div>
  );
}
