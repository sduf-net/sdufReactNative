import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { pushEventToUserChannel } from '../../socket/socketAction';
import { useRoute } from '@react-navigation/native';

export default function Header({ data, route }) {
    const onPress = (actions) => {
        if (actions.click) {
            // TODO
            const params = {
                type: "click",
                user_id: "123",
                screen_name: route.name,
                query: route.params
            }
            pushEventToUserChannel(params);
        }
    }

    return (
        <View style={[styles.container]}>
            {data ?
                <>
                    <TouchableOpacity onPress={() => onPress(data.images[0].actions)}>
                        {data.images[0].src ? <Image source={{ uri: data.images[0].src }} style={[styles.img]} /> : null}
                    </TouchableOpacity>
                    <Text style={[styles.title]}>{data.title}</Text>
                    <View style={[styles.subContainer]}>
                        <TouchableOpacity onPress={() => onPress(data.images[1].actions)}>
                            {data.images[1].src ? <Image source={{ uri: data.images[1].src }} style={[styles.img]} /> : null}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onPress(data.images[2].actions)}>
                            {data.images[2].src ? <Image source={{ uri: data.images[2].src }} style={[styles.img]} /> : null}
                        </TouchableOpacity>

                    </View>
                </>
                : null
            }
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    img: {
        width: 40,
        height: 40
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: '5%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 18
    }
});