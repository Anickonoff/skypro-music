'use client';

import { useState } from 'react';
import styles from './filter.module.css';
import { FilterItem } from '../FilterItem/FilterItem';
import {
  FilterKey,
  FilterListItems,
  SelectedFilters,
} from '@/sharedFilters/types';

type FilterModal = FilterKey | null;

type FilterProps = {
  filterListItems: FilterListItems;
  selectedFilters: SelectedFilters;
  onItemSelect: (key: FilterKey, value: string) => void;
  isDisabled: boolean;
};

export function Filter({
  filterListItems,
  selectedFilters,
  onItemSelect,
  isDisabled,
}: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterModal>(null);
  const handleFilterButtonClick = (newFilter: FilterKey) => {
    if (isDisabled) return; // если фильтры отключены, не реагируем на клики
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  }; // переключение фильтра по клику на кнопку, если кликнули на уже открытый фильтр - закрываем его

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
        {selectedFilters.author?.length > 0 && (
          <div className={styles.filter__buttonCounter}>
            {selectedFilters.author?.length || 0}
          </div>
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
        {selectedFilters.genre?.length > 0 && (
          <div className={styles.filter__buttonCounter}>
            {selectedFilters.genre?.length || 0}
          </div>
        )}
      </div>
      {isDisabled && (
        <div className={styles.filter__disabled}>
          Фильтры отключены на странице подборок
        </div>
      )}
    </div>
  );
}
