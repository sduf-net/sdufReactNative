import React from 'react'
import {StyleSheet, View, Text } from 'react-native'

export default function LineWidget({ data }) {
    return (
        <View>
           <Text>---------------------------------------------</Text>
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