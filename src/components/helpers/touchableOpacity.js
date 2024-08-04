import _ from 'lodash';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { onLongPress as onLongPressGlobal, onPress as onPressGlobal } from '../../event_handler';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

export default function CustomTouchableOpacity(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const {
        data,
        children,
        onPress = null,
        onLongPress = null,
        style = null
    } = props;

    if (!isFocused) return;

    return (
        <TouchableOpacity
            style={style}
            activeOpacity={_.isEmpty(data.actions) ? 1 : 0.5}
            onPress={() => {
                onPress && onPress(data.actions, navigation, route);
                onPressGlobal(data.actions, navigation, route);
            }}
            onLongPress={() => {
                onLongPress && onLongPress(data.actions, navigation, route);
                onLongPressGlobal(data.actions, navigation, route);
            }}
        >
            {children}
        </TouchableOpacity>
    );
}
