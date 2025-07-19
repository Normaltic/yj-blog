import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";

import ThemeWidget from "@/components/theme/ThemeWidget";
import SyncThemeScript from "@/components/theme/SyncThemeScript";

import "./globals.css";
import GoogleAnalytics from "@/components/ga/GoogleAnalytics";

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
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${pretendard.className} bg-background text-foreground linear-transition-colors`}
      >
        <SyncThemeScript />
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          )}
        <header className="flex justify-between items-end max-w-4xl m-auto py-6 px-4 border-primary border-b-2">
          <Link href="/">
            <h1 className="text-4xl">Blog</h1>
          </Link>
          <div>
            <Link href="/about">
              <h2 className="text-xl">About</h2>
            </Link>
          </div>
        </header>
        <main className="max-w-4xl m-auto py-6 px-4">{children}</main>
        <ThemeWidget className="fixed bottom-4 right-4" />
        <footer className="h-20" />
      </body>
    </html>
  );
}
