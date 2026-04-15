import { createContext, useContext, useEffect, useState } from "react";
import {
  addDays,
  capitalize,
  deriveStatus,
  getDaysDifference,
  toISODate,
} from "../utils/appUtils";

const TIMELINE_STORAGE_KEY = "keen-keeper-custom-timeline";
const GOAL_STORAGE_KEY = "keen-keeper-goal-overrides";

const AppDataContext = createContext(null);

function loadStoredValue(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch {
    return fallback;
  }
}

function getGoalValue(friend, goalOverrides) {
  const override = Number(goalOverrides[friend.id]);
  return Number.isFinite(override) && override > 0 ? override : friend.goal;
}

function getLatestCustomEntry(friendId, customTimeline) {
  const entries = customTimeline.filter(
    (entry) => String(entry.friendId) === String(friendId),
  );

  if (entries.length === 0) {
    return null;
  }

  return entries.sort((firstEntry, secondEntry) => {
    return new Date(secondEntry.date) - new Date(firstEntry.date);
  })[0];
}

export function AppDataProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [seedTimeline, setSeedTimeline] = useState([]);
  const [customTimeline, setCustomTimeline] = useState(() => {
    const storedEntries = loadStoredValue(TIMELINE_STORAGE_KEY, []);
    return Array.isArray(storedEntries) ? storedEntries : [];
  });
  const [goalOverrides, setGoalOverrides] = useState(() => {
    const storedGoals = loadStoredValue(GOAL_STORAGE_KEY, {});
    return typeof storedGoals === "object" && storedGoals ? storedGoals : {};
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [friendsResponse, timelineResponse] = await Promise.all([
          fetch("/data/friends.json"),
          fetch("/data/timeline-seed.json"),
        ]);

        if (!friendsResponse.ok || !timelineResponse.ok) {
          throw new Error("Unable to load app data.");
        }

        const [friendsData, timelineData] = await Promise.all([
          friendsResponse.json(),
          timelineResponse.json(),
        ]);

        setFriends(Array.isArray(friendsData) ? friendsData : []);
        setSeedTimeline(Array.isArray(timelineData) ? timelineData : []);
      } catch (loadError) {
        console.error(loadError);
        setError(
          "We couldn't load your relationship dashboard right now. Please refresh and try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      TIMELINE_STORAGE_KEY,
      JSON.stringify(customTimeline),
    );
  }, [customTimeline]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      GOAL_STORAGE_KEY,
      JSON.stringify(goalOverrides),
    );
  }, [goalOverrides]);

  const friendSnapshots = friends.map((friend) => {
    const goal = getGoalValue(friend, goalOverrides);
    const latestCustomEntry = getLatestCustomEntry(friend.id, customTimeline);

    let daysSinceContact = friend.days_since_contact;
    let nextDueDate = friend.next_due_date;

    if (latestCustomEntry) {
      daysSinceContact = getDaysDifference(new Date(), latestCustomEntry.date);
      nextDueDate = toISODate(addDays(latestCustomEntry.date, goal));
    } else if (goal !== friend.goal) {
      const inferredLastContact = addDays(new Date(), -friend.days_since_contact);
      nextDueDate = toISODate(addDays(inferredLastContact, goal));
    }

    return {
      ...friend,
      goal,
      days_since_contact: daysSinceContact,
      next_due_date: nextDueDate,
      status: deriveStatus(daysSinceContact, goal),
    };
  });

  const timelineEntries = [...seedTimeline, ...customTimeline].sort(
    (firstEntry, secondEntry) => {
      return new Date(secondEntry.date) - new Date(firstEntry.date);
    },
  );

  const interactionCounts = {
    call: 0,
    text: 0,
    video: 0,
  };

  timelineEntries.forEach((entry) => {
    if (interactionCounts[entry.type] !== undefined) {
      interactionCounts[entry.type] += 1;
    }
  });

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const interactionsThisMonth = timelineEntries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getMonth() === currentMonth &&
      entryDate.getFullYear() === currentYear
    );
  }).length;

  const onTrackFriends = friendSnapshots.filter(
    (friend) => friend.status === "on-track",
  ).length;
  const needAttentionFriends = friendSnapshots.filter(
    (friend) => friend.status === "almost due" || friend.status === "overdue",
  ).length;

  function getFriendById(friendId) {
    return friendSnapshots.find(
      (friend) => String(friend.id) === String(friendId),
    );
  }

  function addTimelineEntry(friend, type) {
    const normalizedType = String(type).toLowerCase();
    const entry = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `entry-${Date.now()}`,
      friendId: friend.id,
      type: normalizedType,
      title: `${capitalize(normalizedType)} with ${friend.name}`,
      date: new Date().toISOString(),
    };

    setCustomTimeline((currentEntries) => [entry, ...currentEntries]);
    return entry;
  }

  function updateGoal(friendId, goal) {
    const numericGoal = Number(goal);

    if (!Number.isFinite(numericGoal) || numericGoal < 1) {
      return false;
    }

    setGoalOverrides((currentGoals) => ({
      ...currentGoals,
      [friendId]: numericGoal,
    }));

    return true;
  }

  const value = {
    loading,
    error,
    friends: friendSnapshots,
    timelineEntries,
    interactionCounts,
    summary: {
      totalFriends: friendSnapshots.length,
      onTrackFriends,
      needAttentionFriends,
      interactionsThisMonth,
      overdueFriends: friendSnapshots.filter(
        (friend) => friend.status === "overdue",
      ).length,
      almostDueFriends: friendSnapshots.filter(
        (friend) => friend.status === "almost due",
      ).length,
      totalInteractions: timelineEntries.length,
    },
    getFriendById,
    addTimelineEntry,
    updateGoal,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider.");
  }

  return context;
}
