import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

const generateId = () => `${Date.now()}`;
export const selfId = generateId();

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    selfId,
    selfImg: 'player.png',
    opponentImg: 'opponent.png',
    isStarted: false,
    isSubmitting: false,
		attempts: [],
  },
  reducers: {
    startGame: (state, { payload }) => {
      const attempts = payload.attempts;
      const nextAttempts = attempts.map((item: any) => {
        if (item.user.id === state.selfId) {
          return {
            ...item,
            user: { ...item.user, profileImg: state.selfImg, isSelf: true },
          };
        } else {
          return {
            ...item,
            user: { ...item.user, profileImg: state.opponentImg, isSelf: false },
          };
        }
      });
      return { ...state, ...payload, attempts: nextAttempts, isStarted: true, isSubmitting: false };
    },
    submitAttempt: (state) => ({ ...state, isSubmitting: true})
  },
});

// ACTIONS 

export const { startGame, submitAttempt } = gameSlice.actions;

// ASYNC ACTIONS

export const subscribeGameStart = () => (socket: any, dispatch:any) => {
  socket.on('game', (game: any) => {
    // console.log('attempt-game-on: ', game);
    // console.log('attempt-isRoomFull: ', isRoomFull);
    dispatch(startGame(game))
  });
};

export const initGameStart = (attempt: any): AppThunk => (socket: any) => {
  socket.emit('newgame', attempt);
};

export const sendAttempt = (attempt: any): AppThunk => (socket: any, dispatch: any) => {
  dispatch(submitAttempt());
  socket.emit('turn', attempt);
};

export const leftGame = () => (socket: any) => {
  socket.emit('left');
};

// SELECTORS

export const selectGame = (state: RootState) => state.game;

export const selectGameInProgress = ({ game }: RootState) =>
  game.isStarted && !game.winner && !game.isRoomFull

export const selectCanSubmit = ({ game }: RootState) =>
  game.isStarted && game.turn === game.selfId && !game.isSubmitting;

// REDUCER

export default gameSlice.reducer;
