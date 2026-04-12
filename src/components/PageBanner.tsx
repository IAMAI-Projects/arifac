interface PageBannerProps {
  label: string;
  title: string;
  description: string;
}

export default function PageBanner({ label, title, description }: PageBannerProps) {
  return (
    <section className="relative bg-white pt-12 pb-10 lg:pt-16 lg:pb-14 overflow-hidden border-b border-neutral-100">
      {/* Asymmetric Brand Element */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-brand/5 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--color-brand)_0%,transparent_70%)] opacity-[0.08]" />
        
        {/* Geometric Accents */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-brand/20 via-brand/5 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-px h-1/2 bg-gradient-to-t from-brand/10 to-transparent rotate-12" />
      </div>

      {/* Background Texture */}
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.03] pointer-events-none" />
      
      {/* Top Accent Segment */}
      <div className="absolute top-0 left-6 w-24 h-[3px] bg-brand" />

      {/* Shield motif (Floating Glass) */}
      <svg className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[220px] h-[220px] hidden lg:block opacity-[0.12] drop-shadow-sm" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 15 L175 55 L175 130 L100 200 L25 130 L25 55 Z" stroke="var(--color-brand)" strokeWidth="1" />
        <path d="M100 40 L155 68 L155 125 L100 175 L45 125 L45 68 Z" stroke="var(--color-brand)" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        <div className="max-w-3xl animate-in">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-brand" />
            <span className="text-[12px] font-black text-brand uppercase tracking-[0.25em]">
              {label}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-black text-neutral-900 leading-[1.1] tracking-tight mb-6">
            {title}
          </h1>

          <p className="text-neutral-600 text-[16px] lg:text-[18px] leading-relaxed max-w-2xl font-medium">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
