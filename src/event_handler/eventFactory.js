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
  CLOSE_DRAWER,
  GET_SCREEN_BY_NAME,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_FLOAT_CARD,
  CLOSE_FLOAT_CARD,
  SET_STATE,
  GLOBAL_SYNC_REQUEST,
} from '../constants/actionName';
import store from '../redux/store';
import { hideFloatCard, setFloatCardWidgets, showFloatCard } from '../redux/floatCard';
import { getUserChannel } from '../socket/userChannel';
import { pushEventToChannel } from '../socket/socketAction';
import { hideModalWindow, setModalWindowWidgets, showModalWindow } from '../redux/modal';
import { hideDrawer, setDrawerWidgets, showDrawer } from '../redux/drawer';

const userId = store.getState().user.id;

// Private funcs
const onRouteSideActions = () => {
  store.dispatch(hideFloatCard());
  store.dispatch(hideModalWindow());
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

const routeBackFormCallback = (_event, navigation, _route) => {
  onRouteSideActions();
  navigation.goBack();
};

const asyncRequestCallback = (event, _navigation, _route) => {
  pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: event.type,
    payload: {
      callback_url: event.url,
      params: event,
    },
  });
};

const syncRequestCallback = async (event, _navigation, _route) => {
  return await pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: event.type,
    payload: {
      callback_url: event.url,
      params: event,
    },
  });
};

const paginationCallback = (event, _navigation, _route) => {
  pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: PAGINATION,
    payload: { parent_id: event.id, callback_url: event.url },
  });
};

const requestWidgetCallback = (event, _navigation, route) => {
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

const submitFormCallback = async (event, _navigation, _route) => {
  return await pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: SUBMIT_FORM,
    payload: event.form,
  });
};

const globalSyncRequest = async (event, _navigation, _route) => {
  return pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: GLOBAL_SYNC_REQUEST,
    payload: event,
  });
};

const openDrawerCallback = async (event, _navigation, _route) => {
  store.dispatch(setDrawerWidgets({ nestedComponents: event.nestedComponents }));
  store.dispatch(showDrawer());
};

const closeDrawerCallback = async (_event, _navigation, _route) => {
  store.dispatch(hideDrawer());
};

const openModalCallback = async (event, _navigation, _route) => {
  store.dispatch(setModalWindowWidgets({ nestedComponents: event.nestedComponents }));
  store.dispatch(showModalWindow());
};

const closeModalCallback = async (_event, _navigation, _route) => {
  store.dispatch(hideModalWindow());
};

const openFloatCardCallback = async (event, _navigation, _route) => {
  store.dispatch(setFloatCardWidgets({ nestedComponents: event.nestedComponents }));
  store.dispatch(showFloatCard());
};

const closeFloatCardCallback = async (_event, _navigation, _route) => {
  store.dispatch(hideFloatCard());
};

const setStateCallback = async (event, _navigation, _route, state) => {
  if (event?.loading) {
    state.setLoading(event.loading);
  }
  if (event?.disabled) {
    state.setDisabled(event.disabled);
  }
  if (event?.reset_timer) {
    setTimeout(() => {
      state.setLoading(!event.loading);
      state.setDisabled(!event.disabled);
    }, event.reset_timer);
  }
};

const requestScreenCallback = (event, _navigation, _route) => {
  pushEventToChannel(getUserChannel(), {
    userId: userId,
    actionName: GET_SCREEN_BY_NAME,
    payload: {
      query: event.queryString,
      screen_name: event.screenName,
    },
  });
};

const defaultCallback = (event, _navigation, _route) => {
  console.warn('defaultCallback', event);
};

const map = {
  [ASYNC_GET]: asyncRequestCallback,
  [ASYNC_POST]: asyncRequestCallback,
  [SYNC_GET]: syncRequestCallback,
  [SYNC_POST]: syncRequestCallback,
  [PAGINATION]: paginationCallback,
  [REQUEST_WIDGET]: requestWidgetCallback,
  [GET_SCREEN_BY_NAME]: requestScreenCallback,
  [SUBMIT_FORM]: submitFormCallback,
  [GLOBAL_SYNC_REQUEST]: globalSyncRequest,

  //////////////////
  // local actions
  //////////////////
  [OPEN_DRAWER]: openDrawerCallback,
  [CLOSE_DRAWER]: closeDrawerCallback,

  [OPEN_MODAL]: openModalCallback,
  [CLOSE_MODAL]: closeModalCallback,

  [OPEN_FLOAT_CARD]: openFloatCardCallback,
  [CLOSE_FLOAT_CARD]: closeFloatCardCallback,

  [NAVIGATE_TO]: routeToLocalFormCallback,
  [ROUTE_TO_LOCAL]: routeToLocalFormCallback,
  [ROUTE_BACK]: routeBackFormCallback,

  [SET_STATE]: setStateCallback,
};

// PUBLIC
export const eventFactory = (event) => {
  return map[event.type] ?? defaultCallback;
};
