import { pushEventToChannel } from "../socket/socketAction";
import { hideFloatCard } from "../redux/floatCard";
import { joinToUserChannel } from "../socket/userChannel";
import store from "../redux/store";
import {
    ASYNC_GET,
    ASYNC_POST,
    PAGINATION,
    REQUEST_WIDGET,
    SUBMIT_FORM
} from "../socket/actionName";

const userId = store.getState().user.id;
const userChannel = joinToUserChannel(userId);

export const onRouteSideActions = () => {
    store.dispatch(hideFloatCard());
}

export const handleEventAction = (event, navigation, route) => {
    switch (event.type) {
        case "routeToLocal":
            onRouteSideActions();

            const queryString = route && route.params ? route.params : null;

            navigation.push("Index", {
                screenName: event.screen_name,
                query: queryString
            });
            break;

        case "routeBack":
            onRouteSideActions();

            navigation.goBack();
            break;

        case "routeToScreenFromApi":
        case "asyncPost":
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: ASYNC_POST,
                payload: { parent_id: "id", callback_url: event.url, params: event.params ?? {} }
            })
            break;
        case "asyncGet":
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: ASYNC_GET,
                payload: { parent_id: "id", callback_url: event.url, params: event.params ?? {} }
            })
            break;
        case "getPagination":
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: PAGINATION,
                payload: { parent_id: event.id, callback_url: event.url }
            })
        case "submitForm":
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: SUBMIT_FORM,
                payload: event.form
            })

            break;
        case "request_widget":
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: REQUEST_WIDGET,
                payload: { parent_id: event.id, callback_url: event.callbackUrl }
            })

            break;


        default:
            console.log("default action");
            break;
    }
}