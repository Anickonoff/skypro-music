import { TrackType } from '@/sharedTypes/sharedTypes';

export function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time % 60);
  if (hours > 0) {
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function getUnicValuesByKey(
  array: TrackType[],
  key: keyof TrackType,
): string[] {
  const uniqueValues = new Set<string>();
  array.forEach((item) => {
    const value = item[key];
    if (typeof value === 'string') {
      uniqueValues.add(value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => {
        uniqueValues.add(v);
      });
    }
  });
  return Array.from(uniqueValues);
}

export const getTimePanel = (
  currentTime: number,
  duration: number | undefined,
): string => {
  if (duration) {
    return `${formatTime(currentTime)} / ${formatTime(duration)}`;
  }
  return formatTime(currentTime);
};
