import {
    ASYNC_GET,
    ASYNC_POST,
    PAGINATION,
    REQUEST_WIDGET,
    ROUTE_BACK,
    ROUTE_TO_LOCAL,
    SUBMIT_FORM
} from "../socket/actionName";
import store from "../redux/store";
import { hideFloatCard } from "../redux/floatCard";
import { getUserChannel } from "../socket/userChannel";
import { pushEventToChannel } from "../socket/socketAction";
import { hideModalWindow } from "../redux/modalWindow";

const userId = store.getState().user.id;
const userChannel = getUserChannel();

// Private funcs
const onRouteSideActions = () => {
    store.dispatch(hideFloatCard());
    store.dispatch(hideModalWindow());
}

const routeToLocalFormCallback = (event, navigation, route) => {
    onRouteSideActions();

    const queryString = route && route.params ? route.params : null;

    navigation.push("Index", {
        screenName: event.screen_name,
        query: queryString,
        event: event
    });
}

const routeBackFormCallback = (event, navigation, route) => {
    onRouteSideActions();
    navigation.goBack();
}

const asyncRequestCallback = (event, navigation, route) => {
    pushEventToChannel(userChannel, {
        userId: userId,
        actionName: event.type,
        payload: {
            parent_id: "id",
            callback_url: event.url,
            params: event,
        }
    })
}

const paginationCallback = (event, navigation, route) => {
    pushEventToChannel(userChannel, {
        userId: userId,
        actionName: PAGINATION,
        payload: { parent_id: event.id, callback_url: event.url }
    })
}
const requestWidgetCallback = (event, navigation, route) => {
    const queryString = route.params ? route.params : null;

    pushEventToChannel(userChannel, {
        userId: userId,
        actionName: REQUEST_WIDGET,
        payload: {
            parent_id: event.id,
            callback_url: event.callbackUrl,
            params: queryString?.event,
            method: event.method ?? "POST"
        }
    })
}
const submitFormCallback = (event, navigation, route) => {
    pushEventToChannel(userChannel, {
        userId: userId,
        actionName: SUBMIT_FORM,
        payload: event.form
    })
}
const defaultCallback = (event, navigation, route) => {
    console.log("defaultCallback", event);
}

const map = {
    [ASYNC_GET]: asyncRequestCallback,
    [ASYNC_POST]: asyncRequestCallback,
    [PAGINATION]: paginationCallback,
    [REQUEST_WIDGET]: requestWidgetCallback,
    [SUBMIT_FORM]: submitFormCallback,
    [ROUTE_TO_LOCAL]: routeToLocalFormCallback,
    [ROUTE_BACK]: routeBackFormCallback
};

// PUBLIC
export const eventFactory = (event) => {
    return map[event.type] ?? defaultCallback;
}
