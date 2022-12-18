import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View, VirtualizedList } from 'react-native'
import uuid from 'react-native-uuid';
import { pushEventToUserChannel } from '../../socket/socketAction';

export default function Footer({ data }) {
    const onPress = (actions) => {
        if (actions.click) {
            // TODO
            const params = {
                type: "click",
                user_id: "123",
                screen_name: "router",
                query: ""
            }
            pushEventToUserChannel(params);
            console.log("ON PRESS", actions)
        }
    }
    const renderWidget = ({ item }) => (
        <TouchableHighlight onPress={() => onPress(item.actions)}>
            <Image source={{ uri: item.src }} style={[styles.img]} />
        </TouchableHighlight>
    );
    const getItemCount = (item) => item.length;
    const getItem = (data, index) => {
        return data[index];
    };

    return (
        <View>
            {data ? <VirtualizedList
                data={data.images}
                contentContainerStyle={[styles.justifyContent]}
                renderItem={renderWidget}
                keyExtractor={item => uuid.v4()}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    justifyContent: {
        flex: 1,
        justifyContent: 'space-between'
    },
    img: {
        width: 50,
        height: 50
    }
});