import React, { memo } from 'react'
import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import uuid from 'react-native-uuid';
import Label3 from './label3';
import { handleEventAction } from '../../event_handler';

function ItemCard2({ data, id, navigation }) {
    const onPress = (actions) => {
        if (actions?.click) {
            handleEventAction(actions.click, navigation);
        }
    }
    const renderLabel = ({ item }) => (
        <Label3 data={{ text: item.text }} />
    );
    const renderParams = ({ item }) => (
        <View>
            <Text>• {item.text} </Text>
        </View>
    );
    return (
        <View>
            {data ?
                <>
                    <TouchableOpacity onPress={() => onPress(data.actions)}>
                        <Image
                            resizeMode={'cover'}
                            style={[styles.image, { width: '100%', height: 200 }]}
                            source={{ uri: data.src }}
                        />
                        <Text style={[styles.title]}>{id}</Text>
                        <Text style={[styles.title]}>{data.title}</Text>
                        <Text style={[styles.sub_title]}>{data.sub_title}</Text>

                        <View style={[styles.prices_list]}>
                            <Text style={[styles.price_usd]}>USD {data.price.usd}</Text>
                            <Text style={[styles.price]}>UAH {data.price.uah}</Text>
                        </View>

                        <FlatList
                            data={data.labels}
                            numColumns={5}
                            renderItem={renderLabel}
                            listKey={uuid.v4()}
                            keyExtractor={(item) => item.id}
                        />
                        <Text>{data.date}</Text>
                        <FlatList
                            data={data.params}
                            numColumns={5}
                            renderItem={renderParams}
                            listKey={uuid.v4()}
                            keyExtractor={(item) => item.id}
                        />
                    </TouchableOpacity>

                </>
                : null}
        </View>
    );
}

export default memo(ItemCard2);

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    sub_title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    prices_list: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 16
    },
    price_usd: {
        color: 'green',
        fontWeight: 'bold',
        paddingRight: 10
    }
});