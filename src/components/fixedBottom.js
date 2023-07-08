import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';
import { StyleSheet, View, VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import ComponentFactory from './factory';
import { getItem, getItemCount } from '../utils';

function FixedBottom() {
    const navigation = useNavigation();
    const nestedComponents = useSelector(state => state.screen.nestedComponents.filter(widget => widget.name == "FooterWidget"), shallowEqual);
    // console.log("FooterWidget", nestedComponents)

    const renderWidget = ({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} />
    };

    return (
        <View style={[styles.container]}>
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

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
});


export default memo(FixedBottom)
