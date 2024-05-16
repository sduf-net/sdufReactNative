import { StyleSheet, View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import React, { memo } from 'react';
import { getItem, getItemCount } from '../utils';
import { selectCurrentFixedTop } from '../redux/screens';

function FixedTop({ navigation, route }) {
    const fixedTop = useSelector(state => selectCurrentFixedTop(state), shallowEqual);
    const isAbsolute = fixedTop?.isAbsolute ?? false;

    const renderWidget = ({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
    };

    return (
        <View style={[isAbsolute ? styles.container : null, fixedTop?.styles ?? null]}>
            {fixedTop ? <VirtualizedList
                data={fixedTop.nestedComponents}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100
    },
});

export default memo(FixedTop)