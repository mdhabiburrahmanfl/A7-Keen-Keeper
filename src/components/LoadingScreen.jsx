function LoadingScreen({ label = "Loading your friends..." }) {
  return (
    <div className="surface-card flex min-h-72 flex-col items-center justify-center gap-4 p-10 text-center">
      <div className="loading-orbit">
        <span className="loading-dot" />
      </div>
      <div>
        <h2 className="font-heading text-xl font-semibold text-slate-900">
          One moment
        </h2>
        <p className="mt-2 text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;

