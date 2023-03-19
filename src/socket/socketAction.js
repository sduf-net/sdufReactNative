import { getDBConnection } from "../db/db";
import { getUserChannel, joinToScreenChannel } from "./connection";
import uuid from 'react-native-uuid';
import { saveScreen } from "../db/screen/screen_write_model";
import { setCurrentScreen } from "../redux/screens";
import store from '../redux/store'

const GET_SCREEN_BY_NAME = "request_screen";

// FIXME push event must have same format for all event
export const pushEventToUserChannel = (params) => {
  const channel = getUserChannel();
  channel.push(params.event_name, {
    type: params.type,
    user_id: params.userId,
    screen_name: params.screenName,
    query: params.query,
    callback_url: params.callbackUrl
  });
}

export const pushEvent = (channel, action, params) => {
  channel.push(action, params);
}

export const getScreenThroughSocket = (screenChannel, action, params) => {
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

  if (screenChannel) {
    pushEvent(screenChannel, action, opts);
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
  let insertBeforeCallback = (data) => {
    console.log("insertBeforeCallback", data);
  };
  let insertAfterCallback = (data) => {
    console.log("insertAfterCallback", data);
  };
  let removeCallback = (data) => {
    console.log("removeCallback", data);
  };
  let changeCallback = (data) => {
    console.log("changeCallback", data);
  };
  let replaceCallback = (data) => {
    console.log("replaceCallback", data);
  };
  let appendCallback = (data) => {
    console.log("appendCallback", data);
  };
  let logInCallback = (data) => {
    console.log("logInCallback", data);
  };
  let screenReceivedCallback = (data) => {
    console.log("screenReceivedCallback", data);
    // getDBConnection().then(db => saveScreen(db, data));
    store.dispatch(setCurrentScreen({ id: data.id, name: data.name, nestedComponents: data.nestedComponents }))
  };
  let openPopupCallback = (data) => {
    console.log("openPopupCallback", data);
  };
  let closePopupCallback = (data) => {
    console.log("closePopupCallback", data);
  };
  let openScreenCallback = (data) => {
    console.log("openScreenCallback", data);
  };

  addListener(channel, { event_name: "insertBefore", callback: insertBeforeCallback });
  addListener(channel, { event_name: "insertAfter", callback: insertAfterCallback });
  addListener(channel, { event_name: "remove", callback: removeCallback });
  addListener(channel, { event_name: "change", callback: changeCallback });
  // addListener({ event_name: "update", callback: changeCallback });
  addListener(channel, { event_name: "replace", callback: replaceCallback });
  addListener(channel, { event_name: "append", callback: appendCallback });
  addListener(channel, { event_name: "login", callback: logInCallback });
  // addListener({ event_name: "renderScreen", callback: screenReceivedCallback });
  addListener(channel, { event_name: "openPopup", callback: openPopupCallback });
  addListener(channel, { event_name: "closePopup", callback: closePopupCallback });
  addListener(channel, { event_name: "openScreen", callback: openScreenCallback });
  addListener(channel, { event_name: "screen_received", callback: screenReceivedCallback });

}

const addListener = (channel, params) => {
  channel.on(params.event_name, params.callback)
}
