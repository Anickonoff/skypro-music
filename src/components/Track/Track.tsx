import { TrackType } from '@/sharedTypes/sharedTypes';
import { TrackContent } from './TrackContent';
import { TrackSkeleton } from './Trackskeleton';

type TrackProps =
  | { isLoading: true }
  | { isLoading?: false; track: TrackType; playlist: TrackType[] };

export function Track(props: TrackProps) {
  if (props.isLoading) {
    return <TrackSkeleton />;
  }

  return <TrackContent track={props.track} playlist={props.playlist} />;
}
