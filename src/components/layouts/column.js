import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

export default function Column(config) {
  const renderWidget = ({ item }) => (
    <View style={[styles.container]}>
      <config.factory props={item} />
    </View>
  );

  return (
    <View>
      <FlatList
        // style={[styles.item]}
        data={config.nestedComponents}
        numColumns={config.data.columns ?? 2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const width = new Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: width / 2 - 2,
  },
});
