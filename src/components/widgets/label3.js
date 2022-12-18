import React, { useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'

export default function Label3({ data }) {
    return (
        <View>
            {data ?
                <>
                    <Text>LAbel3 {data.text}</Text>
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