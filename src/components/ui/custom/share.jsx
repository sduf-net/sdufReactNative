import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Share, StyleSheet, View, VirtualizedList } from 'react-native';
import { onShare } from '../../../event_handler';
import { getItem, getItemCount } from '../../../utils';
import OverlayContainer from './overlayContainer';
import CustomTouchableOpacity from '../../helpers/touchableOpacity';

const ShareWidget = (config) => {
  const { data, nestedComponents } = config;

  const route = useRoute();
  const navigation = useNavigation();

  const onShareHandler = async () => {
    try {
      const result = await Share.share({ message: data?.message || '', url: data?.url || '' });

      if (data.actions) {
        onShare(data.actions, result, navigation, route);
      }
    } catch (error) {
      console.warn(error.message);
    }
  };

  const renderWidget = ({ item }) => (
    <OverlayContainer
      front={
        <CustomTouchableOpacity
          data={data}
          style={styles.pressable}
          onPress={onShareHandler}
        ></CustomTouchableOpacity>
      }
      behind={<config.factory props={item} />}
    />
  );

  return (
    <View>
      <VirtualizedList
        data={nestedComponents}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    height: '100%',
    //   backgroundColor: 'red', // Semi-transparent overlay
  },
});

export default ShareWidget;
