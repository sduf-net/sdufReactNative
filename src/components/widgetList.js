import { useNavigation, useRoute } from '@react-navigation/native';
import { memo, useCallback } from 'react';
import { View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import { getItem, getItemCount } from '../utils';

function WidgetList() {
    const navigation = useNavigation();
    const route = useRoute();

    const nestedComponents = useSelector(state => state.screen.nestedComponents.filter(widget => !["HeaderWidget", "FooterWidget"].includes(widget.name)), shallowEqual);

    const renderWidget = useCallback(({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
    });

    const onViewableItemsChanged = (item) => {
        // console.log("onViewableItemsChanged", item)
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
