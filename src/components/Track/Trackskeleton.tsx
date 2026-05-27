'use client';

import styles from './track.module.css';
import Skeleton from 'react-loading-skeleton';

export function TrackSkeleton() {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <Skeleton
              containerClassName={styles.skeleton}
              style={{ height: '100%' }}
            />
          </div>
          <Skeleton width={356} />
        </div>
        <div className={styles.track__author}>
          <Skeleton width={271} />
        </div>
        <Skeleton width={315} />
      </div>
    </div>
  );
}
