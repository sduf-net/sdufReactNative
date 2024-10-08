import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const MapLibreWeb = () => {
  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      <style>
        body,
        html,
        #map {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      </style>
      <script src="https://unpkg.com/maplibre-gl/dist/maplibre-gl.js"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
      var map = new maplibregl.Map({
        container: 'map', // container id
        style: 'https://api.maptiler.com/maps/streets/style.json?key=tnZNmNpDX9FyfLImwQud', // style URL
        center: [0, 0], // starting position [lng, lat]
        zoom: 1 // starting zoom
    });

        // Add a marker to the map
        new maplibregl.Marker()
          .setLngLat([-79.470715, 43.657116]) // Set the marker coordinates
          .addTo(map);
      </script>
    </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      <WebView source={{ html: htmlContent }} originWhitelist={['*']} style={styles.map} />
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

export default MapLibreWeb;
