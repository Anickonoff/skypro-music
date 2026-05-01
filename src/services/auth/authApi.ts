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

export const authUser = (data: authUserProps): Promise<authUserResponse> => {
  return axios.post(BASE_URL + '/user/login', data, {
    headers: { 'content-type': 'application/json' },
  });
};
