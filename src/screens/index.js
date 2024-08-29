import { Dimensions, StyleSheet, View, BackHandler, DeviceEventEmitter } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { pushEventToChannel } from '../socket/socketAction';
import WidgetList from '../components/widgetList';
import CustomDrawer from '../components/layouts/drawer';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FloatingCard from '../components/layouts/floatingCard';
import CustomModal from '../components/layouts/modalWindow';
import { useNavigation, useFocusEffect, useRoute, useIsFocused } from '@react-navigation/native';
import { getUserChannel } from '../socket/userChannel';
import { GET_SCREEN_BY_NAME } from '../socket/actionName';
import { selectCurrentScreenByName, setCurrentScreenId } from '../redux/screens';
import { joinToScreenChannel } from '../socket/screenChannel';

const INDEX_SCREEN = 'index';

export default function IndexScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const userId = useSelector((state) => state.user.id, shallowEqual);
  const screensState = useSelector((state) => state.screens, shallowEqual);

  const [loading, setLoading] = useState(true);
  const [forceLoading, setForceLoading] = useState(false);

  const lastPressTime = useRef(new Date().getTime());
  const debounceTime = 500; // milliseconds

  const handleBackPress = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastPressTime.current > debounceTime) {
      navigation.goBack();
    }
    return true;
  };

  const onRefresh = useCallback(() => {
    DeviceEventEmitter.emit('onRefresh', true);
    setLoading(true);
    setForceLoading(true);
  }, []);

  useEffect(() => {
    if (!loading) return;

    getScreen(forceLoading);
  }, [loading, forceLoading]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, []);

  // Використовуємо useFocusEffect для додавання слухача при фокусуванні на екрані
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('state', (event) => {
        setLoading(true);
      });

      return unsubscribe;
    }, [navigation])
  );

  const getScreen = useCallback((isReload) => {
    const queryString = route?.params || null;
    const screenName = route?.params?.screenName || INDEX_SCREEN;

    const screen = selectCurrentScreenByName(screensState, screenName);
    if (screen.length && !isReload) {
      dispatch(setCurrentScreenId(screen[0].id));
    } else {
      pushEventToChannel(getUserChannel(), {
        userId: userId,
        actionName: GET_SCREEN_BY_NAME,
        payload: {
          query: queryString,
          screen_name: screenName,
        },
      });
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
      <CustomDrawer>
        <FixedTop />
        <WidgetList onRefresh={onRefresh} />
        <FixedBottom onLayout={onFooterLayout} />
        <FloatingCard />
        <CustomModal />
      </CustomDrawer>
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
