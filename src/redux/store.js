import { configureStore } from '@reduxjs/toolkit';
import screensReducer from './screens';
import currentUserReducer from './users';
import currentFormReducer from './form';
import floatCardReducer from './floatCard';
import currentMapReducer from './map';
import modalWindowReducer from './modalWindow';
import ErrorsReducer from './errors';
import drawerReducer from './drawer';
import { Persistor } from './persistor';
import { isEmpty } from '../components/helpers/utils';

const store = configureStore({
  reducer: {
    screens: screensReducer,
    floatCard: floatCardReducer,
    user: currentUserReducer,
    form: currentFormReducer,
    map: currentMapReducer,
    modalWindow: modalWindowReducer,
    errors: ErrorsReducer,
    drawer: drawerReducer,
  }
});


store.subscribe(() => {
  Persistor.persist(Persistor.USER, store.getState().user);

  if (isEmpty(store.getState().screens.screens)) return;
  Persistor.persist(Persistor.SCREENS, store.getState().screens.screens);
});

export default store;