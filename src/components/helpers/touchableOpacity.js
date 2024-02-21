import _ from 'lodash';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { onLongPress, onPress } from '../../event_handler';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

export default function CustomTouchableOpacity(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const { data, children } = props;

    if (!isFocused) return;

    return (
        <TouchableOpacity
            activeOpacity={_.isEmpty(data.actions) ? 1 : 0.5}
            onPress={() => onPress(data.actions, navigation, route)}
            onLongPress={() => onLongPress(data.actions, navigation, route)}
        >
            {children}
        </TouchableOpacity>
    );
}
