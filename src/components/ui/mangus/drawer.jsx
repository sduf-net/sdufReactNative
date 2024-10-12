import React, { useEffect, createRef, memo } from 'react';
import { VirtualizedList } from 'react-native';
import { Drawer } from 'react-native-magnus';
import { getItem, getItemCount } from '../../../utils';
import { shallowEqual, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import ComponentFactory from '../../factory';

const DrawerWidget = () => {
  const isFocused = useIsFocused();
  const drawerRef = createRef();
  const drawer = useSelector((state) => state.drawer, shallowEqual);
  const showDarwer = useSelector((state) => state.drawer.showDarwer);

  const renderWidget = ({ item }) => <ComponentFactory props={item} />;

  useEffect(() => {
    if (!drawer || !drawerRef || !drawerRef.current) return;

    console.log(drawerRef)

    if (showDarwer === -1) {
      drawerRef.current.close();
    } else if(showDarwer > 0) {
      drawerRef.current.open();
    }
  }, [showDarwer]);

  if (!isFocused) return;

  return (
    <Drawer ref={drawerRef}>
      <VirtualizedList
        data={drawer.nestedComponents}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </Drawer>
  );
};

export default memo(DrawerWidget);
