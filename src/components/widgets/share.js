import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Share, View, VirtualizedList } from 'react-native';
import { onShare } from '../../event_handler';
import { getItem, getItemCount } from '../../utils';

const ShareWidget = ({ data, nestedComponents }) => {
    const route = useRoute();
    const navigation = useNavigation();

    const onShareHandler = async () => {
        try {
            const result = await Share.share({ message: data?.message || "", url: data?.url || "", });

            if (data.actions) {
                onShare(data.actions, result, navigation, route);
            }
        } catch (error) {
            console.warn(error.message)
        }
    };

    const renderWidget = ({ item }) => (
        <OverlayContainer
            front={
                <CustomTouchableOpacity
                    data={data}
                    onPress={onShareHandler}
                ></CustomTouchableOpacity>
            }
            behind={<config.factory props={item} />}
        />
    );

    return (
        <View>
            <VirtualizedList
                data={nestedComponents}
                renderItem={renderWidget}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
        </View>
    );
};

export default ShareWidget;