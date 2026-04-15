import {
  Activity,
  AlertTriangle,
  TimerReset,
  UserPlus,
  Users,
} from "lucide-react";
import FriendCard from "../components/FriendCard";
import LoadingScreen from "../components/LoadingScreen";
import SummaryCard from "../components/SummaryCard";
import { useAppData } from "../context/AppDataContext";

const summaryConfig = [
  {
    key: "totalFriends",
    title: "Total Friends",
    subtitle: "Everyone you are intentionally keeping close right now.",
    icon: Users,
    accent: "bg-slate-900 text-white",
  },
  {
    key: "overdueFriends",
    title: "Overdue Check-ins",
    subtitle: "These friendships need attention before they drift too far.",
    icon: AlertTriangle,
    accent: "bg-rose-100 text-rose-700",
  },
  {
    key: "almostDueFriends",
    title: "Almost Due",
    subtitle: "Good moment for a quick message before they become overdue.",
    icon: TimerReset,
    accent: "bg-amber-100 text-amber-700",
  },
  {
    key: "totalInteractions",
    title: "Timeline Entries",
    subtitle: "Calls, texts, and video check-ins already logged in the app.",
    icon: Activity,
    accent: "bg-cyan-100 text-cyan-700",
  },
];

function HomePage() {
  const { loading, error, friends, summary } = useAppData();

  function scrollToFriends() {
    document.getElementById("friends-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="section-wrap space-y-8 pt-8">
      <section className="surface-card relative overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full bg-cyan-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-8 h-44 w-44 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Relationship Dashboard</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Keep your people close without relying on memory alone.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            KeenKeeper helps you see who needs a check-in, spot overdue
            friendships, and log thoughtful contact moments in a couple of taps.
          </p>
          <button
            type="button"
            onClick={scrollToFriends}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <UserPlus size={18} />
            Add a Friend
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryConfig.map((item) => (
          <SummaryCard
            key={item.key}
            icon={item.icon}
            title={item.title}
            value={summary[item.key]}
            subtitle={item.subtitle}
            accent={item.accent}
          />
        ))}
      </section>

      <section id="friends-section" className="space-y-5 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Your Friends</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Who needs your attention next?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
              Every card shows the friend, their current contact status, and how
              long it has been since the last check-in.
            </p>
          </div>
        </div>

        {loading ? <LoadingScreen /> : null}

        {!loading && error ? (
          <div className="surface-card p-6 text-sm text-rose-600">{error}</div>
        ) : null}

        {!loading && !error ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default HomePage;
