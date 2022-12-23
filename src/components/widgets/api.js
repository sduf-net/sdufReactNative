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
import React from 'react';
import { View, Text } from 'react-native';
import { pushEventToUserChannel } from '../../socket/socketAction';
class ApiWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("API WIDGET", this.props)

        const params = {
            type: "screen:event",
            user_id: "123",
            screen_name: this.props.route.name,
            query: this.props.route.params,
            callback_url: this.props.data.callbackUrl
        }
        pushEventToUserChannel(params);
    }

    render() {
        return (
            <View><Text>ApiWidget</Text></View>
        );
    }
}

export default ApiWidget;