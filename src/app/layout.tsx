import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yuseftharwat.com"),
  title: {
    default: "Yusef Tharwat — 3D Product Visualization & Motion Design",
    template: "%s — Yusef Tharwat",
  },
  description:
    "Yusef Tharwat is a 3D product visualization and motion designer creating commercial-quality CGI for brands, startups, and agencies.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "Yusef Tharwat",
    title: "Yusef Tharwat — 3D Product Visualization & Motion Design",
    description:
      "Commercial-quality CGI, product animation, and motion design for premium brands.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yusef Tharwat Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yusef Tharwat — 3D Product Visualization & Motion Design",
    description:
      "Commercial-quality CGI, product animation, and motion design for premium brands.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { cookies } from "next/headers";
import { dictionaries, Locale } from "@/lib/dictionaries";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as Locale) || "en";
  const dict = dictionaries[locale] || dictionaries.en;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${body.variable} ${heading.variable}`}>
      <head />
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        <Nav dict={dict.nav} locale={locale} />
        <main>{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
