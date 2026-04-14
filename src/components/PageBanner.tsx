import Link from "next/link";

interface PageBannerProps {
  label: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageBanner({ label, title, description, ctaLabel, ctaHref }: PageBannerProps) {
  return (
    <section className="relative bg-white pt-12 pb-10 lg:pt-14 lg:pb-12 border-b border-neutral-200">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-start justify-between gap-8 animate-in">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-[2px] bg-brand flex-shrink-0" />
              <span className="text-[11px] lg:text-[12px] font-bold text-brand uppercase tracking-[0.25em]">
                {label}
              </span>
            </div>

            <h1 className="text-[28px] md:text-[32px] lg:text-[36px] font-extrabold text-neutral-900 leading-[1.12] tracking-tight mb-5">
              {title}
            </h1>

            <p className="text-neutral-600 text-[15px] lg:text-[16px] leading-[1.7] max-w-2xl">
              {description}
            </p>
          </div>

          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="hidden lg:inline-flex items-center gap-2 shrink-0 self-center bg-brand text-white text-[13px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-brand/90 transition-colors group/cta"
            >
              {ctaLabel}
              <svg className="w-4 h-4 -rotate-45 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
