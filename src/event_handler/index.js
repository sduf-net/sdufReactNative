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
            // store.dispatch("pushScreenEvent", actions[name]);
            console.log("push SOCkEKT EVENT")
            break;

        default:
            console.log("default action");
            break;
    }
}