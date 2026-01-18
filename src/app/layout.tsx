import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dojazdy Bogdanka",
  description: "Tablica ogłoszeń dojazdów do i z Bogdanki. Bez kont. Bez logowania.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
