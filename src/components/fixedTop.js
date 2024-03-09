import { Text, View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import React, { memo } from 'react';
import { getItem, getItemCount } from '../utils';

function FixedTop({ navigation, route }) {
    const fixedTop = useSelector(state => state.screen.nestedComponents.find(widget => widget.name == "FixedTop"), shallowEqual);

    const renderWidget = ({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
    };

    return (
        <View>
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

export default memo(FixedTop)