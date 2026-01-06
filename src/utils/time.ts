export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (totalMinutes: number): string => {
  const minutesInDay = 24 * 60;
  const normalized =
    ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay;

  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

export const addDelayToTime = (time: string, delay: number): string => {
  return minutesToTime(timeToMinutes(time) + delay);
};

export const formatTime = (
  time: string,
  format: "12" | "24" = "24"
): string => {
  if (format === "24") return time;

  const [hours, minutes] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${String(hour12).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )} ${period}`;
};

export type TFormat = "12" | "24";

type AnyTime = Record<string, any> | any[] | string;

export const formatTimeRecursive = (
  data: AnyTime,
  format: "12" | "24" = "24"
): AnyTime => {
  if (typeof data === "string") {
    return /^\d{2}:\d{2}$/.test(data) ? formatTime(data, format) : data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => formatTimeRecursive(item, format));
  }
  if (typeof data === "object" && data !== null) {
    const formatted: Record<string, any> = {};
    for (const key in data) {
      formatted[key] = formatTimeRecursive(data[key], format);
    }
    return formatted;
  }
  return data;
};
