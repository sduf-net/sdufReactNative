import { listenScreenChannelEvents } from './socketAction';
import { getSocket } from './userConn';
import { SOCKET_PROJECT_ID } from "@env";

let screenChannelList = [];

export const joinToAllScreenChannels = async (store) => {
    Object.values(store.screens.screens).forEach(element => {
        // console.log("inside", element)
        joinToScreenChannel(element.name)
    });
}

export const joinToScreenChannel = async (screenName) => {
    return new Promise((resolve, reject) => {
        const socket = getSocket();

        if (!socket) {
            console.error("joinToScreenChannel socket is null");
            resolve(null);
        }

        if (screenChannelList[screenName] && screenChannelList[screenName].state === 'joined') {
            console.log("RETURN SAME screenChannel", screenName);
            resolve(screenChannelList[screenName]);
            return;
        }

        const screenChannel = socket.channel(`screen:${SOCKET_PROJECT_ID}:${screenName}`);


        screenChannel
            .join()
            .receive('ok', () => {
                console.log('Channel screen connection ok', screenName);
                listenScreenChannelEvents(screenChannel);
                screenChannelList[screenName] = screenChannel;
                resolve(screenChannel);
            })
            .receive('error', err => {
                console.log('Channel connection error', err);
                reject(null);
            })
            .receive('timeout', () => {
                console.log('Connection timed out');
                reject(null);
            });
    });
};

export const getScreenChannelByName = (screenName) => {
    if (screenChannelList[screenName]) return screenChannelList[screenName];
    console.warn("userChannel is empty");
    return joinToScreenChannel(screenName);
}