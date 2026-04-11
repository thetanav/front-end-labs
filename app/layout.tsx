import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Random UIs",
  description:
    "A small personal playground for building random UI experiments: micro-interactions, layout ideas, component patterns, and whatever else I want to prototype fast.",
  openGraph: {
    title: "Random UIs",
    description:
      "A small personal playground for building random UI experiments: micro-interactions, layout ideas, component patterns, and whatever else I want to prototype fast.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Random UIs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random UIs",
    description:
      "A small personal playground for building random UI experiments: micro-interactions, layout ideas, component patterns, and whatever else I want to prototype fast.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
