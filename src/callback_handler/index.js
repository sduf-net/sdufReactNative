import store from '../redux/store';
import { setLastEventID } from '../redux/screens';
import { callbackFactory } from './callbackFactory';

export const handleCallbackAction = (event) => {
  const processFn = callbackFactory(event);

  if (event.event_id) {
    store.dispatch(setLastEventID(event.event_id));
  }

  return processFn(event);
};
