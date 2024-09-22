import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

export default function Label1({ data }) {
  return (
    <View style={[styles.container]}>
      {data ? (
        <>
          <Image style={[styles.image]} source={{ uri: data.src }} />
          <Text>{data.text}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  image: {
    width: 20,
    height: 30,
    resizeMode: 'contain',
    paddingRight: 5,
  },
});
