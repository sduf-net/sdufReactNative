/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import MainStack from './src/navigation/navigate';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import React, {useEffect, useState} from 'react';
import {getFCMToken, notificationListener} from './src/push_notfication';
import {generateOrRestoreUserToState} from './src/auth/auth';
import {closeConnection, initSocketConnection} from './src/socket/userConn';
import {joinToUserChannel} from './src/socket/userChannel';
import ErrorComponent from './src/components/widgets/errorMessage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppState, Text} from 'react-native';
import {joinToAllScreenChannels} from './src/socket/screenChannel';
import {SOCKET_URL, APP_ENV, URL, SOCKET_PROJECT_TOKEN} from '@env';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = notificationListener();

    loadDataBeforeStart().then(() => {
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const reconnectAsync = async () => {
      await reconnect();
    };

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        reconnectAsync();
      } else if (nextAppState === 'background') {
        closeConnection();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const loadDataBeforeStart = async () => {
    await generateOrRestoreUserToState();
    await getFCMToken();
    await reconnect();
  };

  const reconnect = async () => {
    await initSocketConnection();
    await joinToUserChannel(store.getState().user.id);
    await joinToAllScreenChannels(store.getState());
  };

  if (loading) return null;

  return (
    <Provider store={store}>
      <Text>SOCKET_URL = {SOCKET_URL}</Text>
      <Text>URL = {URL}</Text>
      <Text>SOCKET_PROJECT_TOKEN = {SOCKET_PROJECT_TOKEN}</Text>
      <Text>APP_ENV = {APP_ENV}</Text>
      <ErrorComponent>
        <GestureHandlerRootView style={{flex: 1}}>
          <MainStack />
        </GestureHandlerRootView>
      </ErrorComponent>
    </Provider>
  );
}
