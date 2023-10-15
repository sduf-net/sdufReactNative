import { listenUserChannelEvents } from '../socket/socketAction';
import { joinToUserChannel } from '../socket/user_channel';
import { initConnection } from '../socket/user_conn';

export default function useUserChannel(userId) {
    initConnection();
    const userChannel = joinToUserChannel(userId);
    listenUserChannelEvents(userChannel);

    return {userChannel};
}