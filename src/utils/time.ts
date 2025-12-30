import { timeFromDbSchema, timeToDbSchema } from "./schemas";

const isFriday = (date: Date) => date.getDay() === 5;

const addMinutesToTime = (
  time: [number, number],
  delay: number
): [number, number] => {
  let [hour, minute] = time;
  minute += delay;
  if (minute >= 60) {
    hour += Math.floor(minute / 60);
    minute = minute % 60;
  }
  if (hour >= 24) hour = hour % 24;
  return [hour, minute];
};

const calculateTime = (time: string, delay: number) =>
  timeToDbSchema.parse(
    addMinutesToTime(timeFromDbSchema.parse(time) as [number, number], delay)
  );

export { isFriday, addMinutesToTime, calculateTime };
