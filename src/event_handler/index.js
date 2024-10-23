import { eventFactory } from './eventFactory';

export const handleEventAction = async (event, navigation, route, options) => {
  const processFn = eventFactory(event);
  return await processFn(event, navigation, route, options);
};

export const onPress = (actions, navigation, route, options) => {
  if (actions?.click) {
    return handleEventAction(actions.click, navigation, route);
  }
  if (actions?.after_click) {
    return handleEventAction(actions.after_click, navigation, route, options);
  }
};

export const onChange = (actions, newValue, navigation, route) => {
  if (actions?.change) {
    let payload = { ...actions.change, value: newValue };
    return handleEventAction(payload, navigation, route);
  }
};

export const onSelectImage = (actions, data, navigation, route) => {
  if (actions?.selectImage) {
    let payload = { ...actions.selectImage, value: data };
    return handleEventAction(payload, navigation, route);
  }
};

export const onSubmit = (actions, newValue, navigation, route) => {
  if (actions?.submit) {
    let payload = { ...actions.submit, value: newValue };
    return handleEventAction(payload, navigation, route);
  }
};

export const onLongPress = (actions, navigation, route) => {
  if (actions?.long_press) {
    return handleEventAction(actions.long_press, navigation, route);
  }
};

export const onSwipedRight = (actions, navigation, route) => {
  if (actions?.swiped_right) {
    return handleEventAction(actions.swiped_right, navigation, route);
  }
};

export const onSwipedTop = (actions, navigation, route) => {
  if (actions?.swiped_top) {
    return handleEventAction(actions.swiped_top, navigation, route);
  }
};

export const onSwipedLeft = (actions, navigation, route) => {
  if (actions?.swiped_left) {
    return handleEventAction(actions.swiped_left, navigation, route);
  }
};

export const onSwipedBottom = (actions, navigation, route) => {
  if (actions?.swiped_bottom) {
    return handleEventAction(actions.swiped_bottom, navigation, route);
  }
};

export const onShare = (actions, result, navigation, route) => {
  if (actions?.share) {
    let payload = { ...actions.share, result: result };
    return handleEventAction(payload, navigation, route);
  }
};

export const onMount = (actions, navigation, route) => {
  if (actions?.mount) {
    return handleEventAction(actions.mount, navigation, route);
  }
};

export const onInit = (actions, navigation, route) => {
  if (actions?.init) {
    return handleEventAction(actions.init, navigation, route);
  }
};
