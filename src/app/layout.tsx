import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "ARIFAC | India’s AML/CFT capability platform supported by FIU India",
  description: "A national, industry-led platform strengthening AML, CFT and Sanctions capability under IAMAI with strategic guidance of FIU-IND.",
  icons: {
    icon: [
      {
        url: '/favicon-dark.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-light.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
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
        className={`${inter.variable} ${jakarta.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
