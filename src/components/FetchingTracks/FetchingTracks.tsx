'use client';

import { getAllTracks } from '@/services/tracks/tracksApi';
import {
  setAllTracks,
  setFetchError,
  setFetching,
} from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.track);

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
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Что-то с интернетом'));
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
          }
        })
        .finally(() => dispatch(setFetching(false)));
    }
  }, []);

  return <></>;
}
