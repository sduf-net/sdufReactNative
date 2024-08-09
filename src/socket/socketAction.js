import store from '../redux/store';
import {
  appendCallback,
  changeCallback,
  closePopupCallback,
  insertAfterCallback,
  insertBeforeCallback,
  logInCallback,
  logOutCallback,
  showFloatCardCallback,
  openPopupCallback,
  openScreenCallback,
  removeCallback,
  replaceCallback,
  screenReceivedCallback,
  updateMapMarkersCallback,
  navigateToScreenCallback,
  requestCurrentPositionCallback,
  showErrorMessageCallback,
  screenSilentUpdateCallback,
} from './actionCallbacks';

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

  console.log('pushEventToChannel', opts);

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

const callbacks = [
  { event_name: 'insert_before', callback: insertBeforeCallback },
  { event_name: 'insert_after', callback: insertAfterCallback },
  { event_name: 'remove', callback: removeCallback },
  { event_name: 'change', callback: changeCallback },
  { event_name: 'replace', callback: replaceCallback },
  { event_name: 'append', callback: appendCallback },
  { event_name: 'login', callback: logInCallback },
  { event_name: 'logout', callback: logOutCallback },
  { event_name: 'open_popup', callback: openPopupCallback },
  { event_name: 'close_popup', callback: closePopupCallback },
  { event_name: 'openScreen', callback: openScreenCallback },
  { event_name: 'screen_received', callback: screenReceivedCallback },
  { event_name: 'screen_silent_update', callback: screenSilentUpdateCallback },
  { event_name: 'show_float_card', callback: showFloatCardCallback },
  { event_name: 'update_map_markers', callback: updateMapMarkersCallback },
  { event_name: 'navigate_to_screen', callback: navigateToScreenCallback },
  { event_name: 'request_user_geo', callback: requestCurrentPositionCallback },
  { event_name: 'show_error_message', callback: showErrorMessageCallback },
];

const addListeners = (channel) => {
  callbacks.forEach((x) => {
    addListener(channel, { event_name: x.event_name, callback: x.callback });
  });
};

const removeListeners = (channel) => {
  callbacks.forEach((x) => {
    removeListener(channel, { event_name: x.event_name });
  });
};
