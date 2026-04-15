import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { NewsItem, Header as HeaderType, Footer as FooterType } from '@/payload-types'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getPayload({ config: configPromise })
  const { docs: newsItems } = await payload.find({
    collection: 'news-items',
    where: { published: { equals: true } },
    sort: '-createdAt',
    limit: 20,
  })

  const headerData = await payload.findGlobal({ slug: 'header' }) as HeaderType
  const footerData = await payload.findGlobal({ slug: 'footer' }) as FooterType

  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} h-full font-body min-h-full flex flex-col antialiased bg-white text-slate-900`}>
        <div className="min-h-screen bg-white text-neutral-800 font-sans selection:bg-brand selection:text-white flex flex-col">
          <Header newsItems={newsItems as NewsItem[]} data={headerData} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer data={footerData} />
        </div>
      </body>
    </html>
  )
}
