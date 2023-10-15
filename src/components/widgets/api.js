import React, { memo, useEffect } from 'react';
import { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserChannel } from '../../socket/connection';
import { pushEventToChannel } from '../../socket/socketAction';
import { handleEventAction } from '../../event_handler';
import { useNavigation } from '@react-navigation/native';

function ApiWidget({ data, id }) {
    const userId = useSelector(state => state.user.id);
    const navigation = useNavigation();

    useEffect(() => {
        // handleVisibility();
        handleEventAction({id, callbackUrl: data.callbackUrl}, navigation);
    })

    // const handleVisibility = useCallback(() => {
    //     const userChannel = getUserChannel();
    //     pushEventToChannel(userChannel, {
    //         userId: userId,
    //         actionName: "request_widget",
    //         payload: { parent_id: id, callback_url: data.callbackUrl }
    //     })
    // }, []);

    return (
        <View></View>
    );
}

export default memo(ApiWidget);