import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapLibreGL, { UserLocation } from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import { styleURL } from "@env";
import { handleEventAction } from '../../event_handler';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setMarkers } from '../../redux/map';
MapLibreGL.setAccessToken(null);

export default function MapWidget(config) {
    const { height: windowHeight, width: windowWidth } = Dimensions.get("window");
    const { data, navigation } = config;
    const widgetStyles = data.styles ?? {};

    const mapRef = useRef(null);
    const cameraRef = useRef(null);
    const dispatch = useDispatch();

    const [visibleRegion, setVisibleRegion] = useState(null);
    const [centerCoordinate, setCenterCoordinate] = useState([0, 0]);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const markers = useSelector(state => state.map.markers, shallowEqual);
    const [userLocation, setUserLocation] = useState(null);

    const onRegionDidChange = async () => {
        if (mapRef.current) {
            const region = await mapRef.current.getVisibleBounds();
            setVisibleRegion(region);

            if (data?.actions?.track_position) {
                handleEventAction({ ...data.actions.track_position, region: region }, navigation);
            }
        }
    };

    const centerOnUserLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const userLocationData = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                    };
                    setCenterCoordinate([userLocationData.longitude, userLocationData.latitude]);
                    setUserLocation(userLocationData);
                    cameraRef.current.setCamera({
                        centerCoordinate: [userLocationData.longitude, userLocationData.latitude],
                        zoomLevel: 12,
                        duration: 1000,
                    });
                },
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
    };

    const currentLocation = () => {
        if (data?.center) {
            setCenterCoordinate([data.center.lng, data.center.lat]);
        } else {
            Geolocation.getCurrentPosition(
                (position) => {
                    const userLocationData = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                    };
                    setCenterCoordinate([userLocationData.longitude, userLocationData.latitude]);
                    setUserLocation(userLocationData);
                    centerOnUserLocation();
                },
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        }
    };

    const onMarkerSelected = (marker) => {
        if (marker.click) {
            handleEventAction(marker.click, navigation);
        }
    };

    const handleMapPress = (event) => {
        if (drawing) {
            const { geometry } = event;
            setPolygonCoordinates([...polygonCoordinates, geometry.coordinates]);
        }
    };

    const toggleDrawing = () => {
        setDrawing(!drawing);
        if (drawing) {
            setPolygonCoordinates([]);
        }
    };

    const removeCoordinate = (index) => {
        setPolygonCoordinates(polygonCoordinates.filter((_, i) => i !== index));
    };

    useEffect(() => {
        currentLocation();

        if (data?.markers && data.markers.length) {
            dispatch(setMarkers(data.markers));
        }
    }, []);

    return (
        <View style={[{ flex: 1, width: '100%', height: windowHeight }, widgetStyles]}>
            {data ? (
                <View style={{ flex: 1 }}>
                    <MapLibreGL.MapView
                        style={{ flex: 1, alignSelf: 'stretch' }}
                        logoEnabled={false}
                        styleURL={styleURL}
                        onRegionDidChange={onRegionDidChange}
                        onPress={handleMapPress}
                        ref={mapRef}
                    >
                        {centerCoordinate ? (
                            <MapLibreGL.Camera
                                ref={cameraRef}
                                zoomLevel={12}
                                centerCoordinate={centerCoordinate}
                            />
                        ) : null}

                        {userLocation ? (
                            <UserLocation
                                animated={true}
                                showsUserHeadingIndicator={true}
                                onUpdate={(location) => setUserLocation(location)}
                            />
                        ) : null}

                        {markers
                            ? markers.map((marker) => (
                                <MapLibreGL.PointAnnotation
                                    id={marker.name}
                                    key={marker.name}
                                    coordinate={[marker.position.lng, marker.position.lat]}
                                    onSelected={() => onMarkerSelected(marker)}
                                >
                                    {marker.type === 'text' ? <Text style={styles.textMarker}>{marker.text}</Text> : null}
                                </MapLibreGL.PointAnnotation>
                            ))
                            : null}

                        {polygonCoordinates.length > 0 ? (
                            <>
                                {polygonCoordinates.map((coordinate, index) => (
                                    <MapLibreGL.PointAnnotation
                                        id={`point-${index}`}
                                        key={`point-${index}`}
                                        coordinate={coordinate}
                                        onSelected={() => removeCoordinate(index)}
                                    >
                                        <View style={styles.pointAnnotation} />
                                    </MapLibreGL.PointAnnotation>
                                ))}
                                {polygonCoordinates.length > 2 ? (
                                    <MapLibreGL.ShapeSource id="polygonSource" shape={{
                                        type: 'Feature',
                                        geometry: {
                                            type: 'Polygon',
                                            coordinates: [[...polygonCoordinates, polygonCoordinates[0]]],
                                        },
                                    }}>
                                        <MapLibreGL.FillLayer
                                            id="polygonFill"
                                            style={{ fillColor: 'rgba(255, 0, 0, 0.5)' }}
                                        />
                                        <MapLibreGL.LineLayer
                                            id="polygonLine"
                                            style={{ lineColor: 'red', lineWidth: 2 }}
                                        />
                                    </MapLibreGL.ShapeSource>
                                ) : null}
                            </>
                        ) : null}
                    </MapLibreGL.MapView>
                    {userLocation && userLocation.latitude && userLocation.longitude ? (
                        <View style={styles.locationContainer}>
                            <Text style={styles.locationText}>
                                Latitude: {userLocation.latitude.toFixed(6)}, Longitude: {userLocation.longitude.toFixed(6)}
                            </Text>
                        </View>
                    ) : null}
                    <TouchableOpacity style={[styles.button, { left: windowWidth / 2 - 50 }]} onPress={toggleDrawing}>
                        <Text style={styles.buttonText}>{drawing ? 'Stop Drawing' : 'Start Drawing'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.locationButton} onPress={centerOnUserLocation}>
                        <Text style={styles.buttonText}>My Location</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    textMarker: {
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5
    },
    locationContainer: {
        position: 'absolute',
        bottom: 80, // Adjusted to avoid overlap with the button
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    locationText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        width: 100,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    locationButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        width: 100,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pointAnnotation: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 2,
    }
});
