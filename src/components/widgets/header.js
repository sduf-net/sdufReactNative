import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Header({ data }) {

    return (
        <View style={[styles.container]}>
            {data ?
                <>
                    {data.images[0].src ? <Image source={{ uri: data.images[0].src }} style={[styles.img]} /> : null}
                    <Text style={[styles.title]}>{data.title}</Text>
                    <View style={[styles.subContainer]}>
                        {data.images[1].src ? <Image source={{ uri: data.images[1].src }} style={[styles.img]} /> : null}
                        {data.images[2].src ? <Image source={{ uri: data.images[2].src }} style={[styles.img]} /> : null}
                    </View>
                </>
                : null
            }
        </View>
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