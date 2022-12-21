import React from 'react'
import MainScreen from '../screens/main'
import IndexScreen from '../screens/index'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Index" children={IndexScreen} />
        </Stack.Navigator>
    </NavigationContainer>
}