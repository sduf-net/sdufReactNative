import { getUserChannel } from "../socket/connection";
import { pushEventToChannel } from "../socket/socketAction";
import store from "../redux/store";
import { hideFloatCard } from "../redux/floatCard";
import { joinToUserChannel } from "../socket/user_channel";

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
            console.log("push SOCkEKT EVENT asyncPOST");
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: "async_post",
                payload: { parent_id: "id", callback_url: event.url, params: event.params ?? {} }
            })
            break;
        case "asyncGet":
            console.log("push SOCkEKT EVENT asyncGet");
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: "async_get",
                payload: { parent_id: "id", callback_url: event.url, params: event.params ?? {} }
            })
            break;
        case "getPagination":
            console.log("push SOCkEKT EVENT getPagination");
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: "pagination",
                payload: { parent_id: event.id, callback_url: event.url }
            })
        case "submitForm":
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: "submit_form",
                payload: event.form
            })

            break;
        case "request_widget":
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: "request_widget",
                payload: { parent_id: event.id, callback_url: event.callbackUrl }
            })

            break;


        default:
            console.log("default action");
            break;
    }
}