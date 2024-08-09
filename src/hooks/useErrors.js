import { useDispatch } from 'react-redux';
import { addError, removeByIndex, removeError } from '../redux/errors';
import store from '../redux/store';

export default function useErrors() {
  const dispatch = useDispatch();

  const newError = (error) => {
    dispatch(addError(error));

    setTimeout(() => {
      dispatch(removeError());
    }, 2000);
  };

  const removeErrorByIndex = (index) => {
    dispatch(removeByIndex(index));
  };

  return { newError, removeErrorByIndex };
}

export function newError(error) {
  store.dispatch(addError(error));

  setTimeout(() => {
    store.dispatch(removeError());
  }, 2000);
}
