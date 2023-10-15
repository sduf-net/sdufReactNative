import { initSocketConnection, joinToUserChannel } from '../socket/connection';
import { listenUserChannelEvents } from '../socket/socketAction';

export default function useUserChannel(userId) {
    initSocketConnection();
    const userChannel = joinToUserChannel(userId);
    listenUserChannelEvents(userChannel);

    return {userChannel};
}