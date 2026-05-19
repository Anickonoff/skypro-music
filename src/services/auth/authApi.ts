import { BASE_URL } from '../constants';
import axios from 'axios';
import {
  authUserProps,
  authUserResponse,
  getTokenResponse,
  refreshTokenResponse,
  signUpUserProps,
  signUpUserResponse,
} from './types';

export const authUser = (data: authUserProps): Promise<authUserResponse> => {
  return axios
    .post(BASE_URL + '/user/login', data, {
      headers: { 'content-type': 'application/json' },
    })
    .then((response) => response.data);
};

export const signUpUser = (
  data: signUpUserProps,
): Promise<signUpUserResponse> => {
  return axios
    .post(BASE_URL + '/user/signup', data, {
      headers: { 'content-type': 'application/json' },
    })
    .then((response) => response.data);
};

export const getToken = (data: authUserProps): Promise<getTokenResponse> => {
  return axios
    .post(BASE_URL + '/user/token', data, {
      headers: { 'content-type': 'application/json' },
    })
    .then((response) => response.data);
};

export const refreshToken = (
  refresh: string,
): Promise<refreshTokenResponse> => {
  return axios
    .post(
      BASE_URL + '/user/token/refresh',
      { refresh },
      {
        headers: { 'content-type': 'application/json' },
      },
    )
    .then((response) => response.data);
};
