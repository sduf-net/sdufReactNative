import React from 'react';
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import useErrors from '../../../hooks/useErrors';
import OverlayContainer from './overlayContainer';
import { getItem, getItemCount } from '../../../utils';
import { onSelectImage } from '../../../event_handler';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomTouchableOpacity from '../../helpers/touchableOpacity';
import { View, StyleSheet, VirtualizedList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ImageLibraryWidget = (config) => {
  const { data, nestedComponents } = config;

  const navigation = useNavigation();
  const route = useRoute();
  const { newError } = useErrors();

  const selectImageHandler = () => {
    const options = {
      title: 'Select Image',
      selectionLimit: 0, // Set to 0 to allow multiple selections
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.debug('User cancelled image picker');
      } else if (response.error) {
        newError('Oops...Something went wrong');
      } else {
        uploadFile(response);
      }
    });
  };

  const uploadFile = async (response) => {
    try {
      const messages = [];
      for (const element of response.assets) {
        const source = {
          uri: element.uri,
          fileName: element.fileName,
          type: element.type,
          fileSize: element.fileSize,
        };

        // Read the file as base64
        const filePath = Platform.OS === 'android' ? source.uri : source.uri.replace('file://', '');
        const base64data = await RNFS.readFile(filePath, 'base64');
        const fileData = Buffer.from(base64data, 'base64');

        // Construct a message object with file data and metadata
        const message = {
          type: 'file_upload',
          fileName: source.fileName,
          fileType: source.type,
          fileSize: source.fileSize,
          data: fileData.toString('base64'), // Ensure data is in base64 format
        };

        messages.push(message);
      }

      onSelectImage(data.actions, messages, navigation, route);
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

export default ImageLibraryWidget;
