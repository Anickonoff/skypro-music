import { filterConfig } from './config';

export type FilterType = 'single' | 'multiple';

export type FilterKey = keyof typeof filterConfig;

export type FilterListItems = {
  [key in FilterKey]: string[];
};

export type SelectedFilters = {
  [key in FilterKey]: (typeof filterConfig)[key] extends 'single'
    ? string
    : string[];
};
