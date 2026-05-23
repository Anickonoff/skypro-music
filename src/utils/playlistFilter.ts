import { SelectedFilters } from '@/sharedFilters/types';
import { TrackType } from '@/sharedTypes/sharedTypes';

type getFilteredPlaylistPropsType = {
  basePlaylist: TrackType[];
  searchQuery: string;
  selectedFilters: SelectedFilters;
};

export const getFilteredPlaylist = ({
  basePlaylist,
  searchQuery,
  selectedFilters,
}: getFilteredPlaylistPropsType): TrackType[] => {
  const filteredPlaylist = basePlaylist.filter((track) => {
    const matchesSearchQuery = track.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAuthorFilter =
      selectedFilters.author.length === 0 ||
      selectedFilters.author.includes(track.author);
    const matchesGenreFilter =
      selectedFilters.genre.length === 0 ||
      selectedFilters.genre.some((genre) => track.genre.includes(genre));

    return matchesSearchQuery && matchesAuthorFilter && matchesGenreFilter;
  });
  if (selectedFilters.year !== 'По умолчанию') {
    filteredPlaylist.sort((a, b) => {
      //дата в формате YYYY-MM-DD или '', если дата отсутствует, в таком случае при сортировке треки без даты будут считаться старше всех остальных треков
      const dateA = a.release_date ? new Date(a.release_date) : new Date(0);
      const dateB = b.release_date ? new Date(b.release_date) : new Date(0);
      if (selectedFilters.year === 'Сначала новые') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  }
  return filteredPlaylist;
};
