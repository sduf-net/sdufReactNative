import { listenScreenChannelEvents } from './socketAction';
import { getSocket } from './userConn';
import { SOCKET_PROJECT_ID } from '@env';

let screenChannelList = [];

export const joinToAllScreenChannels = async (store) => {
  Object.values(store.screens.screens).forEach((element) => {
    // console.log("inside", element)
    joinToScreenChannel(element.id);
  });
};

export const joinToScreenChannel = async (screenID) => {
  return new Promise((resolve, reject) => {
    const socket = getSocket();

    if (!socket) {
      console.error('joinToScreenChannel socket is null');
      resolve(null);
    }

    if (screenChannelList[screenID] && screenChannelList[screenID].state === 'joined') {
      console.log('RETURN SAME screenChannel', screenID);
      resolve(screenChannelList[screenID]);
      return;
    }

    const screenChannel = socket.channel(`screen:${SOCKET_PROJECT_ID}:${screenID}`);

    screenChannel
      .join()
      .receive('ok', () => {
        console.log('Channel screen connection ok', screenID);
        listenScreenChannelEvents(screenChannel);
        screenChannelList[screenID] = screenChannel;
        resolve(screenChannel);
      })
      .receive('error', (err) => {
        console.log('Channel connection error', err);
        reject(null);
      })
      .receive('timeout', () => {
        console.log('Connection timed out');
        reject(null);
      });
  });
};
