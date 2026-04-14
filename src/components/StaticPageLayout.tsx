import type { ReactNode } from "react";
import PageBanner from "@/components/PageBanner";

interface StaticPageLayoutProps {
  label?: string;
  title: string;
  description: string;
  subheading?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  children: ReactNode;
}

export default function StaticPageLayout({
  label,
  title,
  description,
  subheading,
  ctaLabel,
  ctaHref,
  children,
}: StaticPageLayoutProps) {
  return (
    <>
      <PageBanner label={label} title={title} description={description} subheading={subheading} ctaLabel={ctaLabel} ctaHref={ctaHref} />
      {children}
    </>
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
    <section className="py-10 lg:py-14 border-b border-neutral-100">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl mb-7">
          {eyebrow ? (
            <span className="text-[11px] font-bold text-brand tracking-widest uppercase mb-3 block">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="text-2xl lg:text-[34px] font-extrabold text-neutral-900 leading-tight tracking-tight mb-4">
            {title}
          </h2>
          {description ? (
            <p className="text-neutral-600 text-[15px] leading-[1.75]">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
