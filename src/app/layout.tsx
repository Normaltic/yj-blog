import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";

import ThemeWidget from "@/components/widget/ThemeWidget";
import SyncThemeScript from "@/components/widget/SyncThemeScript";

import "./globals.css";

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
      <head>
        <SyncThemeScript />
      </head>
      <body
        className={`${pretendard.className} bg-background text-foreground linear-transition-colors`}
      >
        <header className="max-w-4xl m-auto py-6 px-4 border-primary border-b-2">
          <Link href="/">
            <h1 className="text-4xl">Blog</h1>
          </Link>
        </header>
        <main className="max-w-4xl m-auto py-6 px-4">{children}</main>
        <ThemeWidget className="fixed bottom-4 right-4" />
        <footer className="h-20" />
      </body>
    </html>
  );
}
