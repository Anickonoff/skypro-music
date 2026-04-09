import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import styles from './track.module.css';

export function Track({ track }: { track: TrackType }) {
  return (
    <div key={track._id} className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {track.logo ? (
              <img src={track.logo} alt="Track logo" />
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
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
