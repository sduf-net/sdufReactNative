import { View, StyleSheet } from 'react-native';
import React from 'react';
import { initSocketConnection, joinToScreenChannel, joinToUserChannel } from '../socket/connection';
import { getScreenThroughSocket, listenScreenChannelEvents, listenUserChannelEvents } from '../socket/socketAction';
import WidgetList from '../components/widgetList';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import { useLayoutEffect, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

export default function IndexScreen({ route }) {
    const userId = useSelector(state => state.user.id, shallowEqual);
    const screenName = route?.params?.screenName || "index";

    // useEffect(() => {
    //     initSocket();
    // }, [screenName]);

    useEffect(() => {
        initSocket();
    });

    const initSocket = () => {
        const token = "ototot";

        initSocketConnection(token);
        const userChannel = joinToUserChannel(userId);
        listenUserChannelEvents(userChannel);
        // const screenChannel = joinToScreenChannel(screenName);
        // listenScreenChannelEvents(screenChannel);


        const queryString = route && route.params ? route.params : null;
        getScreenThroughSocket(
            userChannel,
            { userId: userId, queryString: queryString, screenName: screenName }
        );
    }

    return (
        <View style={[{ flex: 1 }]}>
            <FixedTop style={[{ flex: 1 }]} />
            <WidgetList style={[{ flex: 1 }]} />
            <FixedBottom />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        backgroundColor: 'red',
        color: "red"
    }
});
