import React from 'react'
import { StyleSheet, View, VirtualizedList } from 'react-native'
import { getItem, getItemCount } from '../../utils';

export default function Wrap(config) {
    const renderWidget = ({ item }) => (
        <config.factory props={item} />
    );
    const widgetStyles = config.styles ?? {};

    return (
        <View style={[styles.container, { flexDirection: "row" }, widgetStyles]}>
            <VirtualizedList
                data={config.nestedComponents}
                contentContainerStyle={[styles.justifyContent]}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3%'
    },
});