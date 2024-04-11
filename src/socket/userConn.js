import { Socket } from 'phoenix'
import { SOCKET_URL, SOCKET_PROJECT_TOKEN } from "@env";
import * as  rootNavigation from "../navigation/rootNavigation";

let socket = null;

export const initSocketConnection = () => {
    if (socket && socket.isConnected()) {
        return true;
    }

    socket = new Socket(`${SOCKET_URL}`, { params: { token: SOCKET_PROJECT_TOKEN }, timeout: 45 * 1000 })
    socket.connect();
    socket.onError(data => {
        rootNavigation.navigate('YouAreOfflineScreen', {});

        if (!data || !data.message) return;
        if (data.message.includes('403')) {
            console.error("Socket is empty")
            return false;
        }
        if (data.message.includes('401')) {
            console.error("Log out");
            // store.dispatch();
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
