import React, { useState } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'

export default function Label3({ data }) {
    return (
        <View>
            {data ?
                <>
                    <Text style={[styles.label]}>{data.text}</Text>
                </>
                : null}
        </View>
    );
}


const styles = StyleSheet.create({
    label: {
        borderWidth: 1,
        borderColor: "orange",
        borderRadius: 50,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 7,
        paddingLeft: 7,
        marginRight: 10
    }
});