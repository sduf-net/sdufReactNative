import { Dimensions, StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { getScreenThroughSocket } from '../socket/socketAction';
import WidgetList from '../components/widgetList';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import { shallowEqual, useSelector } from 'react-redux';
import FloatingCard from '../components/layouts/floatingCard';
import useUserChannel from '../hooks/useUserChannel';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { INDEX_SCREEN } from '../utils/constants';

export default function IndexScreen({ route }) {
    const navigation = useNavigation();
    const userId = useSelector(state => state.user.id, shallowEqual);
    const { userChannel } = useUserChannel(userId);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setLoading(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        setLoading(true);
    }, [userId])

    useEffect(() => {
        if (!loading) return;

        getScreen();
    }, [loading])


    // Використовуємо useFocusEffect для додавання слухача при фокусуванні на екрані
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('state', (event) => {
                setLoading(true);
            });

            return unsubscribe;
        }, [navigation])
    );

    const getScreen = useCallback(() => {
        const queryString = route?.params || null;
        let screenName = route?.params?.screenName || INDEX_SCREEN;

        getScreenThroughSocket(
            userChannel,
            { userId: userId, queryString: queryString, screenName: screenName }
        );

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

    return (

        <View style={styles.container}>
            <FixedTop />
            <WidgetList onRefresh={onRefresh} refreshing={refreshing} />
            <FixedBottom />
            <FloatingCard />
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth
    },
});