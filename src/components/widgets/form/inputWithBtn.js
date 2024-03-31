import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { onChange, onSubmit } from '../../../event_handler';

const InputWithButton = ({ data }) => {
    const [text, onChangeText] = useState('');
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();

    const handleChanges = (text) => {
        onChange(data.actions, text, navigation, route);
        onChangeText(text);
        dispatch(setForm({[data.name]: text }));
    };

    const handleSend = () => {
        if (text.trim() !== '') {
            onSubmit(data.actions, text, navigation, route);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={data?.placeholder}
                value={text}
                onChangeText={handleChanges}
                onSubmitEditing={handleSend}
            />
            <TouchableOpacity onPress={handleSend}>
                <Image
                    resizeMode={'cover'}
                    style={[styles.image]}
                    source={{ uri: data?.icon_src}}
                />
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    image: {
        height: 40,
        width: 40,
    }
});

export default InputWithButton;
