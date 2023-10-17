import { useNavigation, useRoute } from '@react-navigation/native';
import { memo, useCallback } from 'react';
import { View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import { getItem, getItemCount } from '../utils';
import { handleEventAction } from '../event_handler';

const excludeWidgets = ["FixedTop", "FixedBottom"];

function WidgetList() {
    const navigation = useNavigation();
    const route = useRoute();
    const nestedComponents = useSelector(state => state.screen.nestedComponents.filter(widget => !excludeWidgets.includes(widget.name)), shallowEqual);
console.log('WidgetList')
    const renderWidget = useCallback(({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
    });

    // when PaginationWidget is visible call pagination api
    // TODO add load state
    const onViewableItemsChanged = (item) => {
        item.changed.forEach(element => {
            if (element.item.name === 'PaginationWidget') {
                handleEventAction({
                    type: "getPagination",
                    url: element.item.data.callbackUrl,
                    id: element.item.id
                }, navigation);
            }
        });
    }

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
            /> : nestedComponents}
        </View>
    );

}

export default memo(WidgetList);
