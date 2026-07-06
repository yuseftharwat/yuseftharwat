import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

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
  metadataBase: new URL("https://yuseftharwat.com"),
  title: {
    default: "Yusef Tharwat | Premium 3D Product Animation & CGI Artist",
    template: "%s | Yusef Tharwat",
  },
  description:
    "Yusef Tharwat is a premium 3D product animation and CGI artist specializing in product visualization, CGI commercials, motion design, and VFX. Expert in Blender, creating photorealistic renders for brands.",
  keywords: [
    "3D Product Animation",
    "Product Visualization",
    "CGI Commercial",
    "CGI Advertisement",
    "Motion Design",
    "Motion Designer",
    "3D Artist",
    "Blender Artist",
    "Product Rendering",
    "Product Animation Studio",
    "CGI Artist",
    "3D Motion Graphics",
    "Commercial CGI",
    "Product Animation",
    "3D Rendering",
  ],
  authors: [{ name: "Yusef Tharwat", url: "https://yuseftharwat.com" }],
  creator: "Yusef Tharwat",
  publisher: "Yusef Tharwat",
  category: "Design & Creative Services",
  applicationName: "Yusef Tharwat Portfolio",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.jpeg", type: "image/jpeg", sizes: "32x32" },
    ],
    apple: [
      { url: "/icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Yusef Tharwat",
    title: "Yusef Tharwat | Premium 3D Product Animation & CGI Artist",
    description:
      "Commercial-quality CGI, product animation, and motion design for premium brands. Specializing in 3D product visualization, CGI commercials, and motion design.",
    url: "https://yuseftharwat.com",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Yusef Tharwat - 3D Product Animation & CGI Artist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yuseftharwat",
    creator: "@yuseftharwat",
    title: "Yusef Tharwat | Premium 3D Product Animation & CGI Artist",
    description:
      "Commercial-quality CGI, product animation, and motion design for premium brands. Specializing in 3D product visualization, CGI commercials, and motion design.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Yusef Tharwat - 3D Product Animation & CGI Artist Portfolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "c8vwpcb-LdQDO_boA1C9ya5NUyvFWI_SMwro-0MlE7M",
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
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${body.variable} ${heading.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://image.mux.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t)){document.documentElement.classList.add("dark");localStorage.setItem("theme","dark");}else if(t==="light"){document.documentElement.classList.remove("dark");}var l=localStorage.getItem("locale");if(!l){localStorage.setItem("locale","en");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-body antialiased transition-colors duration-400">
        <ThemeProvider>
          <Nav dict={dict.nav} locale={locale} />
          <main id="main-content">{children}</main>
          <Footer dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
