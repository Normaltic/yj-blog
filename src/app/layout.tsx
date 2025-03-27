import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Yunji's Blog",
  description: "Frontend-developer Yunji Kim's blog"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} linear-transition-color`}>
        <header className="max-w-4xl m-auto py-6 px-4 border-primary border-b-2">
          <Link href="/" className="text-3xl">
            Blog
          </Link>
        </header>
        <main className="max-w-4xl m-auto py-6 px-4">{children}</main>
        <footer />
      </body>
    </html>
  );
}
