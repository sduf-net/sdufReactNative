import React, { useIsFocused } from '@react-navigation/native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DeviceEventEmitter, KeyboardAvoidingView, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import { getItem, getItemCount } from '../utils';
import { selectCurrentScreenMainBody } from '../redux/screens';

function WidgetList({ onRefresh, navigation, route }) {
    const [height, setHeight] = useState(null);
    const scrollViewRef = useRef();

    const isFocused = useIsFocused();
    const nestedComponents = useSelector(state => selectCurrentScreenMainBody(state), shallowEqual);

    const renderWidget = useCallback(({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
    });

    const scrollToBottom = () => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    const onViewableItemsChanged = (item) => {
        item.changed.forEach(element => {
            DeviceEventEmitter.emit('onViewableItemsChanged', element);
        });
    }

    useEffect(() => {
        DeviceEventEmitter.addListener('footerHeight', (height) => setHeight(height));
        DeviceEventEmitter.addListener('scrollToBottom', scrollToBottom);
    }, [])

    if (!isFocused) return;

    return (
        <KeyboardAvoidingView enabled={true} behavior={'padding'} style={[{ flex: 1, marginBottom: height }]}>
            {nestedComponents ? <VirtualizedList
                ref={scrollViewRef}
                data={nestedComponents}
                initialNumToRender={2}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                onViewableItemsChanged={onViewableItemsChanged}
                onRefresh={onRefresh}
                refreshing={false}
            /> : nestedComponents}
        </KeyboardAvoidingView>
    );

}
export default memo(WidgetList);
