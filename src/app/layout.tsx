// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { fetchCategories } from "@/lib/api";
import GlobalPriceTicker from "@/components/GlobalPriceTicker";
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
  description: "বাংলাদেশের বিভিন্ন বাজারের পণ্যের দামের রিয়েল-টাইম আপডেট",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // সার্ভার সাইড থেকে ক্যাটাগরি ডেটা ফেচ করা হচ্ছে
  const categories = await fetchCategories();

  return (
    <html lang="bn" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased flex flex-col bg-gray-50 text-gray-900`}
      >
        {/* Navbar-এ categories প্রপস পাস করা হলো */}
        <Navbar categories={categories} />
<GlobalPriceTicker />
<main>
          {children}
        </main>
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }} 
        />
      </body>
    </html>
  );
}