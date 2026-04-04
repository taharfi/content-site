"use client";

import { useEffect, useMemo, useState } from "react";

type AffiliateItem = {
  id: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  url: string;
  gradient: string;
  buttonBackground: string;
  buttonColor: string;
};

type AffiliateWidgetProps = {
  slug: string;
  articleTitle: string;
};

const AMAZON_TAG = "mangoasis10-20";
const DESKTOP_BREAKPOINT = 900;

const desktopBaseStyle = {
  position: "fixed" as const,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 9990,
  display: "flex",
  alignItems: "stretch",
  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
};

function titleCaseFromSlug(slug: string) {
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

function getGearQuery(slug: string, articleTitle: string) {
  const haystack = `${slug} ${articleTitle}`.toLowerCase();

  if (/wi-fi|router|dns|bandwidth/.test(haystack)) {
    return "home networking gear";
  }

  if (/vpn|firewall|phishing|malware|encryption|https|two-factor/.test(haystack)) {
    return "online security books and security keys";
  }

  if (/bluetooth/.test(haystack)) {
    return "bluetooth accessories";
  }

  if (/browser|cookie|cache|metadata/.test(haystack)) {
    return "privacy and web browsing books";
  }

  if (/cloud|api|localhost|ip address/.test(haystack)) {
    return "computer networking and web development books";
  }

  return null;
}

function buildAffiliateItems(slug: string, articleTitle: string): AffiliateItem[] {
  const topic = titleCaseFromSlug(slug);
  const items: AffiliateItem[] = [
    {
      id: "books",
      badge: "Affiliate Pick",
      title: `Explore books about ${topic}`,
      description: `Want to go deeper after reading this guide? Browse books and reference titles related to ${topic} on Amazon.`,
      buttonText: "Browse on Amazon",
      url: createAmazonSearch(`${articleTitle} books`),
      gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #a855f7 100%)",
      buttonBackground: "#eef2ff",
      buttonColor: "#4338ca",
    },
  ];

  const gearQuery = getGearQuery(slug, articleTitle);

  if (gearQuery) {
    items.push({
      id: "gear",
      badge: "Affiliate Pick",
      title: `See related ${gearQuery}`,
      description: "If you are comparing products or setting things up at home, this link opens a relevant Amazon search for the topic covered in this article.",
      buttonText: "View on Amazon",
      url: createAmazonSearch(gearQuery),
      gradient: "linear-gradient(135deg, #0f766e 0%, #0891b2 55%, #06b6d4 100%)",
      buttonBackground: "#ecfeff",
      buttonColor: "#0f766e",
    });
  }

  return items;
}

export default function AffiliateWidget({ slug, articleTitle }: AffiliateWidgetProps) {
  const items = useMemo(() => buildAffiliateItems(slug, articleTitle), [slug, articleTitle]);
  const [isMobile, setIsMobile] = useState(false);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [leftDismissed, setLeftDismissed] = useState(false);
  const [rightDismissed, setRightDismissed] = useState(false);
  const [mobileDismissed, setMobileDismissed] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT}px)`);
    const onChange = () => setIsMobile(media.matches);

    onChange();
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    try {
      setLeftOpen(localStorage.getItem("affiliate_widget_left_open") !== "0");
      setRightOpen(localStorage.getItem("affiliate_widget_right_open") !== "0");
      setLeftDismissed(localStorage.getItem(`affiliate_widget_left_dismissed:${slug}`) === "1");
      setRightDismissed(localStorage.getItem(`affiliate_widget_right_dismissed:${slug}`) === "1");
      setMobileDismissed(localStorage.getItem(`affiliate_widget_mobile_dismissed:${slug}`) === "1");
    } catch {}
  }, [slug]);

  useEffect(() => {
    if (!isMobile || mobileDismissed || items.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setMobileIndex((current) => (current + 1) % items.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [isMobile, mobileDismissed, items.length]);

  if (items.length === 0) {
    return null;
  }

  const leftItem = items[0] ?? null;
  const rightItem = items[1] ?? null;
  const mobileItem = items[mobileIndex] ?? items[0];

  const persistToggle = (key: string, value: boolean) => {
    try {
      localStorage.setItem(key, value ? "1" : "0");
    } catch {}
  };

  const persistDismiss = (key: string) => {
    try {
      localStorage.setItem(key, "1");
    } catch {}
  };

  return (
    <>
      {!isMobile && leftItem && !leftDismissed ? (
        <div id="affiliate-left-float" style={{ ...desktopBaseStyle, left: 0 }}>
          <button
            type="button"
            aria-label={leftOpen ? "Collapse recommendations" : "Expand recommendations"}
            onClick={() => {
              const next = !leftOpen;
              setLeftOpen(next);
              persistToggle("affiliate_widget_left_open", next);
            }}
            className="hidden md:block text-white text-[10px] font-extrabold uppercase tracking-[0.2em] px-2 py-4 rounded-r-xl shadow-lg select-none"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              background: "linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%)",
            }}
          >
            Amazon Picks
          </button>
          <DesktopPanel
            item={leftItem}
            isOpen={leftOpen}
            side="left"
            onDismiss={() => {
              setLeftDismissed(true);
              persistDismiss(`affiliate_widget_left_dismissed:${slug}`);
            }}
          />
        </div>
      ) : null}

      {!isMobile && rightItem && !rightDismissed ? (
        <div id="affiliate-right-float" style={{ ...desktopBaseStyle, right: 0 }}>
          <DesktopPanel
            item={rightItem}
            isOpen={rightOpen}
            side="right"
            onDismiss={() => {
              setRightDismissed(true);
              persistDismiss(`affiliate_widget_right_dismissed:${slug}`);
            }}
          />
          <button
            type="button"
            aria-label={rightOpen ? "Collapse recommendations" : "Expand recommendations"}
            onClick={() => {
              const next = !rightOpen;
              setRightOpen(next);
              persistToggle("affiliate_widget_right_open", next);
            }}
            className="hidden md:block text-white text-[10px] font-extrabold uppercase tracking-[0.2em] px-2 py-4 rounded-l-xl shadow-lg select-none"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              background: "linear-gradient(180deg, #0f766e 0%, #0891b2 100%)",
            }}
          >
            Amazon Picks
          </button>
        </div>
      ) : null}

      {isMobile && !mobileDismissed ? (
        <div className="fixed inset-x-3 bottom-3 z-[9999] md:hidden">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="relative px-4 pb-4 pt-4 text-white"
              style={{ background: mobileItem.gradient, minHeight: 170 }}
            >
              <button
                type="button"
                aria-label="Dismiss affiliate recommendations"
                onClick={() => {
                  setMobileDismissed(true);
                  persistDismiss(`affiliate_widget_mobile_dismissed:${slug}`);
                }}
                className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white"
              >
                x
              </button>

              <div className="mb-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em]">
                {mobileItem.badge}
              </div>
              <p className="mb-2 max-w-[90%] text-xl font-black leading-tight">{mobileItem.title}</p>
              <p className="mb-4 text-sm leading-6 text-white/90">{mobileItem.description}</p>
              <a
                href={mobileItem.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold"
                style={{ background: mobileItem.buttonBackground, color: mobileItem.buttonColor }}
              >
                {mobileItem.buttonText} {"->"}
              </a>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Show affiliate suggestion ${index + 1}`}
                      onClick={() => setMobileIndex(index)}
                      className={`h-2 w-2 rounded-full ${index === mobileIndex ? "bg-white" : "bg-white/35"}`}
                    />
                  ))}
                </div>

                {items.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => setMobileIndex((current) => (current + 1) % items.length)}
                    className="rounded-full bg-white/15 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em]"
                  >
                    Switch
                  </button>
                ) : null}
              </div>

              <p className="mt-3 text-center text-[10px] text-white/75">
                Affiliate disclosure: As an Amazon Associate, we may earn from qualifying purchases.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function DesktopPanel({
  item,
  isOpen,
  side,
  onDismiss,
}: {
  item: AffiliateItem;
  isOpen: boolean;
  side: "left" | "right";
  onDismiss: () => void;
}) {
  return (
    <div
      style={{
        width: isOpen ? 320 : 0,
        overflow: "hidden",
        transition: "width 0.25s ease",
        borderTopLeftRadius: side === "right" ? 18 : 0,
        borderBottomLeftRadius: side === "right" ? 18 : 0,
        borderTopRightRadius: side === "left" ? 18 : 0,
        borderBottomRightRadius: side === "left" ? 18 : 0,
        boxShadow: side === "left" ? "6px 0 26px rgba(15, 23, 42, 0.18)" : "-6px 0 26px rgba(15, 23, 42, 0.18)",
      }}
    >
      <div
        className="relative flex min-h-[220px] flex-col justify-center px-6 pb-5 pt-6 text-white"
        style={{ background: item.gradient }}
      >
        <button
          type="button"
          aria-label="Dismiss affiliate recommendations"
          onClick={onDismiss}
          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white"
        >
          x
        </button>
        <div className="mb-3 inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em]">
          {item.badge}
        </div>
        <p className="mb-3 text-[1.95rem] font-black leading-none">{item.title}</p>
        <p className="mb-5 text-sm leading-6 text-white/90">{item.description}</p>
        <a
          href={item.url}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold"
          style={{ background: item.buttonBackground, color: item.buttonColor }}
        >
          {item.buttonText} {"->"}
        </a>
        <p className="mt-3 text-center text-[10px] text-white/75">
          Affiliate disclosure: As an Amazon Associate, we may earn from qualifying purchases.
        </p>
      </div>
    </div>
  );
}
