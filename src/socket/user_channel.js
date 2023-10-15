import { initConnection } from './user_conn';

const socket = initConnection();
let userChannel = null;

export const joinToUserChannel = (userId) => {
    if (!socket) {
        console.log("joinToUserChannel socket is null")
        return;
    }
    if (userChannel) {
        return userChannel;
    }

    userChannel = socket.channel(`user:${userId}`);

    userChannel
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

    return userChannel;
};
