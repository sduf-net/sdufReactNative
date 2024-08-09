import React, { useState } from 'react';
import { Pressable, Image, StyleSheet, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import CustomTouchableOpacity from '../helpers/touchableOpacity';

export default function ImageWidget({ data }) {
  const [visible, setIsVisible] = useState(false);

  return (
    <CustomTouchableOpacity data={data}>
      <View>
        {data && (
          <Pressable
            onPress={() => {
              setIsVisible(true);
            }}
          >
            <Image resizeMode={'cover'} style={[styles.image]} source={{ uri: data.src }} />
          </Pressable>
        )}
        <ImageView
          images={[{ id: 1, uri: data.src }]}
          imageIndex={0}
          visible={visible}
          keyExtractor={(item) => item.id}
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
    </CustomTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
});
