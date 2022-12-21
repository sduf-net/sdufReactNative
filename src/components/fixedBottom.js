import { Text, View, VirtualizedList } from 'react-native';
import { useSelector } from 'react-redux';
import ComponentFactory from './factory';
// import data from './../screens/data';
import data from '../screens/full_data';

export default function FixedBottom({ widgets }) {
    // const { nestedComponents } = useSelector(state => state.screen);

    const renderWidget = ({ item }) => {
        return <ComponentFactory props={item} />
    };

    const getItemCount = (item) => item.length;
    const getItem = (data, index) => {
        return data[index];
    };

    const nestedComponents = data;

    return (
        <View>
            <Text>Fixed Bottom</Text>
        </View>
    );

}
