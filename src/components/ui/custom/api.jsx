import React, { memo, useEffect, useState } from 'react';
import { View, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import { handleEventAction } from '../../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';

function ApiWidget({ data, id }) {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  // Do not request and render component until it visible
  // note: we can add event handler here
  const onViewableItemsChanged = ({ item }) => {
    if (item.id === id) {
      setLoading(true);
    }
  };

  const onRefresh = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (!loading) return;

    handleEventAction(
      {
        id,
        type: 'request_widget',
        url: data.callbackUrl,
        params: data,
      },
      navigation,
      route
    );

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  useEffect(() => {
    DeviceEventEmitter.addListener('onRefresh', onRefresh);
    DeviceEventEmitter.addListener('onViewableItemsChanged', onViewableItemsChanged);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

export default memo(ApiWidget);
