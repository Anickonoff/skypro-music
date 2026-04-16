'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import { FilterItem } from '../FilterItem/FilterItem';
import {
  FilterKey,
  FilterListItems,
  SelectedFilters,
} from '@/sharedFilters/types';
import { filterConfig } from '@/sharedFilters/config';

type FilterModal = FilterKey | null;

type FilterProps = {
  filterListItems: FilterListItems;
};

export function Filter({ filterListItems }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterModal>(null);
  const handleFilterButtonClick = (newFilter: FilterKey) => {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  };

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    genre: [],
    author: [],
    year: 'По умолчанию',
  });

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
  };
  //TODO сделать закрытие фильтра по клику вне области фильтра
  //TODO добавить map для отрисовки кнопок фильтров

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div
        className={styles.filter__button}
        onClick={() => handleFilterButtonClick('author')}
      >
        исполнителю
        {activeFilter === 'author' && (
          <FilterItem
            filterKey="author"
            list={filterListItems}
            selectedFilters={selectedFilters}
            onItemSelect={onItemSelect}
          />
        )}
      </div>
      <div
        className={styles.filter__button}
        onClick={() => handleFilterButtonClick('year')}
      >
        году выпуска
        {activeFilter === 'year' && (
          <FilterItem
            filterKey="year"
            list={filterListItems}
            selectedFilters={selectedFilters}
            onItemSelect={onItemSelect}
          />
        )}
      </div>
      <div
        className={styles.filter__button}
        onClick={() => handleFilterButtonClick('genre')}
      >
        жанру
        {activeFilter === 'genre' && (
          <FilterItem
            filterKey="genre"
            list={filterListItems}
            selectedFilters={selectedFilters}
            onItemSelect={onItemSelect}
          />
        )}
      </div>
    </div>
  );
}
