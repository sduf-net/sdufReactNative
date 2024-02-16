import React, { memo, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { handleEventAction } from '../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';

function ApiWidget({ data, id }) {
    const userId = useSelector(state => state.user.id);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        handleEventAction({
            id,
            type: "request_widget",
            callbackUrl: data.callbackUrl,
            params: data
        }, navigation, route);
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#007AFF" />
        </View>
    );
}

export default memo(ApiWidget);