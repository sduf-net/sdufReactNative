import * as React from 'react';
import { memo } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
// TODO onClick open gallery
function CarouselReanimated({ data, navigation }) {
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data.images}
                style={{ flex: 1 }}
                renderItem={({ item }) => {
                    return <View>
                        <Image source={{ uri: item.src }} style={{ width: windowWidth, height: 300 }} />
                    </View>;
                }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default memo(CarouselReanimated);