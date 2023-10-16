import store from "../redux/store";
import { GET_SCREEN_BY_NAME } from "../utils/constants";
import {
  appendCallback,
  changeCallback,
  closePopupCallback,
  insertAfterCallback,
  insertBeforeCallback,
  logInCallback,
  showFloatCardCallback,
  openPopupCallback,
  openScreenCallback,
  removeCallback,
  replaceCallback,
  screenReceivedCallback,
  updateMapMarkersCallback
} from "./_actions";
import { getUserToken } from "./auth";

const userId = store.getState().user.id;

// FIXME push event must have same format for all event
export const pushEventToChannel = async (channel, params) => {
  console.log("pushEventToChannel")
  const opts = {
    user_id: userId,
    user_token: await getUserToken(),
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
    user_id: userId,
    user_token: await getUserToken(),
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

const addListener = (channel, params) => {
  channel.on(params.event_name, params.callback)
}

const addListeners = (channel) => {
  addListener(channel, { event_name: "insert_before", callback: insertBeforeCallback });
  addListener(channel, { event_name: "insert_after", callback: insertAfterCallback });
  addListener(channel, { event_name: "remove", callback: removeCallback });
  addListener(channel, { event_name: "change", callback: changeCallback });
  addListener(channel, { event_name: "replace", callback: replaceCallback });
  addListener(channel, { event_name: "append", callback: appendCallback });
  addListener(channel, { event_name: "login", callback: logInCallback });
  addListener(channel, { event_name: "openPopup", callback: openPopupCallback });
  addListener(channel, { event_name: "closePopup", callback: closePopupCallback });
  addListener(channel, { event_name: "openScreen", callback: openScreenCallback });
  addListener(channel, { event_name: "screen_received", callback: screenReceivedCallback });
  addListener(channel, { event_name: "show_float_card", callback: showFloatCardCallback });
  addListener(channel, { event_name: "update_map_markers", callback: updateMapMarkersCallback });
}
