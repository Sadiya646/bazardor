
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { fetchCategories } from "@/lib/api";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর - BazarDor",
  description:
    "বাংলাদেশের বিভিন্ন বাজারের পণ্যের দামের রিয়েল-টাইম আপডেট",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetchCategories();

  return (
    <html lang="bn" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col bg-gray-50 text-gray-900 antialiased`}
      >
        <Navbar categories={categories} />

        {children}

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
