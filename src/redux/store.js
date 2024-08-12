import { configureStore } from '@reduxjs/toolkit';
import screensReducer from './screens';
import currentUserReducer from './users';
import currentFormReducer from './form';
import floatCardReducer from './floatCard';
import currentMapReducer from './map';
import modalWindowReducer from './modalWindow';
import ErrorsReducer from './errors';
import drawerReducer from './drawer';

export default configureStore({
  reducer: {
    screens: screensReducer,
    floatCard: floatCardReducer,
    user: currentUserReducer,
    form: currentFormReducer,
    map: currentMapReducer,
    modalWindow: modalWindowReducer,
    errors: ErrorsReducer,
    drawer: drawerReducer
  },
});
