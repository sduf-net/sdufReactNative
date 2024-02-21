import React, { memo } from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import CustomTouchableOpacity from '../helpers/touchableOpacity';

function ChatPreview({ data }) {
    return (
        <CustomTouchableOpacity data={data}>
            <View style={[styles.container, { backgroundColor: data?.style?.background }]}>
                {data ?
                    <>
                        <Image
                            resizeMode={'cover'}
                            style={[styles.image, { width: 80, height: 80 }]}
                            source={{ uri: data.src }}
                        />
                        <View style={[styles.sub_container]}>
                            <Text style={[styles.title]}>{data.title}</Text>
                            <Text style={[styles.text]}>{data.text}</Text>
                            <Text style={[styles.date]}>{data.date}</Text>
                        </View>
                    </>
                    : null}
            </View>
        </CustomTouchableOpacity>
    );
}

export default memo(ChatPreview);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5
    },
    image: {
        maxHeight: 300,
        borderRadius: 50,
        maxWidth: 80,
        maxHeight: 80
    },
    sub_container: {
        paddingLeft: 10
    },
    title: {
        fontSize: 20,
        alignItems: 'center',
        paddingBottom: 5
    },
    text: {
        fontSize: 16,
        paddingBottom: 5
    },
    date: {
        fontSize: 14,
    }
});