import { TrackType } from './sharedTypes/sharedTypes';

export const data: TrackType[] = [
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
  {
    _id: 12,
    name: 'A journey of successfull winners',
    author: '-',
    release_date: '1985-02-02',
    genre: ['Классическая музыка'],
    duration_in_seconds: 255,
    album: '-',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_A_Journey_For_Successful_Winners.mp3',
    stared_user: [],
  },
  {
    _id: 13,
    name: 'Epic Heroic Conquest',
    author: '-',
    release_date: '1962-01-15',
    genre: ['Классическая музыка', 'Эпическая музыка'],
    duration_in_seconds: 200,
    album: 'Epic Heroic Conquest',
    logo: null,
    track_file:
      'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_Epic_Heroic_Conquest.mp3',
    stared_user: [],
  },
];
