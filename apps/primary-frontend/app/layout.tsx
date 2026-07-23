import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import './globals.css'
import { Providers } from "../lib/provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Autom8 - Leave the repetitive work to us",
  description: "Monotonous tasks? Let Autom8 handle them for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
