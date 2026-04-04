import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How Mango Oasis uses affiliate links and how those links are disclosed.",
  alternates: { canonical: "/affiliate-disclosure/" },
};

export default function AffiliateDisclosure() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-3xl font-bold">Affiliate Disclosure</h1>
      <p className="mb-8 text-sm text-gray-400">Last updated: April 4, 2026</p>

      <p className="mb-4 text-gray-700 leading-relaxed">
        Some pages on Mango Oasis include affiliate links. If you click one of those links and
        make a qualifying purchase, we may earn a commission at no additional cost to you.
      </p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        As an Amazon Associate I earn from qualifying purchases.
      </p>
      <p className="mb-4 text-gray-700 leading-relaxed">
        Affiliate links do not determine what we write about and do not affect our editorial
        standards. We aim to keep affiliate placements clearly labeled so they can be easily
        distinguished from the main article content.
      </p>
      <p className="text-gray-700 leading-relaxed">
        If you have questions about how affiliate links are used on this site, contact
        {" "}
        <a href="mailto:hello@mangoasis.me" className="text-blue-600 hover:underline">
          hello@mangoasis.me
        </a>
        .
      </p>
    </div>
  );
}
