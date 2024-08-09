import React from 'react';
import { Dimensions, StyleSheet, View, VirtualizedList } from 'react-native';
import { getItem, getItemCount } from '../../utils';

export default function Center(config) {
  const renderWidget = ({ item }) => <config.factory props={item} />;
  const widgetStyles = config.styles ?? {};

  return (
    <View style={[styles.container, widgetStyles]}>
      <VirtualizedList
        style={styles.settingOption}
        data={config.nestedComponents}
        contentContainerStyle={[styles.content]}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
}

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.9,
  },
  settingOption: {
    width: '90%',
  },
});
