import axios from 'axios';
import { BASE_URL } from '../constants';
import { SelectionTracksType, TrackType } from '@/sharedTypes/sharedTypes';

export const getAllTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all').then(
    (response) => response.data.data,
  );
};

export const getSelectionById = (id: string): Promise<SelectionTracksType> => {
  return axios(BASE_URL + `/catalog/selection/${id}`).then(
    (response) => response.data.data,
  );
};

export const addLike = (access: string, id: number) => {
  return axios.post(
    BASE_URL + `/catalog/track/${id}/favorite`,
    {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = (access: string, id: number) => {
  return axios.delete(BASE_URL + `/catalog/track/${id}/favorite`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
};

export const getFavoriteTracks = (access: string): Promise<TrackType[]> => {
  return axios
    .get(BASE_URL + '/catalog/track/favorite/all', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((response) => response.data.data);
};
