import { useDispatch } from 'react-redux';
import { addError, removeByIndex, removeError } from '../redux/errors';

export default function useErrors() {
    const dispatch = useDispatch();

    const newError = (error) => {

        dispatch(addError(error));

        setTimeout(() => {
            dispatch(removeError());
        }, 2000);
    }

    const removeErrorByIndex = (index) => {
        dispatch(removeByIndex(index));
    }

    return { newError, removeErrorByIndex };
}