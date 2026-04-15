import { Archive, BellRing, PencilLine, Trash2 } from "lucide-react";
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
    className: "border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100",
  },
  {
    type: "text",
    label: "Text",
    icon: textIcon,
    className: "border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100",
  },
  {
    type: "video",
    label: "Video",
    icon: videoIcon,
    className: "border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100",
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
    <div className="section-wrap pb-8 pt-14">
      <section className="mx-auto grid max-w-5xl gap-6 xl:grid-cols-[0.92fr_1.9fr]">
        <div className="space-y-4">
          <article className="dashboard-card p-8 text-center">
            <div className="flex flex-col items-center gap-5">
            <img
              src={friend.picture}
              alt={friend.name}
              className="h-20 w-20 rounded-full object-cover"
            />

            <div>
              <h1 className="font-heading text-[2.4rem] font-bold tracking-[-0.04em] text-slate-800">
                {friend.name}
              </h1>

              <div className="mt-4 flex flex-col items-center gap-3">
                <StatusBadge status={friend.status} />

                <div className="flex flex-wrap justify-center gap-2">
                {friend.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#c6f6d4] px-3 py-1 text-xs font-medium uppercase text-[#295846]"
                  >
                    {tag}
                  </span>
                ))}
                </div>
              </div>
            </div>

              <p className="text-lg italic leading-8 text-[#7183a1]">
                "{friend.bio}"
              </p>
              <p className="text-sm text-slate-500">Preferred: email</p>
            </div>
          </article>

          <div className="space-y-3">
            <button
              type="button"
              className="dashboard-card inline-flex w-full items-center justify-center gap-3 px-4 py-4 text-lg font-medium text-slate-800 transition hover:bg-slate-50"
            >
              <BellRing size={18} />
              Snooze 2 Weeks
            </button>
            <button
              type="button"
              className="dashboard-card inline-flex w-full items-center justify-center gap-3 px-4 py-4 text-lg font-medium text-slate-800 transition hover:bg-slate-50"
            >
              <Archive size={18} />
              Archive
            </button>
            <button
              type="button"
              className="dashboard-card inline-flex w-full items-center justify-center gap-3 px-4 py-4 text-lg font-medium text-[#ff4b47] transition hover:bg-rose-50"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Days Since Contact"
              value={friend.days_since_contact}
            />
            <StatCard label="Goal (Days)" value={friend.goal} />
            <StatCard
              label="Next Due"
              value={formatDisplayDate(friend.next_due_date)}
            />
          </section>

          <section className="dashboard-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[#295846]">
                  Relationship Goal
                </h2>
                <p className="mt-5 text-xl text-[#7183a1]">
                  Connect every <span className="font-bold text-slate-800">{friend.goal} days</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingGoal((currentValue) => !currentValue)}
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <PencilLine size={15} />
                Edit
              </button>
            </div>

            {isEditingGoal ? (
              <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center">
                <label className="text-sm font-medium text-slate-700">
                  Goal in days
                </label>
                <input
                  type="number"
                  min="1"
                  value={pendingGoal}
                  onChange={(event) => setPendingGoal(event.target.value)}
                  className="h-12 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                />
                <button
                  type="button"
                  onClick={handleGoalSave}
                  className="rounded-md bg-[#295846] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#224839]"
                >
                  Save
                </button>
              </div>
            ) : null}
          </section>

          <section className="dashboard-card p-6">
            <h2 className="text-2xl font-semibold text-[#295846]">
              Quick Check-In
            </h2>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              {quickActions.map((action) => (
                <button
                  key={action.type}
                  type="button"
                  onClick={() => handleCheckIn(action.type)}
                  className={`flex min-h-[116px] flex-1 flex-col items-center justify-center gap-3 rounded-xl px-5 py-4 text-xl font-medium transition ${action.className}`}
                >
                  <img src={action.icon} alt="" className="h-8 w-8" />
                  {action.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default FriendDetailsPage;
