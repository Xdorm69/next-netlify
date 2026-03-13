import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/sidbar/Sidebar";
import Header from "@/components/home/Header";
import MaxWidthWrapper from "@/components/wrapper/MaxWidthWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Netlify",
  description: "Your personal media library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <div className="bg-gradient fixed inset-0 -z-10" />

        <div className="flex min-h-screen">
          {/* SIDEBAR */}
          <Sidebar />

          {/* MAIN CONTENT */}
          <main className="flex-1 lg:ml-60">
            <div className="py-6">
              <MaxWidthWrapper>
                <Header />
              </MaxWidthWrapper>
            </div>

            <div className="">
              <>{children}</>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
