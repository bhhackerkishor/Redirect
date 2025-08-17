import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import Navbar from "@/components/Navbar";
import Providers from "@/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qroly - Smart Payments & Donations",
  description:
    "Qroly helps you collect payments and donations seamlessly with or without fixed amounts. Simple, secure, and user-friendly.",
  keywords: [
    "Qroly",
    "donations",
    "payment platform",
    "fixed amount payment",
    "donation platform",
    "fundraising",
    "secure payments",
  ],
  authors: [{ name: "Qroly Team", url: "https://qroly.com" }],
  creator: "Qroly",
  publisher: "Qroly",
  metadataBase: new URL("https://qroly.com"),
  openGraph: {
    title: "Qroly - Smart Payments & Donations",
    description:
      "Collect payments and donations easily with Qroly. Choose fixed or flexible amounts with a professional, secure platform.",
    url: "https://qroly.com",
    siteName: "Qroly",
    images: [
      {
        url: "/og-image.png", // add your custom OG image in /public
        width: 1200,
        height: 630,
        alt: "Qroly - Smart Payments & Donations",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qroly - Smart Payments & Donations",
    description:
      "Collect payments and donations easily with Qroly. Choose fixed or flexible amounts with a professional, secure platform.",
    images: ["/og-image.png"], // same as OG image
    creator: "@qroly", // replace if you create a Twitter handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
