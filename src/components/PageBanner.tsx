interface PageBannerProps {
  label: string;
  title: string;
  description: string;
}

export default function PageBanner({ label, title, description }: PageBannerProps) {
  return (
    <section className="relative bg-navy pt-10 pb-10 lg:pt-14 lg:pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand/[0.05] to-transparent pointer-events-none hidden lg:block" />

      {/* Shield motif */}
      <svg className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[200px] h-[200px] hidden lg:block" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 15 L175 55 L175 130 L100 200 L25 130 L25 55 Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" />
        <path d="M100 40 L155 68 L155 125 L100 175 L45 125 L45 68 Z" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="100" y1="40" x2="100" y2="175" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <line x1="45" y1="96" x2="155" y2="96" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <circle cx="100" cy="15" r="2.5" fill="rgba(255,255,255,0.08)" />
        <circle cx="175" cy="55" r="2" fill="rgba(255,255,255,0.06)" />
        <circle cx="25" cy="55" r="2" fill="rgba(255,255,255,0.06)" />
        <circle cx="100" cy="200" r="2.5" fill="rgba(255,255,255,0.08)" />
      </svg>

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="max-w-2xl animate-in">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-12 bg-brand-light/40" />
            <span className="text-[12px] font-bold text-brand-light/70 uppercase tracking-[0.2em]">
              {label}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-[36px] font-extrabold !text-white leading-[1.15] tracking-tight mb-4">
            {title}
          </h1>

          <p className="text-slate-300 text-[15px] lg:text-[16px] leading-[1.75] max-w-xl">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand via-brand-light to-transparent" />
    </section>
  );
}
