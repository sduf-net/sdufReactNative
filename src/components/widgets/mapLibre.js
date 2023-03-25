// import React, { memo } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import MapLibreGL from '@maplibre/maplibre-react-native';

// // Will be null for most users (only Mapbox authenticates this way).
// // Required on Android. See Android installation notes.
// MapLibreGL.setAccessToken(null);

// const coordinates = [
//     [-73.99155, 40.73581],
//     [-73.99155, 40.73681],
//   ]
//   const AnnotationContent = ({title}) => (
//     <View style={styles.touchableContainer}>
//       <Text>{title}</Text>
//       <TouchableOpacity style={styles.touchable}>
//         <Text style={styles.touchableText}>Btn</Text>
//       </TouchableOpacity>
//     </View>
//   );
// function mapLibre({ data, navigation }) {
//     return (
//         <View style={styles.page}>
//             {/* <MapLibreGL.MarkerView
//                 coordinate={[-73.970895, 40.723279]}
//                 style={styles.map}
//                 logoEnabled={false}
//                 styleURL="https://demotiles.maplibre.org/style.json"
//             /> */}
//             <MapLibreGL.MapView
//                 style={styles.map}>
//                 <MapLibreGL.Camera
//                     zoomLevel={5}
//                     centerCoordinate={coordinates[0]}
//                 />

//                 <MapLibreGL.PointAnnotation
//                     coordinate={coordinates[1]}
//                     id="pt-ann">
//                     <AnnotationContent title={'this is a point annotation'} />
//                 </MapLibreGL.PointAnnotation>

//                 <MapLibreGL.MarkerView coordinate={coordinates[0]}>
//                     <AnnotationContent title={'this is a marker view'} />
//                 </MapLibreGL.MarkerView>
//             </MapLibreGL.MapView>
//         </View>
//     );
// }

// export default memo(mapLibre);

// const styles = StyleSheet.create({
//     page: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     map: {
//         flex: 1,
//         alignSelf: 'stretch',
//         width: 300,
//         height: 300
//     },
//     touchableContainer: {borderColor: 'black', borderWidth: 1.0, width: 60},
//     touchable: {
//       backgroundColor: 'blue',
//       width: 40,
//       height: 40,
//       borderRadius: 20,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     touchableText: {
//       color: 'white',
//       fontWeight: 'bold',
//     },
// });