import { Socket } from 'phoenix'
import uuid from 'react-native-uuid';
import { SOCKET_URL } from '../utils/constants';

let socket = null;
let userChannel = null;

export const initSocketConnection = (token) => {
  // TODO get token from memory
  token = uuid.v4();

  if (socket) {
    console.log("Socket is already connected");
    return;
  }
  socket = new Socket(`${SOCKET_URL}`, { timeout: 45 * 1000, params: { userToken: token } })

  socket.connect();
  
  socket.onError(data => {
    if (!data?.message.includes('403')) {
      return;
    }
  });
}

export const joinToUserChannel = (userId) => {
  if (!socket) {
    return;
  }
  if (userChannel) {
    return userChannel;
  }

  userChannel = socket.channel(`user:${userId}`);
  joinChannel(userChannel);

  return userChannel;
};

export const joinToScreenChannel = (screenName) => {
  if (!socket) {
    return;
  }

  const channel = socket.channel(`screen:${screenName}`);
  joinChannel(channel);

  return channel;
};

const joinChannel = (channel) => {
  channel
    .join()
    .receive('ok', () => {
      console.log('Channel connection succsses')
     })
    .receive('error', err =>
      console.log('Channel connection error', err)
    )
    .receive('timeout', () =>
      console.log('Connection timed out')
    );
}

export const closeSocketConnection = () => {
  if (!socket) {
    return;
  }

  socket.disconnect();

  socket = null;
};

export const getUserChannel = () => {
  if (!socket) {
    return false;
  }
  if (userChannel) {
    return userChannel;
  }
}
