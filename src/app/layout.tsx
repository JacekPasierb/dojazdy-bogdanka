import "./globals.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Dojazdy Bogdanka",
  description:
    "Tablica ogłoszeń dojazdów do i z Bogdanki. Bez kont. Bez logowania.",

  openGraph: {
    title: "Dojazdy do Bogdanki",
    description:
      "Wspólne dojazdy do pracy – szukaj kierowcy, pasażera lub stałej ekipy. Bez kont i logowania.",
    url: "https://dojazdy-bogdanka.netlify.app",
    siteName: "Dojazdy Bogdanka",
    images: [
      {
        url: "https://dojazdy-bogdanka.netlify.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dojazdy do Bogdanki – wspólne dojazdy pracowników",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dojazdy do Bogdanki",
    description: "Tablica ogłoszeń do wspólnych dojazdów do i z Bogdanki.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
      {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
