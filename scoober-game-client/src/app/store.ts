import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import gameReducer from '../features/game/gameSlice';
import apiReducer from '../api/apiSlice';
import { createSocketApiMiddleware } from '../api/apiMiddleware';

export const configStore = (socket: any) => {
  const apiMiddleware = createSocketApiMiddleware(socket);
  const middleware = [apiMiddleware, ...getDefaultMiddleware()];
  return configureStore({
    reducer: {
      game: gameReducer,
      api: apiReducer,
    },
    middleware,
  });
};

export type RootState = ReturnType<any>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
