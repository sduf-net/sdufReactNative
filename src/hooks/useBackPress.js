import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

const useBackPress = (onBackPress, debounceTime = 500) => {
  const lastPressTime = useRef(new Date().getTime());

  useEffect(() => {
    const handleBackPress = () => {
      const currentTime = new Date().getTime();
      if (currentTime - lastPressTime.current > debounceTime) {
        lastPressTime.current = currentTime;
        if (onBackPress) {
          onBackPress();
        } else {
          BackHandler.exitApp();
        }
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [onBackPress, debounceTime]);
};

export default useBackPress;
