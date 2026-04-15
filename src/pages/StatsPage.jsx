import {
  Activity,
  MessageCircleMore,
  PhoneCall,
  Video,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import LoadingScreen from "../components/LoadingScreen";
import SummaryCard from "../components/SummaryCard";
import { useAppData } from "../context/AppDataContext";
import { interactionMeta } from "../utils/appUtils";

function StatsPage() {
  const { loading, error, friends, interactionCounts, timelineEntries } =
    useAppData();

  const chartData = [
    {
      name: "Call",
      value: interactionCounts.call,
      color: interactionMeta.call.chartColor,
    },
    {
      name: "Text",
      value: interactionCounts.text,
      color: interactionMeta.text.chartColor,
    },
    {
      name: "Video",
      value: interactionCounts.video,
      color: interactionMeta.video.chartColor,
    },
  ];

  let strongestChannel = "Call";
  let strongestChannelCount = interactionCounts.call;

  chartData.forEach((item) => {
    if (item.value > strongestChannelCount) {
      strongestChannel = item.name;
      strongestChannelCount = item.value;
    }
  });

  let mostContactedFriendName = "No data yet";
  const friendInteractionTotals = {};

  timelineEntries.forEach((entry) => {
    friendInteractionTotals[entry.friendId] =
      (friendInteractionTotals[entry.friendId] ?? 0) + 1;
  });

  let highestFriendCount = 0;

  Object.entries(friendInteractionTotals).forEach(([friendId, total]) => {
    if (total > highestFriendCount) {
      highestFriendCount = total;
      mostContactedFriendName =
        friends.find((friend) => String(friend.id) === String(friendId))?.name ??
        "No data yet";
    }
  });

  const analyticsCards = [
    {
      title: "Total Check-ins",
      value: timelineEntries.length,
      subtitle: "Every interaction captured across the friendship timeline.",
      icon: Activity,
      accent: "bg-slate-900 text-white",
    },
    {
      title: "Top Channel",
      value: strongestChannel,
      subtitle: `${strongestChannelCount} logged interactions use this format.`,
      icon:
        strongestChannel === "Video"
          ? Video
          : strongestChannel === "Text"
            ? MessageCircleMore
            : PhoneCall,
      accent: "bg-cyan-100 text-cyan-700",
    },
    {
      title: "Most Contacted Friend",
      value: mostContactedFriendName,
      subtitle: "The friendship that currently has the deepest timeline.",
      icon: PhoneCall,
      accent: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <div className="section-wrap pb-10 pt-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-5xl font-bold tracking-[-0.04em] text-slate-800">
            Friendship Analytics
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-500">
          Measure how you tend to keep in touch and which interaction styles are
          carrying most of the relationship maintenance.
          </p>
        </div>

      {loading ? <LoadingScreen label="Building your analytics..." /> : null}

      {!loading && error ? (
        <div className="dashboard-card p-6 text-sm text-rose-600">{error}</div>
      ) : null}

      {!loading && !error ? (
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="dashboard-card p-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-[#295846]">
                Calls, texts, and video check-ins
              </h2>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      innerRadius={64}
                      paddingAngle={4}
                    >
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {chartData.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <p className="font-semibold text-slate-900">{item.name}</p>
                    </div>
                    <p className="mt-3 text-3xl font-bold text-slate-950">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {analyticsCards.map((card) => (
              <SummaryCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                value={card.value}
                subtitle={card.subtitle}
                accent={card.accent}
              />
            ))}
          </div>
        </section>
      ) : null}
      </div>
    </div>
  );
}

export default StatsPage;
