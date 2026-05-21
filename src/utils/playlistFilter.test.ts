import { data } from '@/data';
import { getFilteredPlaylist } from './playlistFilter';

describe('Проверка фильтрации плейлиста', () => {
  const basePlaylist = data;
  it('Плейлист должен содержать только треки жанра "Классическая музыка"', () => {
    const searchQuery = '';
    const selectedFilters = {
      genre: ['Классическая музыка'],
      author: [],
      year: 'По умолчанию',
    };
    const filteredPlaylist = getFilteredPlaylist({
      basePlaylist,
      searchQuery,
      selectedFilters,
    });
    expect(
      filteredPlaylist.every((track) =>
        track.genre.includes('Классическая музыка'),
      ),
    ).toBe(true);
  });

  it('Плейлист должен содержать только треки автора "Alexander Nakarada"', () => {
    const searchQuery = '';
    const selectedFilters = {
      genre: [],
      author: ['Alexander Nakarada'],
      year: 'По умолчанию',
    };
    const filteredPlaylist = getFilteredPlaylist({
      basePlaylist,
      searchQuery,
      selectedFilters,
    });
    expect(
      filteredPlaylist.every((track) => track.author === 'Alexander Nakarada'),
    ).toBe(true);
  });
  it('Пустой фильтр должен возвращать весь плейлист', () => {
    const searchQuery = '';
    const selectedFilters = {
      genre: [],
      author: [],
      year: 'По умолчанию',
    };
    const filteredPlaylist = getFilteredPlaylist({
      basePlaylist,
      searchQuery,
      selectedFilters,
    });
    expect(filteredPlaylist).toEqual(basePlaylist);
  });
  it('Фильт по автору и жанру должен возвращать треки, соответствующие обоим критериям', () => {
    const searchQuery = '';
    const selectedFilters = {
      genre: ['Классическая музыка'],
      author: ['Alexander Nakarada'],
      year: 'По умолчанию',
    };
    const filteredPlaylist = getFilteredPlaylist({
      basePlaylist,
      searchQuery,
      selectedFilters,
    });
    expect(filteredPlaylist).toEqual([
      {
        _id: 8,
        name: 'Chase',
        author: 'Alexander Nakarada',
        release_date: '2005-06-11',
        genre: ['Классическая музыка', 'Инструментальная музыка'],
        duration_in_seconds: 205,
        album: 'Chase',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
        stared_user: [],
      },
    ]);
  });
  it('Не пересекающиеся фильтры возвращают пустой плейлист', () => {
    const searchQuery = '';
    const selectedFilters = {
      genre: ['Эпическая музыка'],
      author: ['Alexander Nakarada'],
      year: 'По умолчанию',
    };
    const filteredPlaylist = getFilteredPlaylist({
      basePlaylist,
      searchQuery,
      selectedFilters,
    });
    expect(filteredPlaylist).toEqual([]);
  });
});
