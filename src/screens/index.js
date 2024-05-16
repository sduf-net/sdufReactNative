import { Dimensions, StyleSheet, View, DeviceEventEmitter, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { pushEventToChannel } from '../socket/socketAction';
import WidgetList from '../components/widgetList';
import FixedTop from '../components/fixedTop';
import FixedBottom from '../components/fixedBottom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import FloatingCard from '../components/layouts/floatingCard';
import CustomModal from '../components/layouts/modalWindow';
import { useNavigation, useFocusEffect, useRoute, useIsFocused } from '@react-navigation/native';
import { getUserChannel } from '../socket/userChannel';
import { GET_SCREEN_BY_NAME } from '../socket/actionName';
import useErrors from '../hooks/useErrors';
import { selectCurrentScreenByName, setCurrentScreenId } from '../redux/screens';

const INDEX_SCREEN = 'index';

export default function IndexScreen() {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const userId = useSelector(state => state.user.id, shallowEqual);
    const screensState = useSelector(state => state.screens, shallowEqual);
    // const { newError } = useErrors()

    const [loading, setLoading] = useState(false);

    const onRefresh = useCallback(() => {
        DeviceEventEmitter.emit('onRefresh', true);
        setLoading(true);
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

        // TODO refactor
        // onreload
        const screen = selectCurrentScreenByName(screensState, screenName);
        if (screen.length) {
            console.log("jkjkjkjkjkj",screen[0].id)
            dispatch(setCurrentScreenId(screen[0].id));
        } else {
            pushEventToChannel(getUserChannel(), {
                userId: userId,
                actionName: GET_SCREEN_BY_NAME,
                payload: {
                    query: queryString,
                    screen_name: screenName
                }
            })
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

    const onFooterLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        DeviceEventEmitter.emit('footerHeight', height);
    };

    if (!isFocused) return;

    return (
        <View style={[styles.container]}>
            <FixedTop />
            <WidgetList onRefresh={onRefresh} />
            <FixedBottom onLayout={onFooterLayout} />
            <FloatingCard />
            <CustomModal />
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