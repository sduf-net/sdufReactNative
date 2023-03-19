import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';
import ComponentFactory from './factory';

export default function FixedBottom() {
    const navigation = useNavigation();
    const nestedComponents = useSelector(state => state.screen.nestedComponents.filter(widget => widget.name == "FooterWidget"));
    console.log("FooterWidget", nestedComponents)

    const renderWidget = ({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} />
    };

    const getItemCount = (item) => item.length;
    const getItem = (data, index) => {
        return data[index];
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
        bottom: 50
    },
});

