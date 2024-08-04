import React, { useState } from 'react';
import { View, StyleSheet, VirtualizedList, Pressable, Text, Image, Button } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import useErrors from '../../hooks/useErrors';
import { getItem, getItemCount } from '../../utils';
import OverlayContainer from './OverlayContainer';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';

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
                console.log(response.assets[0])
                // You can also display the image using:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = {
                    uri: response.assets[0].uri,
                    fileName: response.assets[0].fileName,
                    type: response.assets[0].type,
                    fileSize: response.assets[0].fileSize
                };

                console.log(source)
                setSelectedImage(source);
            }
        });
    };



    // Function to upload the file
    const uploadFile = async () => {
        try {
            // Read the file as base64
            const filePath = Platform.OS === 'android' ? selectedImage.uri : selectedImage.uri.replace('file://', '');
            const base64data = await RNFS.readFile(filePath, 'base64');
            const fileData = Buffer.from(base64data, 'base64');

            // Construct a message object with file data and metadata
            const message = {
                type: 'file_upload',
                fileName: selectedImage.fileName,
                fileType: selectedImage.type,
                fileSize: selectedImage.fileSize,
                data: fileData.toString('base64'), // Ensure data is in base64 format
            };

            // Send the message as a string
            console.log(JSON.stringify(message));
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

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