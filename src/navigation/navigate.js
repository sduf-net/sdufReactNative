import React from 'react';
import IndexScreen from '../screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './rootNavigation';
import YouAreOfflineScreen from '../screens/offline';

const Stack = createNativeStackNavigator();

export default function Navigate() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          //NOTE: we need way to make options dynamic
          // options={{ headerShown: false, presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_left' }}
          options={{ headerShown: false, animation: 'none' }}
          name="Index"
          children={IndexScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, animation: 'none' }}
          name="YouAreOfflineScreen"
          children={YouAreOfflineScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
