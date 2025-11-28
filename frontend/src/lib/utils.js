const TIME_FALLBACK = "--:--";
const DATE_FALLBACK = "Unknown date";

function coerceDate(dateLike) {
  if (!dateLike) return null;
  const parsed = new Date(dateLike);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatMessageTime(date) {
  const parsedDate = coerceDate(date);
  if (!parsedDate) return TIME_FALLBACK;

  return parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatMessageDay(date) {
  const parsedDate = coerceDate(date);
  if (!parsedDate) return DATE_FALLBACK;

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
