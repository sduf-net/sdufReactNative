import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import { styleURL } from '../../utils/constants';
import { handleEventAction } from '../../event_handler';
MapLibreGL.setAccessToken(null);

export default function MapWidget(config) {
    const { data, navigation } = config;

    const mapRef = useRef(null);
    const [visibleRegion, setVisibleRegion] = useState(null);
    const [centerCoordinate, setCenterCoordinate] = useState([0, 0]);
    const [markers, setMarkers] = useState(null);

    const onRegionDidChange = async () => {
        if (mapRef.current) {
            const region = await mapRef.current.getVisibleBounds();
            console.log(region);
            setVisibleRegion(region);

            if(data?.actions?.track_position){
                handleEventAction({...data.actions.track_position, params: {region}}, navigation);
            }
        }
    };

    const currentLocation = () => {
        if (data?.center) {
            setCenterCoordinate([data.center.lng, data.center.lat]);
        } else {
            Geolocation.getCurrentPosition(
                //Will give you the current location
                (position) => {
                    setCenterCoordinate([position.coords.longitude, position.coords.latitude]);

                }, (error) => alert(error.message), {
                enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
            }
            );
        }
    }

    const onMarkerSelected = (marker) => {
        // Handle the marker click event here
        console.log('Marker clicked:', marker);
        if (marker.click) {
            handleEventAction(marker.click, navigation);
        }
        // You can perform any desired action based on the marker click.
    };

    useEffect(() => {
        currentLocation();

        if (data?.markers && data.markers.length) {
            setMarkers(data.markers);
        }
    }, [])

    return (
        <View style={{ flex: 1, width: 600, height: 600 }}>
            {data ? <MapLibreGL.MapView
                style={{ flex: 1, alignSelf: 'stretch' }}
                logoEnabled={false}
                styleURL={styleURL}
                onRegionDidChange={onRegionDidChange}
                ref={mapRef}>

                {centerCoordinate ? <MapLibreGL.Camera
                    zoomLevel={12}
                    centerCoordinate={centerCoordinate}
                /> : null}

                {markers ? markers.map((marker) => {
                    return <MapLibreGL.PointAnnotation
                        id={marker.name}
                        key={marker.name}
                        coordinate={[marker.position.lng, marker.position.lat]}
                        onSelected={() => onMarkerSelected(marker)}
                    >
                        {/* <Text>s;ldkfs;lfklskdf;lskd;flksl;dfk</Text> */}
                    </MapLibreGL.PointAnnotation>
                }) : null}
            </MapLibreGL.MapView> : null}
        </View >
    );
};
