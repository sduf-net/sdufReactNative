import { eventFactory } from "./eventFactory";

export const handleEventAction = async (event, navigation, route) => {
    const processFn = eventFactory(event);
    return await processFn(event, navigation, route);
}

export const onPress = (actions, navigation, route) => {
    if (actions?.click) {
        handleEventAction(actions.click, navigation, route);
    }
}

export const onChange = (actions, newValue, navigation, route) => {
    if (actions?.change) {
        let payload = { ...actions.change, value: newValue };
        handleEventAction(payload, navigation, route);
    }
}

export const onSubmit = (actions, newValue, navigation, route) => {
    if (actions?.submit) {
        let payload = { ...actions.change, value: newValue };
        handleEventAction(payload, navigation, route);
    }
}

export const onLongPress = (actions, navigation, route) => {
    if (actions?.long_press) {
        handleEventAction(actions.long_press, navigation, route);
    }
}

export const onSwipedRight = (actions, navigation, route) => {
    if (actions?.swiped_right) {
        handleEventAction(actions.swiped_right, navigation, route);
    }
}

export const onSwipedTop = (actions, navigation, route) => {
    if (actions?.swiped_top) {
        handleEventAction(actions.swiped_top, navigation, route);
    }
}

export const onSwipedLeft = (actions, navigation, route) => {
    if (actions?.swiped_left) {
        handleEventAction(actions.swiped_left, navigation, route);
    }
}

export const onSwipedBottom = (actions, navigation, route) => {
    if (actions?.swiped_bottom) {
        handleEventAction(actions.swiped_bottom, navigation, route);
    }
}
