import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import './globals.css'
import { Container } from "@repo/ui/container";
import { Navbar, navBarLists } from "@repo/ui/navbar";
import { Logo } from "@repo/ui/logo";
import Link from "next/link";
import { Button } from "@repo/ui/button";

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
        <Container className="max-w-7xl mx-auto py-3">
          <Navbar className="flex gap-1 items-center font-display justify-between">
            <div className="flex gap-1 items-center ">
              <Link href='/' className="flex gap-1 items-center">
                <Logo classname="flex gap-1 items-center" />
                <div className="font-black text-2xl leading-0 tracking-tighter flex items-center">Autom <span className="font-bold text-[#ff4f00] text-3xl">8</span></div>
              </Link>
              <div className="flex gap-5 ml-3 ">
                {navBarLists.map((list, index) => {
                  return <Link
                    key={index}
                    href={list.href}
                    className="text-neutral-500 hover:text-neutral-700 font-sans text-md"
                  >{list.title}</Link>
                })}
              </div>
            </div>
            <div className="flex gap-5">
              <Link href="/contact" className="text-neutral-500 hover:text-neutral-700 font-sans text-md">Contact</Link>
              <Link href="/login" className="text-neutral-500 hover:text-neutral-700 font-sans text-md">Login</Link>
              <Link href='/signup' className="text-white bg-[#ff4f00] py-0.5 px-3 rounded-sm font-bold">Sign Up</Link>
            </div>
          </Navbar>
          {children}
        </Container>
      </body>
    </html>
  );
}
