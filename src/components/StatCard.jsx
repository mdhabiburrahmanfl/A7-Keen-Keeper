function StatCard({ label, value, helpText }) {
  return (
    <article className="dashboard-card flex min-h-[136px] flex-col items-center justify-center p-6 text-center">
      <h3 className="font-heading text-5xl font-bold tracking-[-0.04em] text-[#295846]">
        {value}
      </h3>
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
      {helpText ? (
        <p className="mt-2 text-xs leading-5 text-slate-400">{helpText}</p>
      ) : null}
    </article>
  );
}

export default StatCard;
