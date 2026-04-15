import { Archive, Clock3, Mail, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";
import LoadingScreen from "../components/LoadingScreen";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { useAppData } from "../context/AppDataContext";
import { formatDisplayDate } from "../utils/appUtils";

const quickActions = [
  {
    type: "call",
    label: "Call",
    icon: callIcon,
    className: "bg-sky-50 text-sky-700 hover:bg-sky-100",
  },
  {
    type: "text",
    label: "Text",
    icon: textIcon,
    className: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  },
  {
    type: "video",
    label: "Video",
    icon: videoIcon,
    className: "bg-violet-50 text-violet-700 hover:bg-violet-100",
  },
];

function FriendDetailsPage() {
  const { friendId } = useParams();
  const { loading, getFriendById, addTimelineEntry, updateGoal } = useAppData();
  const friend = getFriendById(friendId);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [pendingGoal, setPendingGoal] = useState("");

  useEffect(() => {
    if (friend) {
      setPendingGoal(String(friend.goal));
    }
  }, [friend]);

  function handleCheckIn(type) {
    if (!friend) {
      return;
    }

    addTimelineEntry(friend, type);
    toast.success(`${type[0].toUpperCase()}${type.slice(1)} logged for ${friend.name}.`);
  }

  function handleGoalSave() {
    const saved = updateGoal(friend.id, pendingGoal);

    if (!saved) {
      toast.error("Please enter a valid goal in days.");
      return;
    }

    setIsEditingGoal(false);
    toast.success(`Goal updated for ${friend.name}.`);
  }

  if (loading) {
    return (
      <div className="section-wrap pt-8">
        <LoadingScreen label="Loading friend details..." />
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="section-wrap pt-8">
        <section className="surface-card p-8 text-center">
          <h1 className="text-3xl font-bold text-slate-950">
            Friend not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            This profile does not exist or may have been removed.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="section-wrap space-y-6 pt-8">
      <div>
        <span className="eyebrow">Friend Details</span>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">
          {friend.name}
        </h1>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.35fr]">
        <article className="surface-card p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <img
              src={friend.picture}
              alt={friend.name}
              className="h-36 w-36 rounded-[2rem] object-cover ring-4 ring-slate-100"
            />

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold text-slate-950">
                  {friend.name}
                </h2>
                <StatusBadge status={friend.status} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {friend.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-600">{friend.bio}</p>

            <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <Mail size={18} className="text-slate-400" />
              {friend.email}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Clock3 size={17} />
                Snooze 2 Weeks
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Archive size={17} />
                Archive
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                <Trash2 size={17} />
                Delete
              </button>
            </div>
          </div>
        </article>

        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Days Since Contact"
              value={friend.days_since_contact}
              helpText="Updated automatically whenever you log a check-in."
            />
            <StatCard
              label="Goal"
              value={`${friend.goal} days`}
              helpText="How often you want to reach out to this friend."
            />
            <StatCard
              label="Next Due Date"
              value={formatDisplayDate(friend.next_due_date)}
              helpText="The next suggested date to reconnect."
            />
          </section>

          <section className="surface-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="eyebrow">Relationship Goal</span>
                <h2 className="mt-3 text-2xl font-bold text-slate-950">
                  Keep {friend.name.split(" ")[0]} in the loop every{" "}
                  {friend.goal} days.
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-7 text-slate-500">
                  Adjust the cadence whenever this relationship needs more or
                  less attention.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingGoal((currentValue) => !currentValue)}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <PencilLine size={16} />
                Edit
              </button>
            </div>

            {isEditingGoal ? (
              <div className="mt-5 flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                <label className="text-sm font-medium text-slate-700">
                  Goal in days
                </label>
                <input
                  type="number"
                  min="1"
                  value={pendingGoal}
                  onChange={(event) => setPendingGoal(event.target.value)}
                  className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                />
                <button
                  type="button"
                  onClick={handleGoalSave}
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Save
                </button>
              </div>
            ) : null}
          </section>

          <section className="surface-card p-6">
            <span className="eyebrow">Quick Check-In</span>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              {quickActions.map((action) => (
                <button
                  key={action.type}
                  type="button"
                  onClick={() => handleCheckIn(action.type)}
                  className={`flex flex-1 items-center justify-center gap-3 rounded-[1.5rem] px-5 py-4 text-sm font-semibold transition ${action.className}`}
                >
                  <img src={action.icon} alt="" className="h-6 w-6" />
                  {action.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Every action creates a fresh timeline entry with today&apos;s date
              so the rest of the dashboard stays up to date.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}

export default FriendDetailsPage;

