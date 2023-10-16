import { Socket } from 'phoenix'
import uuid from 'react-native-uuid';
import { SOCKET_URL } from '../utils/constants';

let socket = null;

export const initConnection = () => {
    if (socket) return socket;

    socket = new Socket(`${SOCKET_URL}`, { timeout: 45 * 1000})

    socket.connect();

    socket.onError(data => {
        if (!data?.message.includes('403')) {
            console.log('Socket connection error')
            return;
        }
    });

    return socket;
}

export const closeConnection = () => {
    if (!socket) {
        return;
    }

    socket.disconnect();

    socket = null;
};

