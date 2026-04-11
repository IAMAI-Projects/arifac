import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

interface StaticPageLayoutProps {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function StaticPageLayout({
  label,
  title,
  description,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-brand selection:text-white flex flex-col antialiased">
      <Header />
      <main className="flex-grow">
        <PageBanner label={label} title={title} description={description} />
        {children}
      </main>
      <Footer />
    </div>
  );
}

interface ContentSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function ContentSection({
  eyebrow,
  title,
  description,
  children,
}: ContentSectionProps) {
  return (
    <section className="py-10 lg:py-14 border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mb-7">
          {eyebrow ? (
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="text-2xl lg:text-[34px] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
            {title}
          </h2>
          {description ? (
            <p className="text-slate-600 text-[15px] leading-[1.75]">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
