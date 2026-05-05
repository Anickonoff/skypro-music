import { AsyncCallbackSet } from 'next/dist/server/lib/async-callback-set';

export type TrackType = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: { type: string | null; data: string[] } | null;
  track_file: string;
  stared_user: string[];
};
