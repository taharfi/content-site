type AffiliateWidgetProps = {
  slug: string;
  articleTitle: string;
};

const AMAZON_TAG = "mangoasis10-20";

const TOPIC_LABELS: Record<string, string> = {
  "what-is-a-vpn": "VPN",
  "what-is-an-api": "API",
  "what-is-dns": "DNS",
  "what-is-https": "HTTPS",
  "what-is-wi-fi": "Wi-Fi",
  "what-is-an-ip-address": "IP address",
  "what-is-ram": "RAM",
  "what-is-an-ssd": "SSD",
  "what-is-a-cdn": "CDN",
  "what-is-an-ssid": "SSID",
  "what-is-a-mac-address": "MAC address",
};

function titleCaseFromSlug(slug: string) {
  if (TOPIC_LABELS[slug]) {
    return TOPIC_LABELS[slug];
  }

  return slug
    .replace(/^what-is-(an?|the)-/, "")
    .replace(/^what-is-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function createAmazonSearch(query: string) {
  const params = new URLSearchParams({
    k: query,
    linkCode: "ll2",
    tag: AMAZON_TAG,
    language: "en_US",
  });

  return `https://www.amazon.com/s?${params.toString()}`;
}

function getRelatedQuery(slug: string, articleTitle: string) {
  const haystack = `${slug} ${articleTitle}`.toLowerCase();

  if (/wi-fi|router|dns|bandwidth/.test(haystack)) {
    return "home networking books and networking gear";
  }

  if (/vpn|firewall|phishing|malware|encryption|https|two-factor/.test(haystack)) {
    return "online security books and security keys";
  }

  if (/bluetooth/.test(haystack)) {
    return "bluetooth books and bluetooth accessories";
  }

  if (/browser|cookie|cache|metadata/.test(haystack)) {
    return "privacy books and web browsing books";
  }

  if (/cloud|api|localhost|ip address/.test(haystack)) {
    return "computer networking books and web development books";
  }

  return `${articleTitle} books`;
}

export default function AffiliateWidget({ slug, articleTitle }: AffiliateWidgetProps) {
  const topic = titleCaseFromSlug(slug);
  const recommendationUrl = createAmazonSearch(getRelatedQuery(slug, articleTitle));

  return (
    <aside className="mb-10 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
      <div className="mb-3 inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-800">
        Affiliate Recommendation
      </div>

      <h2 className="mb-2 text-2xl font-extrabold text-slate-900">
        Related resources for {topic}
      </h2>
      <p className="mb-4 text-sm leading-6 text-slate-600">
        If you want to keep learning after this article, this link opens a relevant Amazon
        results page for books or tools related to this topic.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={recommendationUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
        >
          Browse Amazon resources
        </a>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
          Amazon affiliate link
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        As an Amazon Associate I earn from qualifying purchases.
      </p>
    </aside>
  );
}
