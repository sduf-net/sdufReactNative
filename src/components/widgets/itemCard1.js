import React from 'react'
import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import uuid from 'react-native-uuid';
import { handleEventAction } from '../../event_handler';
import Label1 from './label1';
import Label2 from './label2';

export default function ItemCard1({ data, navigation }) {
    const onPress = (actions) => {
        if (actions.click) {
            handleEventAction(actions.click, navigation);
        }
    }
    const renderLabel = ({ item }) => (
        <Label2 data={{ text: item.text }} />
    );
    const renderCharacteristics = ({ item }) => (
        <View>
            <Label1 daya={{ text: item.text, src: item.src }} />
        </View>
    );
    return (
        <TouchableOpacity onPress={() => onPress(data.actions)}>
            <View>
                {data ?
                    <>
                        <Image
                            resizeMode={'cover'}
                            style={[styles.image, { width: '100%', height: 200 }]}
                            source={{ uri: data.src }}
                        />
                        <Text style={[styles.title]}>{data.title}</Text>
                        <View style={[styles.prices_list]}>
                            <Text style={[styles.price_usd]}>{data.price.usd}$</Text>
                            <Text style={[styles.price]}>{data.price.uah}грн</Text>
                        </View>

                        <FlatList
                            data={data.labels}
                            numColumns={2}
                            renderItem={renderLabel}
                            listKey={uuid.v4()}
                            keyExtractor={(item) => item.id}
                        />
                        <FlatList
                            data={data.characteristics}
                            numColumns={2}
                            renderItem={renderCharacteristics}
                            listKey={uuid.v4()}
                            keyExtractor={(item) => item.id}
                        />
                    </>
                    : null}
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        maxHeight: 300
    },
    title: {
        fontSize: 20
    },
    prices_list: {
        flex: 1,
        flexDirection: 'row'
    },
    price: {
        fontSize: 22
    },
    price_usd: {
        color: 'green',
        fontWeight: 'bold',
        paddingRight: 10,
        fontSize: 20
    }
});