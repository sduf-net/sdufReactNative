import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const WebViewWidget = ({ data }) => {
  return (
    <View style={styles.container}>
      {data ? (
        <WebView source={{ uri: data.url }} originWhitelist={['*']} style={styles.map} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default WebViewWidget;
