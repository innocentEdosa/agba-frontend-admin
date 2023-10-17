import { Kumbh_Sans, Sora } from "next/font/google";
import "./globals.css";
import Providers from "./provider";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font_primary",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font_tertiary",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${kumbhSans.variable} ${sora.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
