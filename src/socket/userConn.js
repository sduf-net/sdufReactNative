import { Socket } from 'phoenix';
import { SOCKET_URL, SOCKET_PROJECT_TOKEN } from '@env';
import { newError } from '../hooks/useErrors';
import store from '../redux/store';
import { selectLastEventIDGlobal } from '../redux/screens';

let socket = null;

export const initSocketConnection = async () => {
  return new Promise((resolve, reject) => {
    if (socket && socket.isConnected()) {
      resolve(socket);
    }

    socket = new Socket(`${SOCKET_URL}`, {
      params: { token: SOCKET_PROJECT_TOKEN, last_event_id: selectLastEventIDGlobal(store.getState().screens) },
      timeout: 45 * 1000,
    });

    socket.connect();
    console.log('Socket connect');

    socket.onOpen(() => {
      console.info('The socket was opened');
      resolve(socket);
    });

    socket.onError((data) => {
      newError('You are offline');

      if (data?.message?.includes('403')) {
        console.error('Socket is empty');
        reject(false);
      }

      if (data?.message?.includes('401')) {
        console.error('Log out');
        reject(false);
      }

      reject(false);
    });
  });
};

export const closeConnection = async () => {
  if (!socket) return;

  socket.channels.forEach((channel) => channel.leave());

  socket.disconnect();
  socket = null;
  return true;
};

export const getSocket = () => {
  if (socket) return socket;

  console.error('Socket is empty');
  return null;
};
