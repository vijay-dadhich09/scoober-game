export const createSocketApiMiddleware = (socket) => ({
  dispatch,
  getState,
}) => (next) => (action) => {
  if (typeof action === 'function') {
    action(socket, dispatch, getState);
  } else {
    return next(action);
  }
};
