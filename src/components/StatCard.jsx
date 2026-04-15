function StatCard({ label, value, helpText }) {
  return (
    <article className="surface-card p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <h3 className="mt-4 text-3xl font-bold text-slate-950">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">{helpText}</p>
    </article>
  );
}

export default StatCard;

