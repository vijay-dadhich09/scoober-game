import { createSocketApiMiddleware } from '../apiMiddleware';

const create = (socketMock) => {
  const middleware = createSocketApiMiddleware(socketMock);
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn();
  const invoke = action => middleware(store)(next)(action);
  return { store, next, invoke };
};

it('passes through non-function action', () => {
  const { next, invoke } = create({});
  const action = { type: 'TEST' };
  invoke(action);
  expect(next).toHaveBeenCalledWith(action);
})

it('calls the function', () => {
  const { invoke } = create({});
  const fn = jest.fn();
  invoke(fn);
  expect(fn).toHaveBeenCalled();
})

it('passes socket, dispatch and getState', () => {
  const socketMock = {on: jest.fn()};
  const { store, invoke } = create(socketMock);
  invoke((socketMock, dispatch, getState) => {
    getState();
    socketMock.on('TEST');
    dispatch('TEST DISPATCH');
  });
  expect(store.getState).toHaveBeenCalled();
  expect(socketMock.on).toHaveBeenCalledWith('TEST');
  expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
})