import store from "../redux/store";
import { getUserChannel } from "../socket/connection";
import { getScreenThroughSocket } from "../socket/socketAction";

const state = store.getState();

export const handleEventAction = (event, navigation, route) => {
    switch (event.type) {
        case "routeToLocal":
            const userChannel = getUserChannel();
            const queryString = route && route.params ? route.params : null;
            const actionName = "action_performed";

            getScreenThroughSocket(
                userChannel,
                actionName,
                { userId: state.user.id, queryString: queryString, screenName: event.screen_name });

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
            // store.dispatch("pushScreenEvent", actions[name]);
            console.log("push SOCkEKT EVENT")
            break;

        default:
            console.log("default action");
            break;
    }
}