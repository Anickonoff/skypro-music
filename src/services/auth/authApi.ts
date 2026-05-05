import { BASE_URL } from '../constants';
import axios from 'axios';

type authUserProps = {
  email: string;
  password: string;
};

type authUserResponse = {
  email: string;
  username: string;
  _id: number;
};

type signUpUserProps = {
  email: string;
  password: string;
  username: string;
};

type signUpUserResponse = {
  message: string;
  result: {
    email: string;
    username: string;
    _id: number;
  };
  success: boolean;
};

type getTokenResponse = {
  refresh: string;
  access: string;
};

type refreshTokenResponse = {
  access: string;
};

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
