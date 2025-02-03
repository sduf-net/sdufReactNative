import store from '../redux/store';
import { getAllEvents } from '../constants/eventName';
import { handleCallbackAction } from '../callback_handler';

// FIXME push event must have same format for all event
export const pushEventToChannel = async (channel, params) => {
  const user = store.getState().user;
  const currentScreenId = store.getState().screens.currentScreenId;
  const opts = {
    user_id: user.id,
    user_token: user.token,
    screen_id: currentScreenId,
    action: params.actionName,
    payload: params.payload,
    metadata: {
      date: Date.now(),
      ...(params.metadata ?? {}),
    },
  };

  console.debug('pushEventToChannel', opts);

  if (channel) {
    return await pushEvent(channel, 'action_performed', opts);
  }
};

const pushEvent = (channel, action, params) => {
  return new Promise((resolve, reject) => {
    channel
      .push(action, params)
      .receive('ok', (payload) => {
        resolve(payload);
      })
      .receive('error', (err) => {
        console.log('phoenix errored', err);
        reject(err);
      })
      .receive('timeout', () => {
        console.log('timed out pushing');
        reject('Timed out pushing');
      });
  });
};

export const listenUserChannelEvents = (channel) => {
  if (!channel) {
    return;
  }
  removeListeners(channel);
  addListeners(channel);
};

export const listenScreenChannelEvents = (channel) => {
  if (!channel) {
    return;
  }
  removeListeners(channel);
  addListeners(channel);
};

const addListener = (channel, params) => {
  channel.on(params.event_name, params.callback);
};

const removeListener = (channel, params) => {
  channel.off(params.event_name);
};

const addListeners = (channel) => {
  getAllEvents().forEach((event_name) => {
    addListener(channel, { event_name: event_name, callback: handleCallbackAction });
  });
};

const removeListeners = (channel) => {
  getAllEvents().forEach((event_name) => {
    removeListener(channel, { event_name: event_name });
  });
};
