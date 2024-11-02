/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import MainStack from './src/navigation/navigate';
import NetInfo from '@react-native-community/netinfo';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import React, { useEffect, useState } from 'react';
import { getFCMToken, notificationListener } from './src/push_notfication';
import { closeConnection, initSocketConnection } from './src/socket/userConn';
import { joinToUserChannel } from './src/socket/userChannel';
import ErrorComponent from './src/components/ui/custom/errorMessage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, AppState, View } from 'react-native';
import { joinToAllScreenChannels } from './src/socket/screenChannel';
import { Persistor } from './src/redux/persistor';
import { ThemeProvider } from 'react-native-magnus';

export default function App() {
  const [loading, setLoading] = useState(true);

  const reconnectAsync = async () => {
    loadDataBeforeStart().then(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribe = notificationListener();
    reconnectAsync();
    return unsubscribe;
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const conn = state.isConnected;
      if (!conn) {
        reconnect();
      }
    });

    return () => removeNetInfoSubscription();
  });

  const loadDataBeforeStart = async () => {
    await Persistor.restoreStore();
    await getFCMToken();
    await reconnect();
  };

  const reconnect = async () => {
    await closeConnection().catch(() => console.log("initSocketConnection error"));
    await initSocketConnection().catch(() => console.log("initSocketConnection error"));
    await joinToUserChannel(store.getState().user.id).catch(() => console.log("joinToUserChannel error"));
    await joinToAllScreenChannels(store.getState()).catch(() => console.log("joinToAllScreenChannels error"));
  };

  //NOTE: we need way to make it dynamic
  if (loading) return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" /></View>;

  return (
    <ThemeProvider>
      <Provider store={store}>
        <ErrorComponent>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MainStack />
          </GestureHandlerRootView>
        </ErrorComponent>
      </Provider>
    </ThemeProvider>
  );
}
