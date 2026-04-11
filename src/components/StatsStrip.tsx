export default function StatsStrip() {
  const stats = [
    { label: "Reporting Entities", value: "2,500+" },
    { label: "Officers Trained", value: "15,000+" },
    { label: "Sectors Represented", value: "18+" },
    { label: "Years of Collaboration", value: "10+" },
  ];

  return (
    <section className="bg-brand border-y border-white/10 py-8">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left">
              <div className="text-3xl font-bold text-white mb-1.5">{stat.value}</div>
              <div className="text-[11px] font-bold text-brand-on-dark uppercase tracking-[0.15em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
