import React, { useState } from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { handleEventAction } from '../../event_handler';

export default function ImageWidget({ data, navigation, route }) {
    const onPress = (actions) => {
        if (actions.click) {
            handleEventAction(actions.click, navigation, route);
        }
    }

    return (
        <TouchableOpacity onPress={() => onPress(data.actions)}>
            <View>
                {data ? <Image
                    resizeMode={'cover'}
                    style={[styles.image]}
                    source={{ uri: data.src }}
                /> : null}
            </View>
        </TouchableOpacity>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 300,
    }
});