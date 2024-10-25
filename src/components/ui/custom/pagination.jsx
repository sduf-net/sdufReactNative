import React, { memo, useEffect, useState } from 'react';
import { View, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import { PAGINATION } from '../../../constants/actionName';
import { useNavigation, useRoute } from '@react-navigation/native';
import { handleEventAction } from '../../../event_handler';

function PaginationWidget({ data, id }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const onViewableItemsChanged = ({ item }) => {
    if (item.id === id) {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (!loading) return;

    handleEventAction(
      {
        type: PAGINATION,
        url: data.callbackUrl,
        id: id,
      },
      navigation,
      route
    );

    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [loading]);

  useEffect(() => {
    DeviceEventEmitter.addListener('onViewableItemsChanged', onViewableItemsChanged);
  }, []);

  return (
    <View style={{ flex: 1, height: 150, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

export default memo(PaginationWidget);
