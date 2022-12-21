export const handleEventAction = (event, navigation) => {

    switch (event.type) {
        case "routeToLocal":
            navigation.navigate(event.screen_name, {
                query: event?.params
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