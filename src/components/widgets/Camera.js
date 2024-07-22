import React, { useState } from 'react';
import { View, StyleSheet, VirtualizedList, Pressable, Text } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import useErrors from '../../hooks/useErrors';
import { getItem, getItemCount } from '../../utils';
import OverlayContainer from './OverlayContainer';

const CameraWidget = (config) => {
    const renderWidget = ({ item }) => (
        <OverlayContainer front={(
            <Pressable onPress={selectImageHandler} style={styles.pressable}></Pressable>
        )}
            behind={<config.factory props={item} />}
        />
    );

    const { newError } = useErrors();
    const [selectedImage, setSelectedImage] = useState(null);

    const selectImageHandler = () => {
        console.log("DLDLDLDLDLDLDLDLDLDLDLDLD")
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                newError("Oops...Something went wrong");
            } else {
                console.log(response)
                // You can also display the image using:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = { uri: response.assets[0].uri };
                setSelectedImage(source);
            }
        });
    };

    console.log(config)

    return (
        <View style={styles.container}>
            <VirtualizedList
                style={styles.settingOption}
                data={config.nestedComponents}
                contentContainerStyle={[styles.content]}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
            {/* <Button title="Select Image" onPress={selectImageHandler} />
            {selectedImage && (
                <Image source={selectedImage} style={styles.image} resizeMode="cover" />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
    settingOption: {
        width: '90%'
    },
    itemContainer: {
        height: 100, // Adjust as needed
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd', // Background color for visibility
        zIndex: 0,
    },
    itemWrapper: {
        position: 'relative',
        marginVertical: 8,
    },
    pressable: {
        zIndex: 999,
        width: '100%',
        height: '100%',
        backgroundColor: 'red', // Semi-transparent overlay
    },
    itemContainer: {
        height: 100, // Adjust as needed
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red', // Background color for visibility,
        zIndex: 999,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'red', // Semi-transparent overlay
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    overlayText: {
        color: '#fff',
        fontSize: 16,
    },
    content: {
        paddingVertical: 10,
    },
});

export default CameraWidget;