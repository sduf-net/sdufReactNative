import _ from 'lodash';
import React, { memo } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import uuid from 'react-native-uuid';
import { onLongPress, onPress } from '../../event_handler';

function ItemHeader2({ data, navigation, route }) {
    const renderPrice = ({ item }) => (
        <Text style={[styles.price_usd]}>{item} {data.price[item]}</Text>
    );

    return (
        <TouchableOpacity
            activeOpacity={_.isEmpty(data.actions) ? 1 : 0.5}
            onPress={() => onPress(data.actions, navigation, route)}
            onLongPress={() => onLongPress(data.actions, navigation, route)}
        >
            <View>
                {data ?
                    <>
                        <Text style={[styles.title]}>{data.title}</Text>
                        <Text style={[styles.sub_title]}>{data.sub_title}</Text>

                        {data.price ? <View style={[styles.prices_list]}>
                            <FlatList
                                data={Object.keys(data.price)}
                                numColumns={5}
                                renderItem={renderPrice}
                                listKey={uuid.v4()}
                                keyExtractor={(item) => item.id}
                            />
                        </View> : null}
                    </>
                    : null}
            </View>
        </TouchableOpacity>
    );
}

export default memo(ItemHeader2);

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        paddingBottom: 5
    },
    sub_title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    prices_list: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 16,
        paddingBottom: 5
    },
    price_usd: {
        color: 'green',
        fontWeight: 'bold',
        paddingRight: 10
    }
});