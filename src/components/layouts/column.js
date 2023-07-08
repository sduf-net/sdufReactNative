import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

export default function Column(config) {
    const renderWidget = ({ item }) => (
        <config.factory props={item} />
    );

    return (
        <View>
            <FlatList
                // style={[styles.item]}
                data={config.nestedComponents}
                numColumns={2}
                renderItem={renderWidget}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}


const styles = StyleSheet.create({

})