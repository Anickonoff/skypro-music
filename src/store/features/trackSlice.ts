import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlaying: boolean;
  playlist: TrackType[];
  isShuffle: boolean;
  shufflePlaylist: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  playlist: [],
  isShuffle: false,
  shufflePlaylist: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentPlayList: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shufflePlaylist = [...action.payload].sort(
        () => Math.random() - 0.5,
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;
      if (state.currentTrack) {
        const currentIndex = playlist.findIndex(
          (track) => track._id === state.currentTrack?._id,
        );
        if (currentIndex < playlist.length - 1) {
          state.currentTrack = playlist[currentIndex + 1];
        }
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shufflePlaylist : state.playlist;
      if (state.currentTrack) {
        const currentIndex = playlist.findIndex(
          (track) => track._id === state.currentTrack?._id,
        );
        if (currentIndex > 0) {
          state.currentTrack = playlist[currentIndex - 1];
        }
      }
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setCurrentPlayList,
  setNextTrack,
  setPrevTrack,
  setShuffle,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
