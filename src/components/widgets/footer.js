import React, { memo } from 'react';
import { Image, StyleSheet, View, VirtualizedList, Text } from 'react-native';
import uuid from 'react-native-uuid';
import CustomTouchableOpacity from '../helpers/touchableOpacity';

function Footer({ data }) {
  const renderWidget = ({ item }) => (
    <CustomTouchableOpacity data={item} style={[styles.tile]}>
      <Image source={{ uri: item.src }} style={[styles.img]} />
      {item.label && <Text>{item.label}</Text>}
    </CustomTouchableOpacity>
  );
  const getItemCount = (item) => item.length || 0;
  const getItem = (data, index) => {
    return data[index];
  };

  return (
    <View>
      {data ? (
        <VirtualizedList
          data={data.images}
          contentContainerStyle={[{ backgroundColor: data?.style?.background }]}
          renderItem={renderWidget}
          keyExtractor={(item) => uuid.v4()}
          getItemCount={getItemCount}
          getItem={getItem}
          horizontal
        />
      ) : null}
    </View>
  );
}

export default memo(Footer);

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 60,
  },
  img: {
    width: 27,
    height: 27,
    marginBottom: 3,
  },
});
