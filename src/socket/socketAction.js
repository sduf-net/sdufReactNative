import store from "../redux/store";
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
  updateMapMarkersCallback
} from "./actionCallbacks";


// FIXME push event must have same format for all event
export const pushEventToChannel = async (channel, params) => {
  console.log("pushEventToChannel", params)

  const user = store.getState().user;

  const opts = {
    user_id: user.id,
    user_token: user.token,
    action: params.actionName,
    payload: params.payload,
    metadata: {
      date: Date.now(),
      ...params.metadata ?? {},
    }
  }

  if (channel) {
    pushEvent(channel, "action_performed", opts);
  }
}

const pushEvent = (channel, action, params) => {
  channel.push(action, params);
}

export const listenUserChannelEvents = (channel) => {
  if (!channel) {
    return;
  }
  removeListeners(channel);
  addListeners(channel);
}

export const listenScreenChannelEvents = (channel) => {
  if (!channel) {
    return;
  }
  removeListeners(channel);
  addListeners(channel);
}

const addListener = (channel, params) => {
  channel.on(params.event_name, params.callback)
}

const removeListener = (channel, params) => {
  channel.off(params.event_name)
}

const addListeners = (channel) => {
  addListener(channel, { event_name: "insert_before", callback: insertBeforeCallback });
  addListener(channel, { event_name: "insert_after", callback: insertAfterCallback });
  addListener(channel, { event_name: "remove", callback: removeCallback });
  addListener(channel, { event_name: "change", callback: changeCallback });
  addListener(channel, { event_name: "replace", callback: replaceCallback });
  addListener(channel, { event_name: "append", callback: appendCallback });
  addListener(channel, { event_name: "login", callback: logInCallback });
  addListener(channel, { event_name: "logout", callback: logOutCallback });
  addListener(channel, { event_name: "openPopup", callback: openPopupCallback });
  addListener(channel, { event_name: "closePopup", callback: closePopupCallback });
  addListener(channel, { event_name: "openScreen", callback: openScreenCallback });
  addListener(channel, { event_name: "screen_received", callback: screenReceivedCallback });
  addListener(channel, { event_name: "show_float_card", callback: showFloatCardCallback });
  addListener(channel, { event_name: "update_map_markers", callback: updateMapMarkersCallback });
}

const removeListeners = (channel) => {
  removeListener(channel, { event_name: "insert_before" });
  removeListener(channel, { event_name: "insert_after" });
  removeListener(channel, { event_name: "remove" });
  removeListener(channel, { event_name: "change" });
  removeListener(channel, { event_name: "replace" });
  removeListener(channel, { event_name: "append" });
  removeListener(channel, { event_name: "login" });
  removeListener(channel, { event_name: "logout" });
  removeListener(channel, { event_name: "openPopup" });
  removeListener(channel, { event_name: "closePopup" });
  removeListener(channel, { event_name: "openScreen" });
  removeListener(channel, { event_name: "screen_received" });
  removeListener(channel, { event_name: "show_float_card" });
  removeListener(channel, { event_name: "update_map_markers" });
}
