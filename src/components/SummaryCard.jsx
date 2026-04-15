function SummaryCard({ icon: Icon, title, value, subtitle, accent }) {
  return (
    <article className="dashboard-card flex h-full flex-col items-center justify-center p-6 text-center">
      <div
        className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full ${accent}`}
      >
        <Icon size={18} />
      </div>
      <h3 className="text-4xl font-bold text-[#295846]">{value}</h3>
      <p className="mt-3 text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-xs leading-5 text-slate-400">{subtitle}</p>
    </article>
  );
}

export default SummaryCard;
