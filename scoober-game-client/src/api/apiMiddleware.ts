export const createSocketApiMiddleware = (socket: any) => ({
  dispatch,
  getState,
}: any) => (next: any) => (action: any) => {
  if (typeof action === 'function') {
    action(socket, dispatch, getState);
  } else {
    return next(action);
  }
};
