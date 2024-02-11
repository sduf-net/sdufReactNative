import { eventFactory } from "./eventFactory";

export const handleEventAction = (event, navigation, route) => {
    const processFn = eventFactory(event);
    processFn(event, navigation, route);
}