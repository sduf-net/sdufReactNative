import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native'
import uuid from 'react-native-uuid';
import { useRoute } from '@react-navigation/native';
import { handleEventAction } from '../../event_handler';


// const processAction = (name, actions) => {
//     if (actions && actions[name]) {
//         switch (actions[name].type) {
//             case "routeBack":
//                 router.go(-1)
//                 break;
//             case "routeToExternal":
//                 // window.location.href = actions[name].url;
//                 window.open(actions[name].url)
//                 break;
//             case "routeToLocal":
//                 router.push({
//                     path: "/" + actions[name].screen_name,
//                     query: actions[name].params,
//                 });
//                 break;
//             case "routeToScreenFromApi":
//             case "asyncPost":
//             case "asyncGet":
//                 store.dispatch("pushScreenEvent", actions[name]);
//                 break;
//             default:
//                 console.log("default action processAction");
//         }
//     }
// }



export default function Footer({ data, navigation }) {
    const route = useRoute();

    const onPress = (actions) => {
        if (actions.click) {
            handleEventAction(actions.click, navigation);
        }
    }

    const renderWidget = ({ item }) => (
        <TouchableOpacity onPress={() => onPress(item.actions)}>
            <Image source={{ uri: item.src }} style={[styles.img]} />
        </TouchableOpacity>
    );
    const getItemCount = (item) => item.length;
    const getItem = (data, index) => {
        return data[index];
    };

    return (
        <View>
            {data ? <VirtualizedList
                data={data.images}
                contentContainerStyle={[styles.justifyContent]}
                renderItem={renderWidget}
                keyExtractor={item => uuid.v4()}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    justifyContent: {
        flex: 1,
        justifyContent: 'space-between'
    },
    img: {
        width: 50,
        height: 50
    }
});