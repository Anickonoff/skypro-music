import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type authDataType = {
  username: string;
  accessToken: string;
  refreshToken: string;
};

type initialStateType = authDataType & {
  authInitialized: boolean;
};

const initialState: initialStateType = {
  username: '',
  accessToken: '',
  refreshToken: '',
  authInitialized: false,
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
    initializeAuth: (state, action: PayloadAction<authDataType>) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.authInitialized = true;
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

export const {
  clearUserData,
  initializeAuth,
  setAccessToken,
  setRefreshToken,
  setUsername,
} = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
