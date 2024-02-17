import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import uuid from 'react-native-uuid';

export default function ItemList({ data }) {

    const renderItem = ({ item }) => (
        <View>
            <Text style={[styles.item]}>{item}</Text>
        </View>
    );

    return (
        <View>
            {data ?
                <FlatList
                    style={[styles.list]}
                    data={data.list}
                    renderItem={renderItem}
                    listKey={uuid.v4()}
                    keyExtractor={(item) => uuid.v4()}
                />
                : null}
        </View>
    );
}


const styles = StyleSheet.create({
    list: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 7,
        paddingLeft: 7,
        marginRight: 10
    },
    item: {

    }
});