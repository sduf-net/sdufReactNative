import { Text, View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { getItem, getItemCount } from '../utils';

function FixedTop() {
    const navigation = useNavigation();
    const nestedComponents = useSelector(state => state.screen.nestedComponents.filter(widget => widget.name == "HeaderWidget"), shallowEqual);
    // console.log("HeaderWidget", nestedComponents)

    const renderWidget = ({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} />
    };

    return (
        <View>
            {nestedComponents ? <VirtualizedList
                data={nestedComponents}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            /> : nestedComponents}
        </View>
    );
}

export default memo(FixedTop)