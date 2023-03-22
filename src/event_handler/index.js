import { getUserChannel } from "../socket/connection";
import { pushEventToChannel } from "../socket/socketAction";
import store from "../redux/store";

const userId = store.getState().user.id;
export const handleEventAction = (event, navigation, route) => {
    switch (event.type) {
        case "routeToLocal":
            const queryString = route && route.params ? route.params : null;

            navigation.push("Index", {
                screenName: event.screen_name,
                query: queryString
            });
            break;

        case "routeBack":
            navigation.back();
            break;

        case "routeToScreenFromApi":
        case "asyncPost":
        case "asyncGet":
            console.log("push SOCkEKT EVENT", event);
            const userChannel = getUserChannel();
            pushEventToChannel(userChannel, {
                userId: userId,
                actionName: "async_post",
                payload: { parent_id: "id", callback_url: event.url, params: event.params ?? {} }
            })
            break;

        default:
            console.log("default action");
            break;
    }
}