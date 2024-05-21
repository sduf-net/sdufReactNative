import { listenUserChannelEvents } from './socketAction';
import { getSocket } from './userConn';

let userChannel = null;
let currentUserId = null;

export const joinToUserChannel = async (userId) => {
    const socket = getSocket();

    if (!socket) {
        console.error("joinToUserChannel socket is null");
        return null;
    }
    if (userChannel && userId === currentUserId) {
        console.log("RETURN SAME userChannel");
        return userChannel;
    }

    userChannel = socket.channel(`user:${userId}`);
    currentUserId = userId;

    return new Promise((resolve, reject) => {
        userChannel
            .join()
            .receive('ok', () => {
                console.log('Channel connection successful');
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

export const leaveUserChannel = () => {
    if (!userChannel) return;

    userChannel.leave().receive("ok", () => console.log("left leaveUserChannel"));
    userChannel = null;
}