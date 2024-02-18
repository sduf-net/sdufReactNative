import React, { memo, useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { handleEventAction } from '../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';

function ApiWidget({ data, id }) {
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        handleEventAction({
            id,
            type: "request_widget",
            callbackUrl: data.callbackUrl,
            params: data
        }, navigation, route);
    })

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#007AFF" />
        </View>
    );
}

export default memo(ApiWidget);