import { useNavigation, useRoute } from '@react-navigation/native';
import { memo, useCallback } from 'react';
import { View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';

function WidgetList() {
    const navigation = useNavigation();
    const route = useRoute();

    const nestedComponents = useSelector(state => state.screen.nestedComponents.filter(widget => !["HeaderWidget", "FooterWidget"].includes(widget.name)), shallowEqual);
    // console.log("nestedComponents", nestedComponents)
    
    const renderWidget = useCallback(({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
    });

    const getItemCount = (item) => item.length;
    const getItem = (data, index) => {
        return data[index];
    };

    // console.log("WIDEGTLITS", nestedComponents)
    return (
        <View>
            {nestedComponents ? <VirtualizedList
                data={nestedComponents}
                initialNumToRender={2} 
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            /> : nestedComponents}
        </View>
    );

}

export default memo(WidgetList);
