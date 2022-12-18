import React, { useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'

export default function ImageWidget({ data }) {
    return (
        <View>
            {data ? <Image
                style={[styles.image]}
                source={{ uri: data.src }}
            /> : null}
        </View>
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
        width: 100,
        height: 100,
    }
});