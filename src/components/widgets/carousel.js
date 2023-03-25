import * as React from 'react';
import { memo } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function CarouselReanimated({ data, navigation }) {
    const width = Dimensions.get('window').width;
    const ref = React.useRef(null);

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                ref={ref}
                width={width}
                height={width / 2}
                // autoPlay={true}
                data={data.images}
                // scrollAnimationDuration={5000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                resizeMode={'cover'}
                                style={[styles.image]}
                                source={{ uri: item.src }}
                            />
                        </View>
                    )
                }}
            />
            <Button
                title="Press Me"
                onPress={() => {
                    ref.current?.scrollTo({ count: -1, animated: true });
                }}
            >
                prev
            </Button>
            <Button
                title="Press Me"
                onPress={() => {
                    ref.current?.scrollTo({ count: 1, animated: true });
                }}
            >
                next
            </Button>
        </View>
    );
}

export default memo(CarouselReanimated);

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 400
    }
});