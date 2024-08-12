import React, { memo, useEffect, useRef } from 'react';
import { DrawerLayoutAndroid, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { getItem, getItemCount } from '../../utils';
import { useSelector } from 'react-redux';

function CustomDrawer(config) {
  const { data, children, nestedComponents } = config;

  const drawer = useRef(null);
  const showDrawer = useSelector((state) => state.drawer.showDrawer);

  const drawerPosition = data?.drawer_position || 'left';

  const renderWidget = ({ item }) => <config.factory props={item} />;

  useEffect(() => {
    if(showDrawer === true) drawer.current.openDrawer();
    if(showDrawer === false) drawer.current.closeDrawer();
  }, [showDrawer])

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <VirtualizedList
        style={styles.settingOption}
        data={nestedComponents}
        contentContainerStyle={[styles.content]}
        renderItem={renderWidget}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerLockMode="unlocked"
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      {children}
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default memo(CustomDrawer);
