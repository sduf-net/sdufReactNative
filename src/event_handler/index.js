import { eventFactory } from "./eventFactory";

export const handleEventAction = (event, navigation, route) => {
    const processFn = eventFactory(event);
    processFn(event, navigation, route);
}

export const onPress = (actions, navigation, route) => {
    if (actions?.click) {
        handleEventAction(actions.click, navigation, route);
    }
}

export const onLongPress = (actions, navigation, route) => {
    if (actions?.long_press) {
        handleEventAction(actions.long_press, navigation, route);
    }
}