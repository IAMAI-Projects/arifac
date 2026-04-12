interface PageBannerProps {
  label: string;
  title: string;
  description: string;
}

export default function PageBanner({ label, title, description }: PageBannerProps) {
  return (
    <section className="relative bg-white pt-12 pb-10 lg:pt-14 lg:pb-12 border-b border-neutral-200">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="max-w-3xl animate-in">
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
      </div>
    </section>
  );
}
