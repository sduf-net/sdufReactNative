import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

export default function Label2({ data }) {
  return (
    <View>
      {data ? (
        <>
          <Text style={[styles.label]}>{data.text}</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
});
