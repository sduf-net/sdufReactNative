import React, { useState } from 'react'
import { View, TextInput } from 'react-native'

export default function InputWidget({ data }) {
    const [text, onChangeText] = useState("Useless Text");
    const [number, onChangeNumber] = useState(null);

    return (
        <View>
            {data ? <TextInput
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
            /> : null}
        </View>
    );
}
