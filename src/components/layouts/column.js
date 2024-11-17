import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

export default function Column(config) {
  const renderWidget = ({ item }) => (
    <View>
      <config.factory props={item} />
    </View>
  );

  return (
    <View>
      <FlatList
        // style={[styles.container]}
        data={config.nestedComponents}
        numColumns={config.data.columns ?? 2}
        columnWrapperStyle={{ justifyContent: 'space-start', marginBottom: 8 }}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
