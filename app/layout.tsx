import CommandBar from "@/components/CommandBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-24 pt-0 gap-4">
          <Header />
          <SearchBar />

          {children}
        </main>
      </body>
      <CommandBar />
    </html>
  );
}
