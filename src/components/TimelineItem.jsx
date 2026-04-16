import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatTimelineDate, interactionMeta } from "../utils/appUtils";

function TimelineItem({ entry, friend }) {
  const meta = interactionMeta[entry.type] ?? interactionMeta.call;
  const Icon = meta.Icon;

  return (
    <article className="dashboard-card interactive-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div
          className={`mt-1 inline-flex h-12 w-12 items-center justify-center rounded-xl ${meta.accentClass}`}
        >
          <Icon size={20} />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-heading text-lg font-semibold text-slate-950">
              {entry.title}
            </h3>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${meta.accentClass}`}
            >
              {meta.label}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {formatTimelineDate(entry.date)}
          </p>

          {friend ? (
            <div className="mt-4 flex items-center gap-3">
              <img
                src={friend.picture}
                alt={friend.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
              />
              <Link
                to={`/friend/${friend.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
              >
                View {friend.name}
                <ArrowUpRight size={15} />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default TimelineItem;
