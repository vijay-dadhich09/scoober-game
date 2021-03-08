import { configStore } from '../../../app/store';
import socketMock from '../../../testUtils/socketMock';
import game, {
  startGame,
  subscribeGameStart,
  initGameStart,
  sendAttempt,
  selfId,
  selectGame,
  selectGameInProgress,
  selectCanSubmit,
} from '../gameSlice';

describe('gameSlice', () => {
  const getInitState = () => ({
    selfId,
    selfImg: 'player.png',
    opponentImg: 'opponent.png',
    isStarted: false,
    isSubmitting: false,
    attempts: [],
  });
  describe('Reducer and Actions', () => {
    it('should handle initial state', () => {
      expect(game(undefined, {})).toEqual(getInitState());
    });

    it('sets isStarted true on startGame', () => {
      const state = {
				...getInitState(),
				isStarted: false,
			};
			const action = {
				type: startGame.type,
				payload: {
					attempts: [],
				},
			};

      const nextState = game(state, action);

      expect(nextState.isStarted).toBe(true);
    });

    it('sets isSubmitting to false on startGame action dispatch', () => {
      const state = { ...getInitState(), isSubmitting: true };
			const action = {
				type: startGame.type,
				payload: {
					attempts: [],
				},
			};

      const nextState = game(state, action);

      expect(nextState.isSubmitting).toBe(false);
    });

    it('sets player profile image on startGame action dispatch', () => {
      const state = {
        ...getInitState(),
        selfId: '007',
        selfImg: 'myimg.jpg',
        attempts: [],
      };
      const action = {
        type: startGame.type,
        payload: {
          attempts: [{ user: { id: '007' } }],
        },
      };

      const nexState = game(state, action);
      const attempt = nexState.attempts[0];
      expect(attempt.user.profileImg).toBe(state.selfImg);
    });

    it('sets opponent profile image on startGame action dispatch', () => {
      const state = {
        ...getInitState(),
        selfId: '007',
        opponentImg: 'myimg.jpg',
        attempts: [],
      };
      const action = {
        type: startGame.type,
        payload: {
          attempts: [{ user: { id: '888' } }],
        },
      };

      const nexState = game(state, action);
      const attempt = nexState.attempts[0];
      expect(attempt.user.profileImg).toBe(state.opponentImg);
    });

    it('updates state on subscribeGameStart', () => {
      const state = getInitState();
      socketMock.on = jest.fn((_, cb) => cb(state));
      const store = configStore(socketMock);

      store.dispatch(subscribeGameStart());

      const { game } = store.getState();
      expect(game.isStarted).toBe(true);
      expect(socketMock.on.mock.calls[0][0]).toEqual('game');
    });

    it('calls socket.emit on initGameStart', () => {
      const store = configStore(socketMock);
      const mockedUser = { id: '001' };

      store.dispatch(initGameStart(mockedUser));

      expect(socketMock.emit).toHaveBeenCalledWith('newgame', mockedUser);
    });

    it('calls socket.emit on sendAttempt', () => {
      const store = configStore(socketMock);
      const mockedTurn = '001';

      store.dispatch(sendAttempt(mockedTurn));

      expect(socketMock.emit).toHaveBeenCalledWith('turn', mockedTurn);
    });
  });

  describe('Selectors', () => {
    it('selects game', () => {
      const state = {
				game: {id: 1},
			};

      expect(state.game).toEqual(selectGame(state));
    });

    it('selects gameInProgress to be true if game started and no winner', () => {
      const state = {
        game: {
          isStarted: true,
          winner: null,
        },
      };

      expect(selectGameInProgress(state)).toBe(true);
    });

    it('selects gameInProgress to be false if game not started and no winner', () => {
      const state = {
        game: {
          isStarted: false,
          winner: null,
        },
      };

      expect(selectGameInProgress(state)).toBe(false);
    });

    it('selects gameInProgress to be false if game started and has winner', () => {
      const state = {
        game: {
          isStarted: true,
          winner: '007',
        },
      };

      expect(selectGameInProgress(state)).toBe(false);
    });

    it('selects gameInProgress to be false if game not started and has winner', () => {
      const state = {
        game: {
          isStarted: false,
          winner: null,
        },
      };

      expect(selectGameInProgress(state)).toBe(false);
    });

    it('can submit after it has turn and not yet submitted', () => {
      const game = getInitState();
      const state = {
        game: {
          ...game,
          isStarted: true,
          turn: game.selfId,
          isSubmitting: false,
        },
      };

      expect(selectCanSubmit(state)).toBe(true);
    });

    it('cannot submit if game is not started', () => {
      const game = getInitState();
      const state = {
        game: {
          ...game,
          isStarted: false,
          turn: game.selfId,
          isSubmitting: false,
        },
      };

      expect(selectCanSubmit(state)).toBe(false);
    });
    it('cannot submit on opponent turn', () => {
      const game = getInitState();
      const state = {
        game: {
          ...game,
          isStarted: true,
          turn: `${game.selfId}-opponent`,
          isSubmitting: false,
        },
      };

      expect(selectCanSubmit(state)).toBe(false);
    });

    it('cannot submit multipe times in a row', () => {
      const game = getInitState();
      const state = {
        game: {
          ...game,
          isStarted: true,
          turn: game.selfId,
          isSubmitting: true,
        },
      };

      expect(selectCanSubmit(state)).toBe(false);
    });
  });
});
