import { statusMeta } from "../utils/appUtils";

function StatusBadge({ status }) {
  const meta = statusMeta[status] ?? statusMeta["on-track"];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${meta.className}`}
    >
      {meta.label.replace("On-track", "On-Track")}
    </span>
  );
}

export default StatusBadge;
