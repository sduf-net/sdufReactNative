import React from 'react'
import { StyleSheet, View, VirtualizedList } from 'react-native'
import { getItem, getItemCount } from '../../utils';

export default function Row(config) {
    const renderWidget = ({ item }) => (
        <config.factory props={item} navigation={config.navigation}/>
    );

    return (
        <View style={[styles.container, { flexDirection: "row" }]}>
            <VirtualizedList
                data={config.nestedComponents}
                contentContainerStyle={[styles.justifyContent]}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal={true}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});