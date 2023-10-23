import { listenUserChannelEvents } from '../socket/socketAction';
import { joinToUserChannel } from '../socket/user_channel';

export default function useUserChannel(userId) {
    const userChannel = joinToUserChannel(userId);
    listenUserChannelEvents(userChannel);

    return {userChannel};
}