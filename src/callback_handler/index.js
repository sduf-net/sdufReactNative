import store from '../redux/store';
import { setLastEventID } from '../redux/screens';
import { callbackFactory } from './callbackFactory';
import { IncomingEvent } from './IncomingEventModel';

export const handleCallbackAction = (event) => {
  const incomingEvent = IncomingEvent.fromJson(event);
  incomingEvent.decompress();

  console.debug('handleCallbackAction', incomingEvent);

  const processFn = callbackFactory(incomingEvent);

  if (incomingEvent.event_id) {
    store.dispatch(setLastEventID(incomingEvent.event_id));
  }

  return processFn(incomingEvent);
};
