import { ArrowUpRight, CalendarDays, Tags } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDisplayDate } from "../utils/appUtils";
import StatusBadge from "./StatusBadge";

function FriendCard({ friend }) {
  return (
    <Link
      to={`/friend/${friend.id}`}
      className="group surface-card flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,30,57,0.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <img
          src={friend.picture}
          alt={friend.name}
          className="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-100"
        />
        <StatusBadge status={friend.status} />
      </div>

      <div className="mt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl font-semibold text-slate-950">
              {friend.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Last check-in {friend.days_since_contact} day
              {friend.days_since_contact === 1 ? "" : "s"} ago
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 text-slate-400 transition group-hover:text-slate-900"
          />
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} className="text-slate-400" />
          Next due {formatDisplayDate(friend.next_due_date)}
        </div>

        <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
          <Tags size={16} className="mt-0.5 shrink-0 text-slate-400" />
          <div className="flex flex-wrap gap-2">
            {friend.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FriendCard;

