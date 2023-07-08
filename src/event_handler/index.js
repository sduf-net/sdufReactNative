import { getUserChannel } from "../socket/connection";
import { pushEventToChannel } from "../socket/socketAction";
import store from "../redux/store";

const userId = store.getState().user.id;
const userChannel = getUserChannel();

export const handleEventAction = (event, navigation, route) => {
    switch (event.type) {
        case "routeToLocal":
            const queryString = route && route.params ? route.params : null;

            navigation.push("Index", {
                screenName: event.screen_name,
                query: queryString
            });

            // store.dispatch(resetCurrentScreen());
            
            break;

        case "routeBack":
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

        default:
            console.log("default action");
            break;
    }
}