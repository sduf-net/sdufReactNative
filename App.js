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
import { restoreUserToState } from './src/auth/auth';
import { initSocketConnection } from './src/socket/user_conn';
import { joinToUserChannel } from './src/socket/user_channel';


export default function App() {
  const userId = store.getState().user.id;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = notificationListener();

    loadDataBeforeStart().then(() => setLoading(false));

    return unsubscribe;
  }, []);

  useEffect(() => {
    connectToUserChannel();
  }, [userId]);

  const loadDataBeforeStart = async () => {
    await restoreUserToState();
    await getFCMToken();
    connectToUserChannel();
  }

  const connectToUserChannel = () => {
    initSocketConnection();
    joinToUserChannel(userId);
  }

  if(loading) return null;

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
