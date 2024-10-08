import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function LineWidget({ data }) {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
