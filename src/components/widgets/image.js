import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import _ from 'lodash';
import CustomTouchableOpacity from '../helpers/touchableOpacity';

export default function ImageWidget({ data }) {
    return (
        <CustomTouchableOpacity data={data} >
            <View>
                {data ? <Image
                    resizeMode={'cover'}
                    style={[styles.image]}
                    source={{ uri: data.src }}
                /> : null}
            </View>
        </CustomTouchableOpacity>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 300,
    }
});