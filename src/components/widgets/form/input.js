import React, { useCallback, useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { setForm } from '../../../redux/form';
import { useDispatch } from 'react-redux';
import { onChange } from '../../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function InputWidget({ data }) {
    const [text, onChangeText] = useState('');
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const widgetStyles = data.styles ?? {};

    const handleChanges = (text) => {
        onChangeText(text);

        if (data.form_id) {
            onChange(data.actions, text, navigation, route);
            dispatch(setForm({ form_id: data.form_id, [data.name]: text }));
        }
    };

    return (
        <View>
            {data ? <TextInput
                style={[styles.input, widgetStyles]}
                onChangeText={handleChanges}
                value={text}
                placeholder={data?.placeholder}
                name={data?.name}
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 4,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 7,
        paddingLeft: 7,
        marginBottom: 10
    }
});