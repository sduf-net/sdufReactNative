import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Hr({ data }) {
    return (
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingTop: 5,
                paddingBottom: 5
            }}
        />
    );
}
