import {
  appendCallback,
  changeCallback,
  closePopupCallback,
  insertAfterCallback,
  insertBeforeCallback,
  logInCallback,
  openPopupCallback,
  openScreenCallback,
  removeCallback,
  replaceCallback,
  screenReceivedCallback
} from "./_actions";

const GET_SCREEN_BY_NAME = "request_screen";

// FIXME push event must have same format for all event
export const pushEventToChannel = async (channel, params) => {
  console.log("pushEventToChannel")
  const opts = {
    user_id: params.userId,
    action: params.actionName,
    payload: params.payload,
    metadata: {
      date: Date.now()
    }
  }

  if (channel) {
    pushEvent(channel, "action_performed", opts);
  }
}

export const pushEvent = (channel, action, params) => {
  channel.push(action, params);
}

export const getScreenThroughSocket = async (channel, params) => {
  console.log("getScreenThroughSocket")
  const opts = {
    user_id: params.userId,
    action: GET_SCREEN_BY_NAME,
    payload: {
      query: params.queryString,
      screen_name: params.screenName
    },
    metadata: {}
  }

  if (channel) {
    pushEvent(channel, "action_performed", opts);
  }
}

export const listenUserChannelEvents = (channel) => {
  if (!channel) {
    return;
  }
  addListeners(channel);
}

export const listenScreenChannelEvents = (channel) => {
  if (!channel) {
    return;
  }
  addListeners(channel);
}

const addListeners = (channel) => {
  addListener(channel, { event_name: "insertBefore", callback: insertBeforeCallback });
  addListener(channel, { event_name: "insert_after", callback: insertAfterCallback });
  addListener(channel, { event_name: "remove", callback: removeCallback });
  addListener(channel, { event_name: "change", callback: changeCallback });
  // addListener({ event_name: "update", callback: changeCallback });
  addListener(channel, { event_name: "replace", callback: replaceCallback });
  addListener(channel, { event_name: "append", callback: appendCallback });
  addListener(channel, { event_name: "login", callback: logInCallback });
  addListener(channel, { event_name: "openPopup", callback: openPopupCallback });
  addListener(channel, { event_name: "closePopup", callback: closePopupCallback });
  addListener(channel, { event_name: "openScreen", callback: openScreenCallback });
  addListener(channel, { event_name: "screen_received", callback: screenReceivedCallback });
}

const addListener = (channel, params) => {
  channel.on(params.event_name, params.callback)
}
