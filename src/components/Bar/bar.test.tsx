import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Bar from './Bar';
import { authSliceReducer } from '@/store/features/authSlice';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import styles from './bar.module.css';
import { data } from '@/data';

const mockTrack: TrackType = data[0];

const renderBarWithState = () => {
  const store = configureStore({
    reducer: combineReducers({
      track: trackSliceReducer,
      auth: authSliceReducer,
    }),
    preloadedState: {
      track: {
        currentTrack: mockTrack,
        isPlaying: false,
        playlist: data,
        isShuffle: false,
        shufflePlaylist: data,
        allTracks: [],
        favoriteTracks: [],
        fetchError: null,
        fetching: false,
      },
      auth: {
        username: '',
        accessToken: '',
        refreshToken: '',
        authInitialized: true,
      },
    },
  });

  return render(
    <Provider store={store}>
      <Bar />
    </Provider>,
  );
};

describe('Bar component', () => {
  it('shows tooltip when user is unauthorized', () => {
    const { container } = renderBarWithState();

    expect(
      container.querySelector(`.${styles.trackPlay__tooltip}`),
    ).toBeInTheDocument();
  });
});
