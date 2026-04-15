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
    subtitle: "",
    icon: Users,
    accent: "bg-[#ecf7ee] text-[#295846]",
  },
  {
    key: "onTrackFriends",
    title: "On Track",
    subtitle: "",
    icon: Activity,
    accent: "bg-[#ecf7ee] text-[#295846]",
  },
  {
    key: "needAttentionFriends",
    title: "Need Attention",
    subtitle: "",
    icon: TimerReset,
    accent: "bg-[#fff4df] text-[#d38b12]",
  },
  {
    key: "interactionsThisMonth",
    title: "Interactions This Month",
    subtitle: "",
    icon: AlertTriangle,
    accent: "bg-[#eff4fb] text-slate-600",
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
    <div className="section-wrap pb-10 pt-10">
      <section className="px-4 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-heading text-4xl font-bold tracking-[-0.04em] text-slate-800 sm:text-5xl lg:text-[4rem]">
            Friends to keep close in your life
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
          <button
            type="button"
            onClick={scrollToFriends}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#295846] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#224839]"
          >
            <UserPlus size={18} />
            Add a Friend
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <section
        id="friends-section"
        className="mx-auto mt-10 max-w-6xl space-y-8 border-t border-slate-200 pt-10"
      >
        <div>
          <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] text-slate-800">
            Your Friends
          </h2>
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
