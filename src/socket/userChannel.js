import { listenUserChannelEvents } from './socketAction';
import { getSocket } from './userConn';

let userChannel = null;
let currentUserId = null;

export const joinToUserChannel = async (userId) => {
    return new Promise((resolve, reject) => {
        const socket = getSocket();

        if (!socket) {
            console.error("joinToUserChannel socket is null");
            resolve(null);
        }

        if (userChannel && userChannel.state === 'joined' && userId === currentUserId) {
            console.log("RETURN SAME userChannel");
            resolve(userChannel);
            return;
        }

        userChannel = socket.channel(`user:${userId}`);
        currentUserId = userId;

        userChannel
            .join()
            .receive('ok', () => {
                listenUserChannelEvents(userChannel);
                resolve(userChannel);
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

export const getUserChannel = () => {
    if (userChannel) return userChannel;
    console.warn("userChannel is empty");
    return joinToUserChannel();
}
