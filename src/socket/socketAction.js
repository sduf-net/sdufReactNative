import { getDBConnection } from "../db/db";
import { joinToScreenChannel } from "./connection";
import uuid from 'react-native-uuid';
import { saveScreen } from "../db/screen/screen_write_model";
import { setCurrentScreen } from "../redux/screens";

export const pushEvent = (channel, params) => {
  channel.push(params.event_name, {
    type: params.type,
    user_id: params.userId,
    screen_name: params.screenName,
    query: params.query
  });
}

export const getScreenThroughSocket = (screenName, route) => {
  screenChannel = joinToScreenChannel(screenName);
  listenScreenChannelEvents(screenChannel);

  const opts = {
    event_name: "screen:event",
    type: "getScreenByName",
    query: route && route.params ? route.params : null,
    screenName: screenName,
    userId: `anonimus:${uuid.v4()}`
  };

  pushEvent(screenChannel, opts);
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
  };
  let insertAfterCallback = (data) => {
  };
  let removeCallback = (data) => {
  };
  let changeCallback = (data) => {
  };
  let replaceCallback = (data) => {
  };
  let appendCallback = (data) => {
  };
  let logInCallback = (data) => {
  };
  let screenReceivedCallback = (data) => {
    getDBConnection().then(db => saveScreen(db, data));
  };
  let openPopupCallback = (data) => {
  };
  let closePopupCallback = (data) => {
  };
  let openScreenCallback = (data) => {
  };

  addListener(channel, { event_name: "insertBefore", callback: insertBeforeCallback });
  addListener(channel, { event_name: "insertAfter", callback: insertAfterCallback });
  addListener(channel, { event_name: "remove", callback: removeCallback });
  addListener(channel, { event_name: "change", callback: changeCallback });
  // addListener({ event_name: "update", callback: changeCallback });
  addListener(channel, { event_name: "replace", callback: replaceCallback });
  addListener(channel, { event_name: "append", callback: appendCallback });
  addListener(channel, { event_name: "login", callback: logInCallback });
  addListener(channel, { event_name: "screenReceived", callback: screenReceivedCallback });
  // addListener({ event_name: "renderScreen", callback: screenReceivedCallback });
  addListener(channel, { event_name: "openPopup", callback: openPopupCallback });
  addListener(channel, { event_name: "closePopup", callback: closePopupCallback });
  addListener(channel, { event_name: "openScreen", callback: openScreenCallback });
}

const addListener = (channel, params) => {
  channel.on(params.event_name, params.callback)
}
