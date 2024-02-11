import { listenUserChannelEvents } from './socketAction';
import { getSocket } from './userConn';

const socket = getSocket();
let userChannel = null;
let currentUserId = null;

export const joinToUserChannel = (userId) => {
    if (!socket) {
        console.error("joinToUserChannel socket is null")
        return;
    }
    if (userChannel && userId === currentUserId) {
        console.log("RETURN SAME userChannel")
        return userChannel;
    }

    userChannel = socket.channel(`user:${userId}`);
    currentUserId = userId;

    userChannel
        .join()
        .receive('ok', () => {
            console.log('Channel connection succsses')
            listenUserChannelEvents(userChannel);
        })
        .receive('error', err =>
            console.log('Channel connection error', err)
        )
        .receive('timeout', () =>
            console.log('Connection timed out')
        );

    return userChannel;
};

export const getUserChannel = () => {
    if (userChannel) return userChannel;

    console.error("userChannel is empty");
    return null;
}