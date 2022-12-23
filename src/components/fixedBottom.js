import { Text, View, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';
import ComponentFactory from './factory';

export default function FixedBottom({ navigation }) {
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
