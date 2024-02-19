import React, { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { memo, useCallback, useMemo } from 'react';
import { View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import { getItem, getItemCount } from '../utils';
import { handleEventAction } from '../event_handler';
import { PAGINATION } from '../socket/actionName';

const excludeWidgets = ["FixedTop", "FixedBottom"];

function WidgetList({ onRefresh, refreshing, navigation, route }) {
    const isFocused = useIsFocused();
    const nestedComponents = useSelector(state => state.screen.nestedComponents.filter(widget => !excludeWidgets.includes(widget.name)), shallowEqual);

    const renderWidget = useCallback(({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
    });

    // when PaginationWidget is visible call pagination api
    // TODO add load state
    const onViewableItemsChanged = (item) => {
        item.changed.forEach(element => {
            if (element.item.name === 'PaginationWidget') {
                handleEventAction({
                    type: PAGINATION,
                    url: element.item.data.callbackUrl,
                    id: element.item.id
                }, navigation);
            }
        });
    }

    if (!isFocused) return;

    return (
        <View>
            {nestedComponents ? <VirtualizedList
                data={nestedComponents}
                initialNumToRender={2}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                onViewableItemsChanged={onViewableItemsChanged}
                onRefresh={onRefresh}
                refreshing={refreshing}
            /> : nestedComponents}
        </View>
    );

}
WidgetList.whyDidYouRender = true
export default memo(WidgetList);
