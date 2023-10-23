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
import { useEffect, useState } from 'react';
import { getFCMToken, notificationListener } from './src/push_notfication';
import { restoreUserToState } from './src/socket/auth';
import { initSocketConnection } from './src/socket/user_conn';


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = notificationListener();

    loadDataBeforeStart().then(() => setLoading(false));

    return unsubscribe;
  }, []);

  const loadDataBeforeStart = async () => {
    console.log("loadDataBeforeStart")
    await restoreUserToState();
    await getFCMToken();
    initSocketConnection();
  }

  if(loading) return null;

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
