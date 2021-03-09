import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import './index.css';
import App from './App';
// import { store } from './app/store';
import { configStore } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// const url = 'http://localhost:5001';
const url = 'https://vijay-dadhich09.github.io/scoober-game-server:5001';
const socket = io(url);
const store = configStore(socket);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
