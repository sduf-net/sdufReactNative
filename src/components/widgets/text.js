import React, { useState } from 'react'
import { Text, View } from 'react-native'

export default function TextWidget({data}) {
    return (
        <View>
            {data ? <Text>{data.text}</Text> : null}
        </View>
    );
}


