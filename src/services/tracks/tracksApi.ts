import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getAllTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all').then(
    (response) => response.data.data,
  );
};
