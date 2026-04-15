function SummaryCard({ icon: Icon, title, value, subtitle, accent }) {
  return (
    <article className="surface-card h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-950">{value}</h3>
        </div>
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}
        >
          <Icon size={22} />
        </div>
      </div>
      <p className="mt-6 text-sm leading-6 text-slate-500">{subtitle}</p>
    </article>
  );
}

export default SummaryCard;
