import AsyncStorage from '@react-native-async-storage/async-storage';
import { isPermanent } from '../utils/cache';
import { setCurrentUser } from './users';
import { setScreen } from './screens';
import { isEmpty } from '../components/helpers/utils';
import store from './store';

export const Persistor = {
  persist: async function (key, value) {
    const stringify = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringify);
  },
  fetch: async function (key) {
    return await AsyncStorage.getItem(key);
  },
  remove: async function (key) {
    await AsyncStorage.removeItem(key);
  },
  restoreUser: async function () {
    const user = await AsyncStorage.getItem(this.USER);
    if (user) {
      store.dispatch(setCurrentUser(JSON.parse(user)));
    }
  },
  restoreScreens: async function () {
    const screens = await AsyncStorage.getItem(this.SCREENS);
    const screensObj = JSON.parse(screens);

    if (!isEmpty(screensObj)) {
      Object.keys(screensObj).forEach((id) => {
        if (isPermanent(screensObj[id])) {
          store.dispatch(setScreen(screensObj[id]));
        }
      });
    }
  },
  restoreStore: async function () {
    await this.restoreUser();
    await this.restoreScreens();
  },
  USER: 'user',
  SCREENS: 'screens',
};
