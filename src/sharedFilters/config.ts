import { FilterType } from './types';

export const filterConfig = {
  author: 'multiple',
  year: 'single',
  genre: 'multiple',
} as const satisfies Record<string, FilterType>;
