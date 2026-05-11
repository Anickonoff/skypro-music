import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const username = localStorage.getItem('username') || '';

    dispatch(setAccessToken(accessToken));
    dispatch(setRefreshToken(refreshToken));
    dispatch(setUsername(username));
  }, [dispatch]);
};
