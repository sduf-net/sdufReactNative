import store from '../redux/store';
import { setLastEventID } from '../redux/screens';
import { callbackFactory } from './callbackFactory';
import { IncomingEvent } from './IncomingEventModel';


export const handleCallbackAction = (event) => {
  let incomingEvent = event;
  // Payload will contain your data, including binary if it was sent as {:binary, compressed}
  if (event instanceof ArrayBuffer) {
    incomingEvent = IncomingEvent.fromArrayBuffer(event);
  } else {
    console.warn('Received uncompressed data', event);
  }

  console.debug('handleCallbackAction', incomingEvent);
  const processFn = callbackFactory(incomingEvent);
  if (incomingEvent.event_id) {
    store.dispatch(setLastEventID(incomingEvent.event_id));
  }

  return processFn(incomingEvent);
};
