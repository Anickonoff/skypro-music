import classNames from 'classnames';
import styles from './filterItem.module.css';
import {
  FilterKey,
  FilterListItems,
  SelectedFilters,
} from '@/sharedFilters/types';

type FilterItemProps = {
  list: FilterListItems;
  selectedFilters: SelectedFilters;
  filterKey: FilterKey;
  onItemSelect: (key: FilterKey, value: string) => void;
};

export function FilterItem({
  list,
  selectedFilters,
  filterKey,
  onItemSelect,
}: FilterItemProps) {
  const isActive = (item: string): boolean => {
    const selectedValues = selectedFilters[filterKey];
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(item);
    }
    return selectedValues === item;
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__list}>
        {list[filterKey].map((item, index) => (
          <div
            key={item}
            className={classNames(styles.filter__item, {
              [styles.filter__item_active]: isActive(item),
            })}
            onClick={(e) => {
              e.stopPropagation();
              onItemSelect(filterKey, item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
