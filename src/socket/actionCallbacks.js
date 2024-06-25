import { append, insertAfter, insertBefore, remove, setScreen, setCurrentScreen } from "../redux/screens";
import { hideFloatCard, setFloatCardWidgets, showFloatCard } from "../redux/floatCard";
import { hideModalWindow, setModalWindowWidgets, showModalWindow } from "../redux/modalWindow";
import { logOut, setCurrentUser } from "../redux/users";
import { setMarkers } from "../redux/map";
import store from "../redux/store";
import * as  rootNavigation from "../navigation/rootNavigation";
import { joinToUserChannel } from "./userChannel";
import Geolocation from '@react-native-community/geolocation';
import { DeviceEventEmitter } from "react-native";
import { newError } from "../hooks/useErrors";
import { handleEventAction } from "../event_handler";


export const insertBeforeCallback = (data) => {
    store.dispatch(insertBefore({ parent_id: data.parent_id, screen_id: data.screen_id, widget: data.widget }))
};
export const insertAfterCallback = (data) => {
    store.dispatch(insertAfter({ parent_id: data.parent_id, screen_id: data.screen_id, widget: data.widget }))
};
export const removeCallback = (data) => {
    store.dispatch(remove({ parent_id: data.parent_id, screen_id: data.screen_id, }))
};
export const changeCallback = (data) => {
    //update current screen
    console.log("changeCallback", data);
};
export const replaceCallback = (data) => {
    store.dispatch(insertBefore({ parent_id: data.parent_id, screen_id: data.screen_id, widget: data.widget }));
    store.dispatch(remove({ parent_id: data.parent_id, screen_id: data.screen_id }));
};
export const appendCallback = (data) => {
    store.dispatch(append({ screen_id: data.screen_id, widget: data.widget }));
    //review
    DeviceEventEmitter.emit('scrollToBottom');
};
export const scrollToBottomCallback = () => {
    DeviceEventEmitter.emit('scrollToBottom');
};
export const logInCallback = (data) => {
    joinToUserChannel(data.id);
    store.dispatch(setCurrentUser({ id: data.id, token: data.token }));
};
export const logOutCallback = (data) => {
    store.dispatch(logOut());
    //todo review
    rootNavigation.navigate('Index', {
        screenName: 'login',
        query: '',
        event: {}
    });
};
export const screenReceivedCallback = (data) => {
    store.dispatch(setCurrentScreen({
        id: data.id,
        name: data.name,
        nestedComponents: data.nestedComponents
    }))
};
export const screenSilentUpdateCallback = (data) => {
    store.dispatch(setScreen({
        id: data.id,
        name: data.name,
        nestedComponents: data.nestedComponents
    }))
};
export const openPopupCallback = (data) => {
    store.dispatch(showModalWindow());
    store.dispatch(setModalWindowWidgets({ nestedComponents: data.widget }))
};
export const closePopupCallback = (data) => {
    store.dispatch(hideModalWindow());
};
export const showFloatCardCallback = (data) => {
    store.dispatch(showFloatCard());
    store.dispatch(setFloatCardWidgets({ nestedComponents: data.widget }))
};
export const hideFloatCardCallback = (data) => {
    store.dispatch(hideFloatCard());
};
export const openScreenCallback = (data) => {
    console.log("openScreenCallback", data);
};
export const updateMapMarkersCallback = (data) => {
    store.dispatch(setMarkers(data.markers));
};

export const navigateToScreenCallback = (data) => {
    rootNavigation.navigate('Index', {
        screenName: data.screen_name,
        query: data.queryString,
        event: data
    });
};

export const showErrorMessageCallback = (data) => {
    newError(data.error_message);
};

export const requestCurrentPositionCallback = (data) => {
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
            }
            handleEventAction(event, null, null)
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
};
