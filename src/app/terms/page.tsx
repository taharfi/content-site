import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for using Mango Oasis.",
  alternates: { canonical: "/terms/" },
};

export default function Terms() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: March 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing and using Mango Oasis (&quot;the Site&quot;), you agree to be bound by these Terms of
          Use. If you do not agree, please do not use the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Content and Accuracy</h2>
        <p className="text-gray-700 leading-relaxed">
          We strive to publish accurate, up-to-date information. However, content on this Site
          is provided for informational purposes only. We make no guarantees about the
          completeness or accuracy of any article. Always verify important information with
          authoritative sources.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Intellectual Property</h2>
        <p className="text-gray-700 leading-relaxed">
          All content on this Site — including articles, text, and design — is owned by Mango Oasis
          unless otherwise noted. You may not reproduce, republish, or distribute our content
          without prior written permission. Brief quotations with attribution are permitted.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Advertising</h2>
        <p className="text-gray-700 leading-relaxed">
          This Site displays advertisements served by Google AdSense and potentially other
          ad networks. Advertisements are clearly distinguished from editorial content.
          We do not endorse the products or services advertised.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          To the fullest extent permitted by law, Mango Oasis shall not be liable for any indirect,
          incidental, or consequential damages arising from your use of the Site or reliance on
          any content published here.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. External Links</h2>
        <p className="text-gray-700 leading-relaxed">
          The Site may contain links to third-party websites. These are provided for convenience
          only. We have no control over external sites and are not responsible for their content
          or privacy practices.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">7. Changes to These Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update these terms from time to time. Continued use of the Site after changes
          are posted constitutes acceptance of the updated terms. For questions, contact us at{" "}
          <a href="mailto:hello@mangoasis.me" className="text-blue-600 hover:underline">
            hello@mangoasis.me
          </a>.
        </p>
      </section>
    </div>
  );
}
