import { MessageCircleMore, PhoneCall, Video } from "lucide-react";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

function normalizeDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function addDays(value, days) {
  const date = normalizeDate(value) ?? new Date();
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDaysDifference(laterValue, earlierValue) {
  const laterDate = normalizeDate(laterValue);
  const earlierDate = normalizeDate(earlierValue);

  if (!laterDate || !earlierDate) {
    return 0;
  }

  const laterUtc = Date.UTC(
    laterDate.getFullYear(),
    laterDate.getMonth(),
    laterDate.getDate(),
  );
  const earlierUtc = Date.UTC(
    earlierDate.getFullYear(),
    earlierDate.getMonth(),
    earlierDate.getDate(),
  );

  return Math.max(0, Math.round((laterUtc - earlierUtc) / DAY_IN_MS));
}

export function toISODate(value) {
  const date = normalizeDate(value);
  return date ? date.toISOString().split("T")[0] : "";
}

export function formatDisplayDate(value) {
  const date = normalizeDate(value);

  if (!date) {
    return "Not scheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatTimelineDate(value) {
  const date = normalizeDate(value);

  if (!date) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function deriveStatus(daysSinceContact, goal) {
  if (daysSinceContact > goal) {
    return "overdue";
  }

  if (daysSinceContact >= Math.max(goal - 2, 1)) {
    return "almost due";
  }

  return "on-track";
}

export function capitalize(text) {
  if (!text) {
    return "";
  }

  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export const statusMeta = {
  overdue: {
    label: "Overdue",
    className: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
  },
  "almost due": {
    label: "Almost due",
    className: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  },
  "on-track": {
    label: "On-track",
    className: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  },
};

export const interactionMeta = {
  call: {
    label: "Call",
    Icon: PhoneCall,
    accentClass: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
    chartColor: "#2f8cff",
  },
  text: {
    label: "Text",
    Icon: MessageCircleMore,
    accentClass: "bg-teal-100 text-teal-700 ring-1 ring-teal-200",
    chartColor: "#17c7b8",
  },
  video: {
    label: "Video",
    Icon: Video,
    accentClass: "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
    chartColor: "#8b5cf6",
  },
};

