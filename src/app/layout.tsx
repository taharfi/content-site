import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Mango Oasis",
    template: "%s | Mango Oasis",
  },
  description: "Plain-English explanations of tech and internet terms — no jargon, no fluff.",
  metadataBase: new URL("https://mangoasis.me"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    siteName: "Mango Oasis",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2874230053780091"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
