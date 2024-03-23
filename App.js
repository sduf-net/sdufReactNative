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
import React, { useEffect, useState } from 'react';
import { getFCMToken, notificationListener } from './src/push_notfication';
import { generateOrRestoreUserToState } from './src/auth/auth';
import { initSocketConnection } from './src/socket/userConn';
import { joinToUserChannel } from './src/socket/userChannel';
import ErrorComponent from './src/components/widgets/errorMessage';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppState } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = notificationListener();

    loadDataBeforeStart().then(() => {
      setUserId(store.getState().user.id);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    connectToUserChannel();
  }, [userId]);


  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // connectToUserChannel();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const loadDataBeforeStart = async () => {
    await generateOrRestoreUserToState();
    await getFCMToken();
  }

  const connectToUserChannel = () => {
    if (!userId) return;
    initSocketConnection();
    joinToUserChannel(userId);
  }

  if (loading) return null;

  return (
    <Provider store={store}>
      <ErrorComponent>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainStack />
        </GestureHandlerRootView>
      </ErrorComponent>
    </Provider>
  );
}
