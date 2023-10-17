import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { getScreenThroughSocket } from '../socket/socketAction';
import WidgetList from '../components/widgetList';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import { shallowEqual, useSelector } from 'react-redux';
import FloatingCard from '../components/layouts/floatingCard';
import useUserChannel from '../hooks/useUserChannel';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { INDEX_SCREEN } from '../utils/constants';
import { ScrollView, RefreshControl } from 'react-native';
import { useState } from 'react';

export default function IndexScreen({ route }) {
    const navigation = useNavigation();
    const userId = useSelector(state => state.user.id, shallowEqual);
    const { userChannel } = useUserChannel(userId);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getScreen();

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

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

        getScreenThroughSocket(
            userChannel,
            { userId: userId, queryString: queryString, screenName: screenName }
        );
    }, [])

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            horizontal
        >
            <View style={styles.container}>
                <FixedTop />
                <WidgetList />
                <FixedBottom />
                <FloatingCard />
            </View>
        </ScrollView>
    );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth
    },
});