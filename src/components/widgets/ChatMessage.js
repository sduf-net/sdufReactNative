import React, { memo } from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { handleEventAction } from '../../event_handler';

function ChatMessage({ data, navigation }) {
    const onPress = (actions) => {
        if (actions.click) {
            handleEventAction(actions.click, navigation);
        }
    }

    return (
        <TouchableOpacity onPress={() => onPress(data.actions)}>
            {/* TODO if isOwner do 'flex-end' */}
            <View style={[styles.align, data?.is_owner ? { alignItems: 'flex-end' } : '']}>
                <View style={[styles.container]}>
                    {data ?
                        <>
                            <Text style={[styles.name, data?.is_owner ? { textAlign: 'right' } : '']}>{data.name}</Text>
                            <Text style={[styles.text, data?.is_owner ? { textAlign: 'right' } : '']}>{data.text}</Text>

                            {/* TODO add img support */}
                            {/* <LightboxView /> */}

                        </>
                        : null}
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default memo(ChatMessage);

const styles = StyleSheet.create({
    container: {
        padding: '3%',
        paddingRight: '5%',
        paddingLeft: '5%',
        backgroundColor: '#eeffde',
        borderRadius: 20
    },
    name: {
        color: '#3390ec',
        fontWeight: 'bold',
    },
    align: {
        alignItems: 'flex-start'
    }
});