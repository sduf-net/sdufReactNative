/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import MainStack from './src/navigation/navigate'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { useEffect } from 'react';
import { getFCMToken, notificationListener } from './src/push_notfication';
import PushNotification from 'react-native-push-notification';

export default function App() {
  useEffect(() => {
    getFCMToken();
    const unsubscribe = notificationListener();
    return unsubscribe;
  });

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
