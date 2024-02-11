import { Socket } from 'phoenix'
import { SOCKET_URL } from '../utils/constants';

let socket = null;

export const initSocketConnection = () => {
    if (socket) return;

    socket = new Socket(`${SOCKET_URL}`, { timeout: 45 * 1000})
    socket.connect();
    socket.onError(data => {
        if (!data?.message.includes('403')) {
            console.error("Socket is empty")
            return false;
        }
        if (!data?.message.includes('401')) {
            console.error("Log out")
            return false;
        }
    });

    return true;
}

export const closeConnection = () => {
    if (!socket) return;

    socket.disconnect();
    socket = null;
    return true;
};


export const getSocket = () => {
    if (socket) return socket;

    console.error("Socket is empty")
    return null;
};
