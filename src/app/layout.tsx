import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
