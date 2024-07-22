import React, { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import { launchImageLibrary} from 'react-native-image-picker';
import useErrors from '../../hooks/useErrors';

const ImageLibraryWidget = () => {
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

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                newError("Oops...Something went wrong");
            } else {
                const source = { uri: response.assets[0].uri };
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

export default ImageLibraryWidget;
