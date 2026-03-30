import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mango Oasis collects, uses, and protects your information.",
  alternates: { canonical: "/privacy/" },
};

export default function Privacy() {
  return (
    <div className="max-w-2xl prose prose-gray">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: March 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          We collect limited information to operate this website. This may include:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Usage data collected automatically by analytics tools (pages visited, time on site, referrer).</li>
          <li>Information you voluntarily provide when contacting us (name, email, message).</li>
          <li>Cookies placed by third-party services (see below).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>To respond to your contact requests.</li>
          <li>To understand how visitors use the site so we can improve content.</li>
          <li>To serve relevant advertisements via Google AdSense.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Google AdSense and Advertising</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          We use Google AdSense to display advertisements. Google may use cookies to serve
          ads based on your prior visits to this and other websites. You can opt out of
          personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on
          your visit to this site and/or other sites on the Internet. For more information, see
          Google&apos;s{" "}
          <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          This site uses cookies for analytics and advertising purposes. You can control cookies
          through your browser settings. Note that disabling cookies may affect site functionality
          and the ads you see.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
        <p className="text-gray-700 leading-relaxed">
          We may use third-party tools such as Google Analytics. These services have their own
          privacy policies governing data use. We do not sell your personal information to any
          third party.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
        <p className="text-gray-700 leading-relaxed">
          Contact form submissions are retained only as long as necessary to respond to your
          inquiry. Analytics data is retained per the policy of the analytics provider used.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
        <p className="text-gray-700 leading-relaxed">
          Depending on your location, you may have rights to access, correct, or delete personal
          data we hold about you. To exercise these rights, contact us at hello@mangoasis.me.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about this policy, email us at{" "}
          <a href="mailto:hello@mangoasis.me" className="text-blue-600 hover:underline">
            hello@mangoasis.me
          </a>.
        </p>
      </section>
    </div>
  );
}
