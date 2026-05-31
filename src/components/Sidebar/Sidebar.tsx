'use client';

import Link from 'next/link';
import styles from './sidebar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUserData } from '@/store/features/authSlice';
import Skeleton from 'react-loading-skeleton';

export default function Sidebar({
  showPlaylists = true,
}: {
  showPlaylists?: boolean;
}) {
  const username = useAppSelector((state) => state.auth.username);
  const dispatch = useAppDispatch();
  const { fetching } = useAppSelector((state) => state.track);
  const handleLogout = () => {
    dispatch(clearUserData());
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {username || 'Anonimous'}
        </p>
        <div className={styles.sidebar__icon} onClick={handleLogout}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      {showPlaylists && (
        <div className={styles.sidebar__block}>
          <div className={styles.sidebar__list}>
            <div className={styles.sidebar__item}>
              {fetching ? (
                <Skeleton width={250} height={150} />
              ) : (
                <Link className={styles.sidebar__link} href="/music/category/2">
                  <img
                    className={styles.sidebar__img}
                    src="/img/playlist01.png"
                    alt="day's playlist"
                    width={250}
                    height={150}
                  />
                </Link>
              )}
            </div>
            <div className={styles.sidebar__item}>
              {fetching ? (
                <Skeleton width={250} height={150} />
              ) : (
                <Link className={styles.sidebar__link} href="/music/category/3">
                  <img
                    className={styles.sidebar__img}
                    src="/img/playlist02.png"
                    alt="100 dance hits"
                    width={250}
                    height={150}
                  />
                </Link>
              )}
            </div>
            <div className={styles.sidebar__item}>
              {fetching ? (
                <Skeleton width={250} height={150} />
              ) : (
                <Link className={styles.sidebar__link} href="/music/category/4">
                  <img
                    className={styles.sidebar__img}
                    src="/img/playlist03.png"
                    alt="indie charge"
                    width={250}
                    height={150}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
