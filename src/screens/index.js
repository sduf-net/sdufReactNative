import { View } from 'react-native';
import React, { useCallback } from 'react';
import { getScreenThroughSocket } from '../socket/socketAction';
import WidgetList from '../components/widgetList';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import { shallowEqual, useSelector } from 'react-redux';
import FloatingCard from '../components/layouts/floatingCard';
import useUserChannel from '../hooks/useUserChannel';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getAppConfigByKey } from '../api/config';
import { INDEX_SCREEN, LOGIN_SCREEN } from '../utils/constants';

export default function IndexScreen({ route }) {
    const user = useSelector(state => state.user, shallowEqual);
    const loginConfig = getAppConfigByKey("login");

    const navigation = useNavigation();
    const userId = useSelector(state => state.user.id, shallowEqual);
    const { userChannel } = useUserChannel(userId);

    // Використовуємо useFocusEffect для додавання слухача при фокусуванні на екрані
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('state', (event) => {
                getScreen();
            });

            return unsubscribe;
        }, [navigation])
    );

    const getScreen = useCallback(() => {
        // Route params
        const queryString = route?.params || null;
        let screenName = route?.params?.screenName || INDEX_SCREEN;

        //if login is required and user not loggin yet render LOGIN screen
        if (loginConfig.required && user.loggedIn === false) {
            screenName = LOGIN_SCREEN;
        }

        getScreenThroughSocket(
            userChannel,
            { userId: userId, queryString: queryString, screenName: screenName }
        );
    }, [])

    return (
        <View style={[{ flex: 1 }]}>
            <FixedTop style={[{ flex: 1 }]} />
            <WidgetList style={[{ flex: 1 }]} />
            <FixedBottom />
            <FloatingCard />
        </View>
    );
}
