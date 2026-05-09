'use client';

import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import styles from './track.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlayList,
  setCurrentTrack,
} from '@/store/features/trackSlice';
import classNames from 'classnames';

type TrackProps = {
  track: TrackType;
  playlist: TrackType[];
};

export function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.track.isPlaying);
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const isActive = isPlaying && track._id === currentTrack?._id;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlayList(playlist));
  };

  return (
    <div
      key={track._id}
      className={styles.playlist__item}
      onClick={onClickTrack}
    >
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {track.logo?.data && track.logo.data.length > 0 ? (
              <img src={track.logo.data[0]} alt="Track logo" />
            ) : (
              <svg
                className={classNames(styles.track__titleSvg, {
                  [styles.track__titleSvgActive]: isActive,
                })}
              >
                <use
                  xlinkHref={`/img/icon/sprite.svg#${track._id === currentTrack?._id ? 'icon-active' : 'icon-note'}`}
                ></use>
              </svg>
            )}
          </div>
          <div>
            <a className={styles.track__titleLink} href="">
              {track.name}
              <span className={styles.track__titleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.track__author}>
          <a className={styles.track__authorLink} href="">
            {track.author}
          </a>
        </div>
        <div className={styles.track__album}>
          <a className={styles.track__albumLink} href="">
            {track.album}
          </a>
        </div>
        <div>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
