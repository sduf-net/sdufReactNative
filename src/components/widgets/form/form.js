import React, { useLayoutEffect } from 'react'
import { View, StyleSheet, VirtualizedList } from 'react-native'
import { getItem, getItemCount } from '../../../utils';
import { useDispatch } from 'react-redux';
import { setUpForm } from '../../../redux/form';

export default function FormWidget(config) {

    const dispatch = useDispatch();

    const renderWidget = ({ item }) => (
        <config.factory props={item} />
    );

    useLayoutEffect(() => {
        dispatch(setUpForm({action: config.data.action, method: config.data.method}));
    });

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