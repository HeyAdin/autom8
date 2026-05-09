import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import './globals.css'
import { Navbar } from "@repo/ui/navbar";
import { Container } from "@repo/ui/container";

const manrope = Manrope({
  variable: "--font-manrop",
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
        <Container>
          <Navbar logoStyle="font-display font-bold flex items-center gap-1" classname="flex" />
          {children}
        </Container>
      </body>
    </html>
  );
}
