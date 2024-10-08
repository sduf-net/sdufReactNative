import { Dimensions, StyleSheet, View, BackHandler, DeviceEventEmitter } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import WidgetList from '../components/widgetList';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import FloatingCard from '../components/layouts/floatingCard';
import CustomModal from '../components/layouts/modalWindow';
import FabWidget from '../components/ui/mangus/fab';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect, useRoute, useIsFocused } from '@react-navigation/native';
import { ASYNC_POST, GET_SCREEN_BY_NAME } from '../socket/actionName';
import { selectCurrentScreenByName, setCurrentScreenId } from '../redux/screens';
import { joinToScreenChannel } from '../socket/screenChannel';
import useBackPress from '../hooks/useBackPress';
import { isLoadFromCache } from '../utils/cache';
import { onInit, onMount } from '../event_handler';

const INDEX_SCREEN = 'index';

export default function IndexScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const screensState = useSelector((state) => state.screens, shallowEqual);

  const [loading, setLoading] = useState(true);
  const [forceLoading, setForceLoading] = useState(false);

  // Use the custom back press hook with a custom callback
  useBackPress(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      BackHandler.exitApp();
    }
  });

  useEffect(() => {
    if (!loading) return;

    getScreen(forceLoading);
  }, [loading, forceLoading]);

  // Використовуємо useFocusEffect для додавання слухача при фокусуванні на екрані
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('state', (event) => {
        setLoading(true);
      });

      return unsubscribe;
    }, [navigation])
  );

  const onRefresh = useCallback(() => {
    DeviceEventEmitter.emit('onRefresh', true);
    setLoading(true);
    setForceLoading(true);
  }, []);

  const getScreen = useCallback((isReload) => {
    const queryString = route?.params || null;
    const screenName = route?.params?.screenName || INDEX_SCREEN;

    const screen = selectCurrentScreenByName(screensState, screenName);
    if (screen && !isReload && isLoadFromCache(screen)) {
      dispatch(setCurrentScreenId(screen.id));
      // triger callback if screen was loaded from state
      if (screen?.config?.on_mount_url) {
        const event = {
          type: ASYNC_POST,
          url: screen.config.on_mount_url,
          action: 'on_load',
          screen_name: screenName,
          query_string: queryString,
        };
        onMount({ mount: event }, navigation, route);
      }
    } else {
      const event = {
        type: GET_SCREEN_BY_NAME,
        queryString,
        screenName,
      };
      onInit({ init: event }, navigation, route);
      tryConnectToScreenChannel(screenName);
    }

    setTimeout(() => {
      setLoading(false);
      setForceLoading(false);
    }, 2000);
  }, []);

  const tryConnectToScreenChannel = (screenName) => {
    joinToScreenChannel(screenName);
  };

  // Fire event after footer is mounted
  // to adjust screen height and prevent overlapping other components
  const onFooterLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    DeviceEventEmitter.emit('footerHeight', height);
  };

  if (!isFocused) return;

  return (
    <View style={[styles.container]}>
      <FixedTop />
      <WidgetList onRefresh={onRefresh} />
      <FixedBottom onLayout={onFooterLayout} />
      <FabWidget />
      <FloatingCard />
      <CustomModal />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },
});
