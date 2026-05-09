'use client';

import classNames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import { Track } from '../Track/Track';
import { Filter } from '../Filter/Filter';
import { getUnicValuesByKey } from '@/utils/helper';
import { FilterListItems } from '@/sharedFilters/types';
import { useEffect, useState } from 'react';
import { SelectionTracksType, TrackType } from '@/sharedTypes/sharedTypes';
import { getSelectionById } from '@/services/tracks/tracksApi';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { useAppSelector } from '@/store/store';

export default function Centerblock() {
  const { allTracks, fetchError, fetching } = useAppSelector(
    (state) => state.track,
  );
  const [selectionTracks, setSelectionTracks] = useState<
    SelectionTracksType | 'all'
  >('all');
  const [isSelectionLoading, setIsSelectionLoading] = useState(true);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const params = useParams<{ id: string }>();

  const getTracksForPlaylist = (
    selection: SelectionTracksType | 'all',
  ): TrackType[] => {
    if (selection === 'all') {
      return allTracks;
    } else {
      return selection.items
        .map((id) => allTracks.find((track) => track._id === id))
        .filter((v): v is TrackType => !!v);
    }
  };

  useEffect(() => {
    if (!fetching && allTracks.length) {
      setSelectionError(null);
      if (!params.id) {
        setSelectionTracks('all');
        setIsSelectionLoading(false);
      } else {
        setIsSelectionLoading(true);
        getSelectionById(params.id)
          .then((selectionTracks) => {
            setSelectionTracks(selectionTracks);
          })
          .catch((error) => {
            if (error instanceof AxiosError) {
              if (error.response) {
                setSelectionError(error.response.data);
              } else if (error.request) {
                setSelectionError('Что-то с интернетом');
              } else {
                setSelectionError('Неизвестная ошибка');
              }
            }
          })
          .finally(() => setIsSelectionLoading(false));
      }
    }
  }, [params.id, fetching]);

  const filterListItems: FilterListItems = {
    genre: getUnicValuesByKey(allTracks, 'genre'),
    author: getUnicValuesByKey(allTracks, 'author'),
    year: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
  };

  const playlist: TrackType[] = getTracksForPlaylist(selectionTracks);

  const playlistContent = () => {
    if (fetchError) {
      return <p>Ошибка загрузки списка песен: {fetchError}</p>;
    } else if (selectionError) {
      return <p>Ошибка загрузки выбранного плейлиста: {selectionError}</p>;
    } else if (fetching || isSelectionLoading) {
      return <p>Загрузка...</p>;
    } else {
      return playlist.map((item) => (
        <Track key={item._id} track={item} playlist={playlist} />
      ));
    }
  };

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>
        {selectionTracks === 'all' ? 'Треки' : selectionTracks.name}
      </h2>
      <Filter filterListItems={filterListItems} />
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
        <div className={styles.content__playlist}>{playlistContent()}</div>
      </div>
    </div>
  );
}
