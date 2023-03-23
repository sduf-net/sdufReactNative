import React, { memo } from 'react'
import {  StyleSheet, View, Text,  TouchableOpacity } from 'react-native'

function ItemHeader2({ data, navigation }) {
    return (
        <TouchableOpacity onPress={() => onPress(data.actions)}>
            <View>
                {data ?
                    <>
                        <Text style={[styles.title]}>{data.title}</Text>
                        <Text style={[styles.sub_title]}>{data.sub_title}</Text>

                        <View style={[styles.prices_list]}>
                            <Text style={[styles.price_usd]}>USD {data.price.usd}</Text>
                            <Text style={[styles.price]}>UAH {data.price.uah}</Text>
                        </View>
                    </>
                    : null}
            </View>
        </TouchableOpacity>
    );
}

export default memo(ItemHeader2);

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    sub_title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    prices_list: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 16
    },
    price_usd: {
        color: 'green',
        fontWeight: 'bold',
        paddingRight: 10
    }
});