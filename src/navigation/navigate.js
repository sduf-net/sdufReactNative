import React from 'react'
import IndexScreen from '../screens/index'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './rootNavigation';

const Stack = createNativeStackNavigator();

export default function Navigate() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Index" children={IndexScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}