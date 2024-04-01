import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { onChange, onSubmit } from '../../../event_handler';
import useDebounced from '../../../hooks/useDebounced';

const InputWithButton = ({ data }) => {
    const [text, onChangeText] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();
    const debouncedText = useDebounced(text, data.debounce ?? 500);

    const handleChanges = (text) => {
        onChangeText(text);
    };

    const handleSend = () => {
        if (text.trim() !== '') {
            onSubmit(data.actions, text, navigation, route);
        }
    };

    useEffect(() => {
        if (debouncedText === null) return;
        onChange(data.actions, debouncedText, navigation, route);
    }, [debouncedText])

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
                    source={{ uri: data?.icon_src }}
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
