import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native'; // Import Button
import MapLibreGL, { UserLocation } from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import { styleURL } from "@env";
import { handleEventAction } from '../../event_handler';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setMarkers } from '../../redux/map';
MapLibreGL.setAccessToken(null);

export default function MapWidget(config) {
    const { height: windowHeight } = Dimensions.get("window");
    const { data, navigation } = config;
    const widgetStyles = data.styles ?? {};

    const mapRef = useRef(null);
    const dispatch = useDispatch();

    const [visibleRegion, setVisibleRegion] = useState(null);
    const [centerCoordinate, setCenterCoordinate] = useState([0, 0]);
    const markers = useSelector(state => state.map.markers, shallowEqual);
    const [userLocation, setUserLocation] = useState(null);

    const onRegionDidChange = async () => {
        if (mapRef.current) {
            const region = await mapRef.current.getVisibleBounds();
            setVisibleRegion(region);

            if (data?.actions?.track_position) {
                handleEventAction({ ...data.actions.track_position, region: region  }, navigation);
            }
        }
    };

    const centerOnUserLocation = () => {
        if (userLocation) {
            setCenterCoordinate([userLocation.longitude, userLocation.latitude]);
            mapRef.current.flyTo([userLocation.longitude, userLocation.latitude], 12);
        }
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
                        ref={mapRef}
                    >
                        {centerCoordinate ? (
                            <MapLibreGL.Camera
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
                    </MapLibreGL.MapView>
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
    }
});