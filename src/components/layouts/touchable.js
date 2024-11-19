import React from 'react';
import { StyleSheet, VirtualizedList } from 'react-native';
import { getItem, getItemCount } from '../../utils';
import CustomTouchableOpacity from '../helpers/touchableOpacity';
import uuid from 'react-native-uuid';

export default function Touchable(config) {
  const data = config.data;
  const renderWidget = ({ item }) => <config.factory props={item} />;

  return (
    <CustomTouchableOpacity data={data}>
      <VirtualizedList
        data={config.nestedComponents}
        contentContainerStyle={[styles.justifyContent]}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id || uuid.v4()}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </CustomTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3%',
  },
});
