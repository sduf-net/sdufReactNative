import React from 'react'
import { View, StyleSheet, VirtualizedList, Image } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { getItem, getItemCount } from '../../utils';
import CustomTouchableOpacity from '../helpers/touchableOpacity';

export default function SwipeableLayout(config) {
    const renderWidget = ({ item }) => (
        <config.factory props={item} />
    );

    const renderRectButton = (actions) => (
        <View style={styles.rightActionsContainer}>
            <VirtualizedList
                data={actions}
                contentContainerStyle={[]}
                renderItem={({ item }) => {
                    return <CustomTouchableOpacity data={item}>
                        <View style={[styles.rightActionButton, item?.styles]} >
                            <Image
                                resizeMode={'cover'}
                                style={[styles.image]}
                                source={{ uri: item.src }}
                            />
                        </View>

                    </CustomTouchableOpacity>
                }}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal={true}
            />
        </View>
    );

    const renderList = (list) => (
        <VirtualizedList
            data={list}
            contentContainerStyle={[styles.rightActionsContainer]}
            renderItem={renderWidget}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
            horizontal={true}
        />
    );

    return (
        <View>
            <Swipeable
                renderRightActions={() =>
                    renderRectButton(config.data.rightActions)
                }
                renderLeftActions={() =>
                    renderRectButton(config.data.leftActions)
                }
            >
                {
                    config.nestedComponents &&
                    renderList(config.nestedComponents)
                }
            </Swipeable>
        </View>
    );
}


const styles = StyleSheet.create({
    rightActionsContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 16
    },
    rightActionButton: {
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 60,
        height: '100%'
    },
    image: {
        width: 50,
        height: 50
    }
});