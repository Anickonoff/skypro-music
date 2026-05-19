import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { trackSliceReducer } from './features/trackSlice';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import { authSliceReducer } from './features/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      track: trackSliceReducer,
      auth: authSliceReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppStore = useStore.withTypes<AppStore>();

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
