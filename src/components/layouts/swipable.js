import React from 'react'
import { View, StyleSheet, VirtualizedList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { getItem, getItemCount } from '../../utils';

export default function SwipeableLayout(config) {
    const renderWidget = ({ item }) => (
        <config.factory props={item} />
    );

    console.log(config)

    const renderList = (list) => (
        <VirtualizedList
            data={list}
            contentContainerStyle={[styles.rightActionsContainer]}
            renderItem={renderWidget}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
            horizontal={true}
        />
    );

    return (
        <View>
            <Swipeable
                renderRightActions={() =>
                    renderList(config.data.rightActions)
                }
                renderLeftActions={() =>
                    renderList(config.data.leftActions)
                }
            >
                {
                    config.nestedComponents &&
                    renderList(config.nestedComponents)
                }
            </Swipeable>
        </View>
    );
}


const styles = StyleSheet.create({
    rightActionsContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 16,
    },
});