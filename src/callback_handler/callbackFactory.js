import {
  INSERT_BEFORE,
  INSERT_AFTER,
  REMOVE,
  CHANGE,
  REPLACE,
  APPEND,
  LOGIN,
  LOGOUT,
  OPEN_POPUP,
  CLOSE_POPUP,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  OPEN_SCREEN,
  SCREEN_RECEIVED,
  SCREEN_SILENT_UPDATE,
  SHOW_FLOAT_CARD,
  UPDATE_MAP_MARKERS,
  NAVIGATE_TO_SCREEN,
  REQUEST_USER_GEO,
  SHOW_ERROR_MESSAGE,
  HIDE_FLOAT_CARD,
  RESET_FORM,
} from '../constants/eventName';
import {
  append,
  insertAfter,
  insertBefore,
  remove,
  setScreen,
  setCurrentScreen,
} from '../redux/screens';
import { hideFloatCard, setFloatCardWidgets, showFloatCard } from '../redux/floatCard';
import { hideModalWindow, setModalWindowWidgets, showModalWindow } from '../redux/modal';
import { hideDrawer, setDrawerWidgets, showDrawer } from '../redux/drawer';
import { logOut, setCurrentUser } from '../redux/users';
import { setMarkers } from '../redux/map';
import store from '../redux/store';
import * as rootNavigation from '../navigation/rootNavigation';
import Geolocation from '@react-native-community/geolocation';
import { DeviceEventEmitter } from 'react-native';
import { newError } from '../hooks/useErrors';
import { handleEventAction } from '../event_handler';
import { ASYNC_POST } from '../constants/actionName';
import { joinToUserChannel } from '../socket/userChannel';
import { resetForm } from '../redux/form';
import { joinToScreenChannel } from '../socket/screenChannel';

export const callbackFactory = (event) => {
  return map[event.action] ?? defaultCallback;
};

// PRIVATE
const insertBeforeCallback = (event) => {
  const data = event.payload;
  store.dispatch(
    insertBefore({ parent_id: data.parent_id, screen_id: event.screen_id, widget: data.widget })
  );
};
const insertAfterCallback = (event) => {
  const data = event.payload;
  store.dispatch(
    insertAfter({ parent_id: data.parent_id, screen_id: event.screen_id, widget: data.widget })
  );
};
const removeCallback = (event) => {
  const data = event.payload;
  store.dispatch(remove({ parent_id: data.parent_id, screen_id: event.screen_id }));
};
const changeCallback = (data) => {
  //update current screen
  console.warn('changeCallback', data);
};
const replaceCallback = (event) => {
  const data = event.payload;
  store.dispatch(
    insertBefore({ parent_id: data.parent_id, screen_id: event.screen_id, widget: data.widget })
  );
  store.dispatch(remove({ parent_id: data.parent_id, screen_id: event.screen_id }));
};
const appendCallback = (event) => {
  const data = event.payload;
  store.dispatch(append({ screen_id: event.screen_id, widget: data.widget }));
};
const scrollToBottomCallback = () => {
  DeviceEventEmitter.emit('scrollToBottom');
};
const logInCallback = (event) => {
  const data = event.payload;
  joinToUserChannel(data.id);
  store.dispatch(setCurrentUser({ id: data.id, token: data.token }));
};
const logOutCallback = (_) => {
  store.dispatch(logOut());
  //todo review
  rootNavigation.navigate('Index', {
    screenName: 'login',
    query: '',
    event: {},
  });
};
const screenReceivedCallback = (event) => {
  const data = event.payload;
  store.dispatch(
    setCurrentScreen({
      id: data.id,
      name: data.name,
      nestedComponents: data.nestedComponents,
      config: data.config,
      insertedAt: new Date().getTime(),
    })
  );
  joinToScreenChannel(data.id);
};
const screenSilentUpdateCallback = (event) => {
  const data = event.payload;
  store.dispatch(
    setScreen({
      id: event.screen_id,
      name: data.name,
      nestedComponents: data.nestedComponents,
      config: data.config,
      insertedAt: new Date().getTime(),
    })
  );
};
const openPopupCallback = (event) => {
  const data = event.payload;
  store.dispatch(showModalWindow());
  store.dispatch(setModalWindowWidgets({ nestedComponents: data.widget }));
};
const closePopupCallback = (_) => {
  store.dispatch(hideModalWindow());
};
const openDrawerCallback = (event) => {
  const data = event.payload;
  store.dispatch(showDrawer());
  store.dispatch(setDrawerWidgets({ nestedComponents: data.widget }));
};
const closeDrawerCallback = (_) => {
  store.dispatch(hideDrawer());
};
const showFloatCardCallback = (event) => {
  const data = event.payload;
  store.dispatch(showFloatCard());
  store.dispatch(setFloatCardWidgets({ nestedComponents: data.widget }));
};
const hideFloatCardCallback = (_) => {
  store.dispatch(hideFloatCard());
};
const openScreenCallback = (event) => {
  const data = event.payload;
  console.warn('openScreenCallback', data);
};
const updateMapMarkersCallback = (event) => {
  const data = event.payload;
  store.dispatch(setMarkers(data.markers));
};
const navigateToScreenCallback = (event) => {
  const data = event.payload;
  rootNavigation.navigate('Index', {
    screenName: data.screen_name,
    query: data.queryString,
    event: data,
  });
};
const showErrorMessageCallback = (event) => {
  const data = event.payload;
  newError(data.error_message);
};
const resetFormCallback = (event) => {
  const data = event.payload;
  store.dispatch(resetForm({ form_id: data.form_id }));
};

const requestCurrentPositionCallback = (event) => {
  const data = event.payload;
  Geolocation.getCurrentPosition(
    (position) => {
      const userLocationData = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      };
      const event = {
        type: ASYNC_POST,
        url: data.url,
        params: userLocationData,
      };
      handleEventAction(event, null, null);
    },
    (error) => alert(error.message),
    { enableHighAccuracy: true, maximumAge: 1000 }
  );
};
const defaultCallback = (event) => {
  console.warn('defaultCallback eventFactory', event);
};

const map = {
  [INSERT_BEFORE]: insertBeforeCallback,
  [INSERT_AFTER]: insertAfterCallback,
  [REMOVE]: removeCallback,
  [CHANGE]: changeCallback,
  [REPLACE]: replaceCallback,
  [APPEND]: appendCallback,
  [LOGIN]: logInCallback,
  [LOGOUT]: logOutCallback,
  [OPEN_POPUP]: openPopupCallback,
  [CLOSE_POPUP]: closePopupCallback,
  [OPEN_DRAWER]: openDrawerCallback,
  [CLOSE_DRAWER]: closeDrawerCallback,
  [OPEN_SCREEN]: openScreenCallback,
  [RESET_FORM]: resetFormCallback,
  [SCREEN_RECEIVED]: screenReceivedCallback,
  [SCREEN_SILENT_UPDATE]: screenSilentUpdateCallback,
  [SHOW_FLOAT_CARD]: showFloatCardCallback,
  [HIDE_FLOAT_CARD]: hideFloatCardCallback,
  [UPDATE_MAP_MARKERS]: updateMapMarkersCallback,
  [NAVIGATE_TO_SCREEN]: navigateToScreenCallback,
  [REQUEST_USER_GEO]: requestCurrentPositionCallback,
  [SHOW_ERROR_MESSAGE]: showErrorMessageCallback,
};
