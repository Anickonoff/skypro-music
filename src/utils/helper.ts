import { TrackType } from '@/sharedTypes/sharedTypes';

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
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
