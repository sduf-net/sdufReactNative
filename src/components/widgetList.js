import { useNavigation, useRoute } from '@react-navigation/native';
import { View, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';
import ComponentFactory from './factory';

export default function WidgetList() {
    const navigation = useNavigation();
    const route = useRoute();

    const nestedComponents = useSelector(state => state.screen.nestedComponents.filter(widget => !["HeaderWidget", "FooterWidget"].includes(widget.name)));
    // console.log("nestedComponents", nestedComponents)

    const renderWidget = ({ item }) => {
        return <ComponentFactory props={item} navigation={navigation} route={route} />
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
