import React from 'react'
import { View, StyleSheet, VirtualizedList } from 'react-native'
import { getItem, getItemCount } from '../../../utils';

export default function FormWidget(config) {

    const renderWidget = ({ item }) => (
        <config.factory props={item} />
    );

    return (
        <View style={[styles.container]}>
            <VirtualizedList
                data={config.nestedComponents}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
});