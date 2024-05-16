import React, { memo } from 'react';
import { StyleSheet, View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import { getItem, getItemCount } from '../utils';
import { selectCurrentFixedBottom } from '../redux/screens';

function FixedBottom({ navigation, route, onLayout }) {
    const fixedBottom = useSelector(state => selectCurrentFixedBottom(state), shallowEqual);

    const renderWidget = ({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
    };

    return (
        <View style={[styles.container]} onLayout={onLayout}>
            {fixedBottom ? <VirtualizedList
                data={fixedBottom.nestedComponents}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                keyboardShouldPersistTaps="always"
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
});


export default memo(FixedBottom)
