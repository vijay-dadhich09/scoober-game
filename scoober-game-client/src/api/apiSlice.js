import { createSlice } from '@reduxjs/toolkit';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    isConnected: false,
  },
  reducers: {
    connected: (state) => ({ ...state, isConnected: true }),
		disconnected: (state) => ({ ...state, isConnected: false }),
  },
});

// ACTIONS

export const { connected, disconnected } = apiSlice.actions;

// ASYNC ACTIONS

export const subscribeApiConnect = () => (socket, dispatch) => {
  socket.on('connect', () => dispatch(connected()));
};

export const subscribeApiDisconnect = () => (socket, dispatch) => {
	socket.on('disconnect', () => dispatch(disconnected()));
};

// SELECTOR

export const selectApi = (state) => state.api;

// REDUCER 

export default apiSlice.reducer;
