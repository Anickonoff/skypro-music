'use client';

import { getAllTracks, getFavoriteTracks } from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setFavoriteTracks,
  setFetchError,
  setFetching,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { handleAxiosError } from '@/utils/handleAxiosError';
import { withReauth } from '@/utils/withReauth';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks, favoriteTracks } = useAppSelector((state) => state.track);
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setAllTracks(allTracks));
      dispatch(setFetching(false));
      return;
    } else {
      dispatch(setFetching(true));
      getAllTracks()
        .then((tracks) => dispatch(setAllTracks(tracks)))
        .catch((error) => {
          handleAxiosError(error, (msg) => dispatch(setFetchError(msg)));
        })
        .finally(() => dispatch(setFetching(false)));
    }
  }, []);

  useEffect(() => {
    if (favoriteTracks.length) {
      dispatch(setFavoriteTracks(favoriteTracks));
      return;
    } else {
      if (accessToken) {
        withReauth(
          (newToken) => getFavoriteTracks(newToken || accessToken),
          refreshToken,
          dispatch,
        )
          .then((tracks) => dispatch(setFavoriteTracks(tracks)))
          .catch((error) => {
            handleAxiosError(error, (msg) => dispatch(setFetchError(msg)));
          });
      }
    }
  }, [accessToken]);

  return <></>;
}
