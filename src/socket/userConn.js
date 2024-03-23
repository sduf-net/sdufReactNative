import { Socket } from 'phoenix'
import { SOCKET_URL } from "@env";

let socket = null;

export const initSocketConnection = () => {
    if (socket && socket.isConnected()) {
        return true;
    }

    socket = new Socket(`${SOCKET_URL}`, { timeout: 45 * 1000 })
    socket.connect();
    socket.onError(data => {
        console.log("ERROR", data)
        if (!data || !data.message) return;
        if (data.message.includes('403')) {
            console.error("Socket is empty")
            return false;
        }
        if (data.message.includes('401')) {
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
