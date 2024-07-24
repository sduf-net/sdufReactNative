import React, { useState } from 'react';
import { View, StyleSheet, VirtualizedList, Pressable, Text, Image, Button } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import useErrors from '../../hooks/useErrors';
import { getItem, getItemCount } from '../../utils';
import OverlayContainer from './OverlayContainer';

const CameraWidget = (config) => {
    const renderWidget = ({ item }) => (
        <OverlayContainer
            front={(
                <Pressable onPress={selectImageHandler} style={styles.pressable}></Pressable>
            )}
            behind={<config.factory props={item} />}
        />
    );

    const { newError } = useErrors();
    const [selectedImage, setSelectedImage] = useState(null);

    const selectImageHandler = () => {
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

    const uploadFile = async () => {
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
            {selectedImage && (
                <>
                    <Image source={selectedImage} style={styles.image} resizeMode="cover" />
                    <Button title="Upload File" onPress={uploadFile} />
                </>
            )}
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
    },
    settingOption: {
        width: '90%'
    },
    pressable: {
        width: '20%',
        height: '100%',
        // backgroundColor: 'red', // Semi-transparent overlay
    }
});

export default CameraWidget;