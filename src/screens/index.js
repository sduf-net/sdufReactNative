import { Dimensions, StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { pushEventToChannel } from '../socket/socketAction';
import WidgetList from '../components/widgetList';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import { shallowEqual, useSelector } from 'react-redux';
import FloatingCard from '../components/layouts/floatingCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { INDEX_SCREEN } from '../utils/constants';
import { getUserChannel } from '../socket/userChannel';
import { GET_SCREEN_BY_NAME } from '../socket/actionName';

export default function IndexScreen({ route }) {
    const navigation = useNavigation();
    const userId = useSelector(state => state.user.id, shallowEqual);
    const userChannel = getUserChannel();

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
        const screenName = route?.params?.screenName || INDEX_SCREEN;

        pushEventToChannel(userChannel, {
            userId: userId,
            actionName: GET_SCREEN_BY_NAME,
            payload: {
                query: queryString,
                screen_name: screenName
            }
        })

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