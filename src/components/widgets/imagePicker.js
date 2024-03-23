import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePickerWidget = () => {
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
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = { uri: response.uri };
                setSelectedImage(source);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Button title="Select Image" onPress={selectImageHandler} />
            {selectedImage && (
                <Image source={selectedImage} style={styles.image} resizeMode="cover" />
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
        marginTop: 20,
    },
});

export default ImagePickerWidget;
