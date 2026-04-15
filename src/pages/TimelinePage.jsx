import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import TimelineItem from "../components/TimelineItem";
import { useAppData } from "../context/AppDataContext";

const filterOptions = ["all", "call", "text", "video"];

function TimelinePage() {
  const { loading, error, timelineEntries, getFriendById } = useAppData();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  let visibleEntries = timelineEntries.filter((entry) => {
    const matchesType = activeFilter === "all" || entry.type === activeFilter;
    const friend = getFriendById(entry.friendId);
    const searchableText = `${entry.title} ${friend?.name ?? ""} ${entry.type}`;
    const matchesSearch = searchableText
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  if (sortOrder === "oldest") {
    visibleEntries = [...visibleEntries].sort((firstEntry, secondEntry) => {
      return new Date(firstEntry.date) - new Date(secondEntry.date);
    });
  }

  return (
    <div className="section-wrap space-y-6 pt-8">
      <div className="flex flex-col gap-3">
        <span className="eyebrow">Timeline</span>
        <h1 className="text-4xl font-bold text-slate-950">Timeline</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-500">
          Browse every logged call, text, and video touchpoint in one place.
        </p>
      </div>

      <section className="surface-card p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setActiveFilter(option)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeFilter === option
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {option === "all"
                  ? "All"
                  : `${option[0].toUpperCase()}${option.slice(1)}`}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            <Search size={16} className="text-slate-400" />
            <input
              type="search"
              placeholder="Search friend or interaction"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:min-w-64"
            />
          </label>

          <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            <SlidersHorizontal size={16} className="text-slate-400" />
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="bg-transparent text-sm font-medium text-slate-900 outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>
      </section>

      {loading ? <LoadingScreen label="Loading timeline..." /> : null}

      {!loading && error ? (
        <div className="surface-card p-6 text-sm text-rose-600">{error}</div>
      ) : null}

      {!loading && !error ? (
        <section className="space-y-4">
          {visibleEntries.length === 0 ? (
            <div className="surface-card p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-950">
                No entries match this filter
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Try a different interaction type, search term, or log a new
                check-in from a friend&apos;s detail page.
              </p>
            </div>
          ) : (
            visibleEntries.map((entry) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                friend={getFriendById(entry.friendId)}
              />
            ))
          )}
        </section>
      ) : null}
    </div>
  );
}

export default TimelinePage;

