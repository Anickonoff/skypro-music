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
import { getAllTracks, getSelectionById } from '@/services/tracks/tracksApi';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';

export default function Centerblock() {
  const [allTracks, setAllTracks] = useState<TrackType[]>([]);
  const [selectionTracks, setSelectionTracks] = useState<
    SelectionTracksType | 'all'
  >('all');
  const [isTracksLoading, setIsTracksLoading] = useState(true);
  const [isSelectionLoading, setIsSelectionLoading] = useState(true);
  const [tracksError, setTracksError] = useState<string | null>(null);
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
    getAllTracks()
      .then((tracks) => setAllTracks(tracks))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setTracksError(error.response.data);
          } else if (error.request) {
            setTracksError('Что-то с интернетом');
          } else {
            setTracksError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => setIsTracksLoading(false));
  }, []);

  useEffect(() => {
    if (!params.id) {
      setSelectionTracks('all');
    } else {
      setIsSelectionLoading(true);
      getSelectionById(params.id)
        .then((selectionTracks) => setSelectionTracks(selectionTracks))
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
  }, [params.id]);

  const FilterListItems: FilterListItems = {
    genre: getUnicValuesByKey(allTracks, 'genre'),
    author: getUnicValuesByKey(allTracks, 'author'),
    year: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
  };

  const playlist = getTracksForPlaylist(selectionTracks);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>
        {selectionTracks === 'all' ? 'Треки' : selectionTracks.name}
      </h2>
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
          {isTracksLoading || isSelectionLoading ? (
            <p>Загрузка...</p>
          ) : tracksError ? (
            <p>Ошибка загрузки списка песен: {tracksError}</p>
          ) : selectionError ? (
            <p>Ошибка загрузки выбранной плейлиста: {selectionError}</p>
          ) : (
            playlist.map((item) => (
              <Track key={item._id} track={item} playlist={playlist} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
