import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ARIFAC — Alliance of Reporting Entities in India for AML/CFT",
  description:
    "ARIFAC enables collaboration, capacity building, and coordinated action to strengthen India's financial crime prevention ecosystem under the guidance of FIU-IND.",
  appleWebApp: {
    title: "ARIFAC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} h-full`}>
      <body className="font-body min-h-full flex flex-col antialiased bg-white text-slate-900">{children}</body>
    </html>
  );
}
