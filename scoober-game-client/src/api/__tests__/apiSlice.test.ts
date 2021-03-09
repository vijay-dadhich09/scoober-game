import { configStore } from '../../app/store';
import socketMock from '../../testUtils/socketMock';
import apiSlice, {
  subscribeApiConnect,
  subscribeApiDisconnect,
  selectApi,
} from '../apiSlice';

describe('async api actions', () => {
  it('should handle initial state', () => {
    expect(apiSlice(undefined, {})).toEqual({ isConnected: false });
  });

  it('dispatches connected action subscribeApiConnect', () => {
    const store = configStore(socketMock);

    store.dispatch(subscribeApiConnect());

    const { api } = store.getState();
    expect(api).toEqual({ isConnected: true });
  });

  it('dispatches disconnected action subscribeApiConnect', () => {
    const store = configStore(socketMock);

    store.dispatch(subscribeApiDisconnect());

    const { api } = store.getState();
    expect(api).toEqual({ isConnected: false });
  });

  it('select api from state', () => {
    const state = {
      api: {
        connected: true,
      },
      game: {
        id: '123',
      },
    };

    expect(selectApi(state)).toEqual(state.api);
  });
});
