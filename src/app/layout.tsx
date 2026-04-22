import type { Metadata } from "next";
import "./globals.css";
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  return {
    title: settings.siteTitle || "ARIFAC — Alliance of Reporting Entities in India for AML/CFT",
    description: settings.siteDescription || "ARIFAC enables collaboration, capacity building, and coordinated action to strengthen India's financial crime prevention ecosystem under the guidance of FIU-IND.",
    appleWebApp: {
      title: "ARIFAC",
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
