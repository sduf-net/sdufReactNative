import React, { createRef, memo, useEffect, useState } from 'react';
import { VirtualizedList } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { selectDrawer } from '../../redux/screens';
import { Drawer, Text } from 'react-native-magnus';
import { getItem, getItemCount } from '../../utils';

function CustomDrawer(config) {
  // const drawer = createRef();
  // const showDrawer = useSelector((state) => state.drawer.showDrawer);
  // console.log("showDrawer", showDrawer)

  // const drawerDataFromScreen = useSelector((state) => selectDrawer(state), shallowEqual);
  // const drawerDataFromApi = useSelector((state) => state.drawer, shallowEqual);
  // const [nestedComponents, setNestedComponents] = useState([]);

  // useEffect(() => {
  //   if (drawerDataFromApi.nestedComponents.length) {
  //     setNestedComponents(drawerDataFromApi.nestedComponents);
  //   } else {
  //     if (!drawerDataFromScreen?.nestedComponents) return;
  //     setNestedComponents(drawerDataFromScreen.nestedComponents);
  //   }
  // }, [drawerDataFromScreen, drawerDataFromApi]);

  // useEffect(() => {
  //   if (showDrawer > 0) drawer.current.open();
  //   if (showDrawer === false) drawer.current.close();
  // }, [showDrawer]);

  // const renderWidget = ({ item }) => <config.factory props={item} />;
  // console.log('drawerDataFromScreen', drawerDataFromScreen)
  // console.log('drawerDataFromApi', drawerDataFromApi)

  const drawerRef = React.createRef();

  return (
    <>
    <Text>skdjfhskdjfhskjdhfksjhdf</Text>
      <Drawer ref={drawerRef} />

      <Button
        onPress={() => {
          if (drawerRef.current) {
            drawerRef.current.open();
          }
        }}
      >
        Open Drawer
      </Button>
    </>
  );
}

export default memo(CustomDrawer);