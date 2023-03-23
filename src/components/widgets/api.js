// import React, { useState } from 'react'
// import { Text, View } from 'react-native'

// export default function ApiWidget(config) {

//     return (
//         <View><Text>ApiWidget</Text></View>
//     );
// }

// pushScreenEvent: function (context, data) {
//     data = {
//       ...data,
//       screenName: context.getters.currentScreenName,
//       userId: getUserId(),
//     }

//     getScreenChannel().push("screen:event", data, TIMEOUT)
//   },


//   store.dispatch("pushScreenEvent", actions[name]);

import React, { memo, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserChannel } from '../../socket/connection';
import { pushEventToChannel } from '../../socket/socketAction';

function ApiWidget({ data, id }) {
    const userId = useSelector(state => state.user.id);

    useEffect(() => {
        const userChannel = getUserChannel();
        pushEventToChannel(userChannel, {
            userId: userId,
            actionName: "request_widget",
            payload: { parent_id: id, callback_url: data.callbackUrl }
        })
    }, []);

    return (
        <View><Text>ApiWidget</Text></View>
    );
}

export default memo(ApiWidget);