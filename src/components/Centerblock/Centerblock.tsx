'use client';

import classNames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import { Track } from '../Track/Track';
import { Filter } from '../Filter/Filter';
import { getUnicValuesByKey } from '@/utils/helper';
import {
  FilterKey,
  FilterListItems,
  SelectedFilters,
} from '@/sharedFilters/types';
import { use, useEffect, useState } from 'react';
import { SelectionTracksType, TrackType } from '@/sharedTypes/sharedTypes';
import { getSelectionById } from '@/services/tracks/tracksApi';
import { useParams, usePathname } from 'next/navigation';
import { AxiosError } from 'axios';
import { useAppSelector } from '@/store/store';
import { filterConfig } from '@/sharedFilters/config';
import { getFilteredPlaylist } from '@/utils/playlistFilter';
import { toast } from 'react-toastify';
import { handleAxiosError } from '@/utils/handleAxiosError';

export default function Centerblock() {
  const { allTracks, fetchError, fetching, favoriteTracks } = useAppSelector(
    (state) => state.track,
  );
  const [selectionTracks, setSelectionTracks] = useState<
    SelectionTracksType | 'all' | 'favorite'
  >('all');
  const [isSelectionLoading, setIsSelectionLoading] = useState(true);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const isFavoritePage = pathname === '/music/favorite'; //понимаю, что так себе решение, но иначе переносить логики получения плейлистов и избранного в файлы page и пробрасывать в компонент только результат
  const isFilterDisabled = !!params.id; // отключение фильтров в подборках
  const getTracksForPlaylist = (
    selection: SelectionTracksType | 'all' | 'favorite',
  ): TrackType[] => {
    if (selection === 'all') {
      return allTracks;
    } else if (selection === 'favorite') {
      return favoriteTracks;
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
        if (!isFavoritePage) {
          setSelectionTracks('all');
          setIsSelectionLoading(false);
        } else {
          setSelectionTracks('favorite');
          setIsSelectionLoading(false);
        }
      } else {
        setIsSelectionLoading(true);
        getSelectionById(params.id)
          .then((selectionTracks) => {
            setSelectionTracks(selectionTracks);
          })
          .catch((error) => {
            handleAxiosError(error, (msg) => setSelectionError(msg));
          })
          .finally(() => setIsSelectionLoading(false));
      }
    }
  }, [params.id, fetching, isFavoritePage]);

  const filterListItems: FilterListItems = {
    genre: getUnicValuesByKey(allTracks, 'genre'),
    author: getUnicValuesByKey(allTracks, 'author'),
    year: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
  };

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    genre: [],
    author: [],
    year: 'По умолчанию',
  }); // состояние для хранения выбранных фильтров

  const onItemSelect = (key: FilterKey, value: string) => {
    const filterType = filterConfig[key];
    if (filterType === 'single') {
      setSelectedFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    } else if (filterType === 'multiple') {
      setSelectedFilters((prev) => {
        const currentValues = prev[key] as string[];
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [key]: currentValues.filter((v) => v !== value),
          };
        } else {
          return {
            ...prev,
            [key]: [...currentValues, value],
          };
        }
      });
    }
  }; // функция для добавления или удаления фильтра по клику

  const [searchQuery, setSearchQuery] = useState(''); // состояние для хранения поискового запроса

  const onSearchInputChange = (query: string) => {
    setSearchQuery(query);
  }; // функция для обновления поискового запроса

  useEffect(() => {
    setSelectedFilters({
      genre: [],
      author: [],
      year: 'По умолчанию',
    });
    setSearchQuery('');
  }, [selectionTracks]); // сброс фильтров при смене плейлиста

  const basePlaylist: TrackType[] = getTracksForPlaylist(selectionTracks); // не фильтрованный плейлист текущей страницы

  const filteredPlaylist = getFilteredPlaylist({
    basePlaylist,
    searchQuery,
    selectedFilters,
  }); // плейлист, отфильтрованный по поиску и выбранным фильтрам

  const playlistContent = () => {
    if (fetchError) {
      return <p>Ошибка загрузки списка песен: {fetchError}</p>;
    } else if (selectionError) {
      return <p>Ошибка загрузки выбранного плейлиста: {selectionError}</p>;
    } else if (fetching || isSelectionLoading) {
      return <p>Загрузка...</p>;
    } else if (!filteredPlaylist.length) {
      return <p>По заданным фильтам ничего не найдено</p>;
    } else {
      return filteredPlaylist.map((item) => (
        <Track key={item._id} track={item} playlist={filteredPlaylist} />
      ));
    }
  };

  return (
    <div className={styles.centerblock}>
      <Search onInputChange={onSearchInputChange} inputValue={searchQuery} />
      <h2 className={styles.centerblock__h2}>
        {selectionTracks === 'all'
          ? 'Треки'
          : selectionTracks === 'favorite'
            ? 'Мои треки'
            : selectionTracks.name}
      </h2>
      <Filter
        filterListItems={filterListItems}
        selectedFilters={selectedFilters}
        onItemSelect={onItemSelect}
        isDisabled={isFilterDisabled}
      />
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
