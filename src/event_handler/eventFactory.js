import {
  ASYNC_GET,
  ASYNC_POST,
  SYNC_GET,
  SYNC_POST,
  PAGINATION,
  REQUEST_WIDGET,
  ROUTE_BACK,
  ROUTE_TO_LOCAL,
  NAVIGATE_TO,
  SUBMIT_FORM,
  OPEN_DRAWER,
  CLOSE_DRAWER
} from '../socket/actionName';
import store from '../redux/store';
import { hideFloatCard } from '../redux/floatCard';
import { getUserChannel } from '../socket/userChannel';
import { pushEventToChannel } from '../socket/socketAction';
import { hideModalWindow } from '../redux/modalWindow';
import { hideDrawer, resetDrawerWidgets, showDrawer } from '../redux/drawer';

const userId = store.getState().user.id;

// Private funcs
const onRouteSideActions = () => {
  store.dispatch(hideFloatCard());
  store.dispatch(hideModalWindow());
  store.dispatch(hideDrawer());
};

const routeToLocalFormCallback = (event, navigation, route) => {
  onRouteSideActions();

  const queryString = route && route.params ? route.params : null;

  navigation.push('Index', {
    screenName: event.screen_name,
    query: queryString,
    event: event,
  });
};

const routeBackFormCallback = (event, navigation, route) => {
  onRouteSideActions();
  navigation.goBack();
};

const asyncRequestCallback = (event, navigation, route) => {
  pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: event.type,
    payload: {
      callback_url: event.url,
      params: event,
    },
  });
};

const syncRequestCallback = async (event, navigation, route) => {
  return await pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: event.type,
    payload: {
      callback_url: event.url,
      params: event,
    },
  });
};

const paginationCallback = (event, navigation, route) => {
  pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: PAGINATION,
    payload: { parent_id: event.id, callback_url: event.url },
  });
};
const requestWidgetCallback = (event, navigation, route) => {
  const queryString = route.params ? route.params : null;

  pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: REQUEST_WIDGET,
    payload: {
      parent_id: event.id,
      callback_url: event.url,
      params: queryString?.event,
      method: event.method ?? 'POST',
    },
  });
};
const submitFormCallback = async (event, navigation, route) => {
  return await pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: SUBMIT_FORM,
    payload: event.form,
  });
};
const openDrawerCallback = async (event, navigation, route) => {
  store.dispatch(showDrawer());
  store.dispatch(resetDrawerWidgets([]));
};
const closeDrawerCallback = async (event, navigation, route) => {
  store.dispatch(hideDrawer());
};
const defaultCallback = (event, navigation, route) => {
  console.log('defaultCallback', event);
};

const map = {
  [ASYNC_GET]: asyncRequestCallback,
  [ASYNC_POST]: asyncRequestCallback,
  [SYNC_GET]: syncRequestCallback,
  [SYNC_POST]: syncRequestCallback,
  [PAGINATION]: paginationCallback,
  [REQUEST_WIDGET]: requestWidgetCallback,
  [SUBMIT_FORM]: submitFormCallback,
  [NAVIGATE_TO]: routeToLocalFormCallback,
  [ROUTE_TO_LOCAL]: routeToLocalFormCallback,
  [ROUTE_BACK]: routeBackFormCallback,
  [OPEN_DRAWER]: openDrawerCallback,
  [CLOSE_DRAWER]: closeDrawerCallback,
};

// PUBLIC
export const eventFactory = (event) => {
  return map[event.type] ?? defaultCallback;
};
