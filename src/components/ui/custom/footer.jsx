import React, { memo } from 'react';
import { Image, StyleSheet, View, VirtualizedList } from 'react-native';
import uuid from 'react-native-uuid';
import CustomTouchableOpacity from '../../helpers/touchableOpacity';

function Footer({ data }) {
  const renderWidget = ({ item }) => (
    <CustomTouchableOpacity data={item}>
      <Image source={{ uri: item.src }} style={[styles.img]} />
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
          contentContainerStyle={[
            styles.content_container,
            styles.bgColor,
            { backgroundColor: data?.style?.background },
          ]}
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
  content_container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  bgColor: {
    backgroundColor: 'white',
  },
});
