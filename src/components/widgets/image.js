import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import _ from 'lodash';
import CustomTouchableOpacity from '../helpers/touchableOpacity';
import Lightbox from 'react-native-lightbox-v2';

export default function ImageWidget({ data }) {
    return (
        <CustomTouchableOpacity data={data} >
            <View>
                {data &&
                    <Lightbox style={[styles.image]}>
                        <Image
                            resizeMode={'cover'}
                            style={[styles.image]}
                            source={{ uri: data.src }}
                        />
                    </Lightbox>
                }
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