import { Socket } from 'phoenix'
import { SOCKET_URL, SOCKET_PROJECT_TOKEN } from "@env";
import * as  rootNavigation from "../navigation/rootNavigation";
import { leaveUserChannel } from './userChannel';

let socket = null;

export const initSocketConnection = async () => {
    if (socket && socket.isConnected()) {
        return true;
    }

    socket = new Socket(`${SOCKET_URL}`, { params: { token: SOCKET_PROJECT_TOKEN }, timeout: 45 * 1000 });

    return new Promise((resolve, reject) => {
        socket.connect();
        console.log("Socket connect");

        socket.onOpen(() => {
            console.info("The socket was opened");
            resolve(true);
        });

        socket.onError(data => {
            rootNavigation.navigate('YouAreOfflineScreen', {});

            if (!data || !data.message) {
                reject(false);
                return;
            }

            if (data.message.includes('403')) {
                console.error("Socket is empty");
                reject(false);
                return;
            }

            if (data.message.includes('401')) {
                console.error("Log out");
                // store.dispatch();
                reject(false);
                return;
            }

            reject(false);
        });
    });
}


export const closeConnection = () => {
    if (!socket) return;

    leaveUserChannel();
    socket.disconnect();
    socket = null;
    return true;
};


export const getSocket = () => {
    if (socket) return socket;

    console.error("Socket is empty")
    return null;
};
