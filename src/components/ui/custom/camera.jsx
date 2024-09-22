import React from 'react';
import { View, StyleSheet, VirtualizedList } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import useErrors from '../../../hooks/useErrors';
import { getItem, getItemCount } from '../../../utils';
import OverlayContainer from './overlayContainer';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import CustomTouchableOpacity from '../../helpers/touchableOpacity';
import { onSelectImage } from '../../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';

const CameraWidget = (config) => {
  const { data, nestedComponents } = config;

  const navigation = useNavigation();
  const route = useRoute();
  const { newError } = useErrors();

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
        newError('Oops...Something went wrong');
      } else {
        const source = {
          uri: response.assets[0].uri,
          fileName: response.assets[0].fileName,
          type: response.assets[0].type,
          fileSize: response.assets[0].fileSize,
        };
        uploadFile(source);
      }
    });
  };

  const uploadFile = async (selectedImage) => {
    try {
      // Read the file as base64
      const filePath =
        Platform.OS === 'android' ? selectedImage.uri : selectedImage.uri.replace('file://', '');
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

      onSelectImage(data.actions, message, navigation, route);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const renderWidget = ({ item }) => (
    <OverlayContainer
      front={
        <CustomTouchableOpacity
          style={styles.pressable}
          data={data}
          onPress={selectImageHandler}
        ></CustomTouchableOpacity>
      }
      behind={<config.factory props={item} />}
    />
  );

  return (
    <View style={styles.container}>
      <VirtualizedList
        style={styles.settingOption}
        data={nestedComponents}
        contentContainerStyle={[styles.content]}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
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
    width: '90%',
  },
  pressable: {
    width: '20%',
    height: '100%',
    // backgroundColor: 'red', // Semi-transparent overlay
  },
});

export default CameraWidget;
