import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function FriendCard({ friend }) {
  return (
    <Link
      to={`/friend/${friend.id}`}
      className="dashboard-card group flex h-full flex-col items-center p-6 text-center transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="h-20 w-20 rounded-full object-cover"
      />

      <div className="mt-5 w-full">
        <h3 className="font-heading text-[1.95rem] font-bold leading-none tracking-[-0.03em] text-slate-800">
          {friend.name}
        </h3>
        <p className="mt-3 text-sm text-slate-400">
          {friend.days_since_contact}d ago
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#c6f6d4] px-3 py-1 text-xs font-medium uppercase text-[#295846]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <StatusBadge status={friend.status} />
        </div>
      </div>
    </Link>
  );
}

export default FriendCard;
