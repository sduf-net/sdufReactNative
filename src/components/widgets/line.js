import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function LineWidget({ data }) {
    return (
        <View>
            <Text style={{ paddingBottom: 10, paddingTop: 10 }}>---------------------------------------------</Text>
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