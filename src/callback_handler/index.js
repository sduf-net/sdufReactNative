import { callbackFactory } from './callbackFactory';

export const handleCallbackAction = (event) => {
  const processFn = callbackFactory(event);
  return processFn(event);
};