import React, { memo, useEffect } from 'react';
import { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserChannel } from '../../socket/connection';
import { pushEventToChannel } from '../../socket/socketAction';

function ApiWidget({ data, id }) {
    const userId = useSelector(state => state.user.id);

    useEffect(() => {
        handleImageVisibility();
    })

    const handleImageVisibility = useCallback(() => {
        const userChannel = getUserChannel();
        pushEventToChannel(userChannel, {
            userId: userId,
            actionName: "request_widget",
            payload: { parent_id: id, callback_url: data.callbackUrl }
        })
    }, []);

    return (
        <View></View>
    );
}

export default memo(ApiWidget);