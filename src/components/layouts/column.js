import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ComponentFactory from '../factory';

export default function Column(config) {
    const renderWidget = ({ item }) => (
        <ComponentFactory props={item} />
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