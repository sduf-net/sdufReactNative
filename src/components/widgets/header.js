import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import { pushEventToUserChannel } from '../../socket/socketAction';
import { useRoute } from '@react-navigation/native';
import { handleEventAction } from '../../event_handler';

export default function Header({ data, navigation }) {
    const onPress = (actions) => {
        if (actions.click) {
            handleEventAction(actions.click, navigation);
        }
    }
    const onLongPress = (actions) => {
        if (actions.long_press) {
            handleEventAction(actions.long_press, navigation);
        }
    }

    return (
        <View>
            {data ?
                <View style={[styles.container, { backgroundColor: data?.style?.background }]}>
                    <TouchableOpacity
                        onLongPress={() => onLongPress(data.images[0].actions)}
                        onPress={() => onPress(data.images[0].actions)}>
                        {data.images[0].src ? <Image source={{ uri: data.images[0].src }} style={[styles.img]} /> : null}
                    </TouchableOpacity>
                    <Text style={[styles.title]}>{data.title}</Text>
                    <View style={[styles.subContainer]}>
                        <TouchableOpacity
                            onLongPress={() => onLongPress(data.images[1].actions)}
                            onPress={() => onPress(data.images[1].actions)}>
                            {data.images[1].src ? <Image source={{ uri: data.images[1].src }} style={[styles.img]} /> : null}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onLongPress={() => onLongPress(data.images[2].actions)}
                            onPress={() => onPress(data.images[2].actions)}>
                            {data.images[2].src ? <Image source={{ uri: data.images[2].src }} style={[styles.img]} /> : null}
                        </TouchableOpacity>
                    </View>
                </View>
                : null
            }
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingLeft: 8,
        paddingRight: 8
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 80
    },
    img: {
        width: 30,
        height: 30
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