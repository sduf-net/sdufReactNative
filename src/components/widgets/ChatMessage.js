import React, { memo } from 'react'
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { handleEventAction } from '../../event_handler';
import { LightboxView } from './LightboxView';

function ChatMessage({ data, navigation }) {
    const onPress = (actions) => {
        if (actions.click) {
            handleEventAction(actions.click, navigation);
        }
    }

    return (
        <TouchableOpacity onPress={() => onPress(data.actions)}>
            {/* TODO if isOwner do 'flex-end' */}
            <View style={[styles.align, {alignItems: data?.isOwner}]}>
                <View style={[styles.container]}>
                    {data ?
                        <>
                            <Text style={[styles.name]}>{data.name}</Text>
                            <Text style={[styles.text]}>{data.text}</Text>

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
        width: '80%',
        padding: '3%',
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