import store from '../redux/store';
import { setLastEventID } from '../redux/screens';
import { callbackFactory } from './callbackFactory';
import { IncomingEvent } from './IncomingEventModel';
import { decompress } from '../utils/compressor';


export const handleCallbackAction = (event) => {
  let data = event;
  // Payload will contain your data, including binary if it was sent as {:binary, compressed}
  if (event instanceof ArrayBuffer) {
    data = decompress(event);
  } else {
    console.warn('Received uncompressed data', event);
  }

  const incomingEvent = IncomingEvent.fromJson(data);
  incomingEvent.decompress();

  console.debug('handleCallbackAction', incomingEvent);

  const processFn = callbackFactory(incomingEvent);

  if (incomingEvent.event_id) {
    store.dispatch(setLastEventID(incomingEvent.event_id));
  }

  return processFn(incomingEvent);
};
