import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from '../components/widgets/footer';
import Header from '../components/widgets/header';
import React from 'react';
import { initSocketConnection, joinToUserChannel } from '../socket/connection';
import { getScreenThroughSocket, listenUserChannelEvents } from '../socket/socketAction';
import { useSQLite } from './useSql';
import WidgetList from '../components/widgetList';

export default function IndexScreen({ route }) {
    const [refresh, setRefresh] = useState(true);
    const { widgets, loading, error, refetchPages } = useSQLite(route, setRefresh);

    useEffect(() => {
        initSocket();
    }, [initSocket]);

    const initSocket = () => {
        let token = "ototot";
        let userId = "user1";

        initSocketConnection(token);
        userChannel = joinToUserChannel(userId);
        listenUserChannelEvents(userChannel);
        getScreenThroughSocket("index", route);
    }

    return (
        <View>
            <Header />
            <WidgetList />
            <Footer />
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
