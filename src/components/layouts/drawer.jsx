import React, { createRef, memo, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View, VirtualizedList } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectDrawer } from '../../redux/screens';
import { Drawer, Text } from 'react-native-magnus';
import { getItem, getItemCount } from '../../utils';

function CustomDrawer(config) {
  const drawer = createRef();
  const drawerDataFromScreen = useSelector((state) => selectDrawer(state), shallowEqual);
  const drawerDataFromApi = useSelector((state) => state.drawer, shallowEqual);
  const showDrawer = useSelector((state) => state.drawer.showDrawer);
  const [nestedComponents, setNestedComponents] = useState([]);

  useEffect(() => {
    if (drawerDataFromApi.nestedComponents.length) {
      setNestedComponents(drawerDataFromApi.nestedComponents);
    } else {
      if (!drawerDataFromScreen?.nestedComponents) return;
      setNestedComponents(drawerDataFromScreen.nestedComponents);
    }
  }, [drawerDataFromScreen, drawerDataFromApi]);

  useEffect(() => {
    if (showDrawer === true) drawer.current.open();
    if (showDrawer === false) drawer.current.close();
  }, [showDrawer]);

  const renderWidget = ({ item }) => <config.factory props={item} />;
  console.log('drawerDataFromScreen', drawerDataFromScreen)
  console.log('drawerDataFromApi', drawerDataFromApi)

  return (
    <Drawer ref={drawer} {...config.data?.props}>
      <VirtualizedList
        data={nestedComponents}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </Drawer>
  );
}

export default memo(CustomDrawer);