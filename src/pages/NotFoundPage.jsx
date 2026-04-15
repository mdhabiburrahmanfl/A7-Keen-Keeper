import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="section-wrap pt-8">
      <section className="surface-card relative overflow-hidden px-6 py-16 text-center sm:px-10">
        <div className="pointer-events-none absolute left-10 top-10 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-6 right-10 h-36 w-36 rounded-full bg-blue-300/20 blur-3xl" />
        <span className="eyebrow">404 Page</span>
        <h1 className="mt-4 text-5xl font-bold text-slate-950">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
          The page you were trying to reach does not exist. Let&apos;s get you
          back to the friendship dashboard.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Return Home
        </Link>
      </section>
    </div>
  );
}

export default NotFoundPage;

