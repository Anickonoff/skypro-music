'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './bar.module.css';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  setIsPlaying,
  setNextTrack,
  setPrevTrack,
  setShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helper';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.track.currentTrack);
  const isPlaying = useAppSelector((state) => state.track.isPlaying);
  const isShuffle = useAppSelector((state) => state.track.isShuffle);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // useEffect(() => {
  //   if (!audioRef.current) {
  //     return;
  //   }
  //   if (isPlaying) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [currentTrack]);

  if (!currentTrack) {
    return <></>;
  }

  const onTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  const onToggleShuffle = () => {
    dispatch(setShuffle(!isShuffle));
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onStartLoading = () => {
    setIsLoadedTrack(false);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setIsLoadedTrack(true);
      audioRef.current.play();
      dispatch(setIsPlaying(true));
    }
  };

  const onEndedTrack = () => {
    if (!isLooping) {
      dispatch(setNextTrack());
    }
  };

  const onChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value);
    }
  };

  const onMutedVolume = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  return (
    <div className={styles.bar}>
      <audio
        src={currentTrack?.track_file}
        ref={audioRef}
        autoPlay
        loop={isLooping}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEndedTrack}
        onLoadStart={onStartLoading}
        muted={isMuted}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          value={audioRef.current?.currentTime || 0}
          step={0.01}
          onChange={onChangeProgress}
          readOnly={!isLoadedTrack}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={onTogglePlay}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={`/img/icon/sprite.svg#${isPlaying ? 'icon-pause' : 'icon-play'}`}
                  ></use>
                </svg>
                {!isLoadedTrack ? (
                  <div className={styles.player__loadingOverlay}>
                    <svg className={styles.player__btnLoading}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-loading"></use>
                    </svg>
                  </div>
                ) : null}
              </div>
              <div className={styles.player__btnNext} onClick={onNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={onToggleLoop}
              >
                <svg
                  className={classNames(styles.player__btnRepeatSvg, {
                    [styles.player__btnSvgActive]: isLooping,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={onToggleShuffle}
              >
                <svg
                  className={classNames(styles.player__btnShuffleSvg, {
                    [styles.player__btnSvgActive]: isShuffle,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <a className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </a>
                </div>
                <div className={styles.trackPlay__album}>
                  <a className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image} onClick={onMutedVolume}>
                <svg className={styles.volume__svg}>
                  <use
                    xlinkHref={`/img/icon/sprite.svg#${isMuted ? 'icon-muted' : 'icon-volume'}`}
                  ></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={onChangeVolume}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
