'use client';

import classNames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import { Track } from '../Track/Track';
import { Filter } from '../Filter/Filter';
import { getUnicValuesByKey } from '@/utils/helper';
import { FilterListItems } from '@/sharedFilters/types';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getAllTracks } from '@/services/tracks/tracksApi';

export default function Centerblock() {
  const [allTracks, setAllTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const tracks = await getAllTracks();
        setAllTracks(tracks);
      } catch (err) {
        setError('Failed to fetch tracks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  const FilterListItems: FilterListItems = {
    genre: getUnicValuesByKey(allTracks, 'genre'),
    author: getUnicValuesByKey(allTracks, 'author'),
    year: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
  };

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter filterListItems={FilterListItems} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {allTracks.map((item) => (
            <Track key={item._id} track={item} playlist={allTracks} />
          ))}
        </div>
      </div>
    </div>
  );
}
