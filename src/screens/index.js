import { View, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { getUserChannel, initSocketConnection, joinToScreenChannel, joinToUserChannel } from '../socket/connection';
import { getScreenThroughSocket, listenScreenChannelEvents, listenUserChannelEvents } from '../socket/socketAction';
import WidgetList from '../components/widgetList';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import { useLayoutEffect, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export default function IndexScreen({ route }) {
    const userId = useSelector(state => state.user.id, shallowEqual);
    const screenName = route?.params?.screenName || "index";

    useLayoutEffect(() => {
        initSocket();
        getScreen();
    });

    const initSocket = useCallback(() => {
        const token = "ototot";

        initSocketConnection(token);
        const userChannel = joinToUserChannel(userId);
        listenUserChannelEvents(userChannel);
    }, [userId])

    const getScreen = useCallback(() => {
        const queryString = route && route.params ? route.params : null;
        const userChannel = getUserChannel();

        getScreenThroughSocket(
            userChannel,
            { userId: userId, queryString: queryString, screenName: screenName }
        );
    }, [screenName])

    return (
        <View style={[{ flex: 1 }]}>
            <FixedTop style={[{ flex: 1 }]} />
            <WidgetList style={[{ flex: 1 }]} />
            <FixedBottom />
        </View>
    );
}
