import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

const initialState: initialStateType = {
  username: '',
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
    clearUserData: (state) => {
      state.username = '';
      state.accessToken = '';
      state.refreshToken = '';
      localStorage.removeItem('username');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setUsername, setAccessToken, setRefreshToken, clearUserData } =
  authSlice.actions;
export const authSliceReducer = authSlice.reducer;
