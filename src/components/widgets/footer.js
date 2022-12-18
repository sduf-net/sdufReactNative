import React from 'react'
import { Image, StyleSheet, Text, View, VirtualizedList } from 'react-native'
import uuid from 'react-native-uuid';

export default function Footer({ data }) {
    const renderWidget = ({ item }) => (
        <Image source={{ uri: item.src }} style={[styles.img]} />
    );
    const getItemCount = (item) => item.length;
    const getItem = (data, index) => {
        return data[index];
    };

    return (
        <View>
            {data ? <VirtualizedList
                data={data.images}
                contentContainerStyle={[styles.justifyContent]}
                renderItem={renderWidget}
                keyExtractor={item => uuid.v4()}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    justifyContent: {
        flex: 1,
        justifyContent: 'space-between'
    },
    img: {
        width: 50,
        height: 50
    }
});