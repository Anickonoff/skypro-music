import axios from 'axios';
import { BASE_URL } from '../constants';
import { TrackType } from '@/sharedTypes/sharedTypes';

export const getAllTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all').then(
    (response) => response.data.data,
  );
};

export const getSelectionById = (id: string): Promise<TrackType[]> => {
  return axios(BASE_URL + `/catalog/selection/${id}`).then(
    (response) => response.data.data,
  );
};