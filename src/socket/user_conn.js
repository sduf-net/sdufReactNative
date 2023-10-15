import { Socket } from 'phoenix'
import uuid from 'react-native-uuid';
import { SOCKET_URL } from '../utils/constants';

let socket = null;

export const initConnection = (token) => {
    if (!token) {
        console.log("TOKEN IS EMPTY")
    }

    if (socket) return socket;

    // TODO get token from memory
    token = uuid.v4();

    if (socket) {
        // console.log("Socket is already connected");
        return socket;
    }
    socket = new Socket(`${SOCKET_URL}`, { timeout: 45 * 1000, params: { userToken: token } })

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

