import React, { useCallback, useState } from 'react';
import { memo } from 'react';
import ImageView from "react-native-image-viewing";
import { Pressable, Dimensions, Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

// TODO onClick open gallery
function CarouselReanimated({ data, navigation }) {
    const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
    const [visible, setIsVisible] = useState(false);
    const imagesArray = useCallback((images) => {
        return images.map(element => ({id: uuid.v4(), uri: element.src}));
    });
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data.images}
                style={{ flex: 1 }}
                renderItem={({ item }) => {
                    return <Pressable onPress={() => { setIsVisible(true) }}>
                        <Image source={{ uri: item.src }} style={{ width: windowWidth, height: 300 }} />
                    </Pressable>;
                }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <ImageView
                images={imagesArray(data.images)}
                imageIndex={0}
                visible={visible}
                keyExtractor={(item) => item.id}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
    );
}

export default memo(CarouselReanimated);