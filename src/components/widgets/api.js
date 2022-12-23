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

import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { pushEventToUserChannel } from '../../socket/socketAction';

export default function ApiWidget({data, route}) {

    useEffect(() => {
        console.log("API WIDGET", data)

        const params = {
            type: "screen:event",
            user_id: "123",
            screen_name: route.name,
            query: route.params,
            callback_url: data.callbackUrl
        }
        pushEventToUserChannel(params);
    });

    return (
        <View><Text>ApiWidget</Text></View>
    );
}
