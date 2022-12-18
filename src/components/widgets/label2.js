import React, { useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'

export default function Label2({ data }) {
    return (
        <View>
            {data ?
                <>
                    <Text>LAbel2 {data.text}</Text>
                </>
                : null}
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