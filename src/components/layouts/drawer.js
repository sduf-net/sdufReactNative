import React, { memo, useEffect, useRef, useState } from 'react';
import { DrawerLayoutAndroid, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { getItem, getItemCount } from '../../utils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ComponentFactory from '../factory';
import { selectDrawer } from '../../redux/screens';
import { hideDrawer, showDrawer as openDrawer } from '../../redux/drawer';

function CustomDrawer({ children }) {
  if(Platform.OS === 'ios') return <>{children}</>;

  const dispatch = useDispatch();
  const drawer = useRef(null);
  const drawerDataFromScreen = useSelector((state) => selectDrawer(state), shallowEqual);
  const drawerDataFromApi = useSelector((state) => state.drawer, shallowEqual);
  const showDrawer = useSelector((state) => state.drawer.showDrawer);
  const [nestedComponents, setnestedComponents] = useState([]);

  const drawerPosition = drawerDataFromScreen?.drawer_position || 'left';
  const drawerWidth = drawerDataFromScreen?.drawer_width || 300;
  const drawerLockMode = drawerDataFromScreen?.drawer_lock_mode || 'unlocked';

  useEffect(() => {
    if (drawerDataFromApi.nestedComponents.length) {
      setnestedComponents(drawerDataFromApi.nestedComponents);
    } else {
      if (!drawerDataFromScreen?.nestedComponents) return;
      setnestedComponents(drawerDataFromScreen.nestedComponents);
    }
  }, [drawerDataFromScreen, drawerDataFromApi]);

  const renderWidget = ({ item }) => <ComponentFactory props={item} />;

  useEffect(() => {
    if (showDrawer === true) drawer.current.openDrawer();
    if (showDrawer === false) drawer.current.closeDrawer();
  }, [showDrawer]);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      {nestedComponents ? (
        <VirtualizedList
          style={styles.settingOption}
          data={nestedComponents}
          contentContainerStyle={[styles.content]}
          renderItem={renderWidget}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      ) : null}
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={drawerWidth}
      drawerLockMode={drawerLockMode}
      drawerPosition={drawerPosition}
      onDrawerClose={() => dispatch(hideDrawer())}
      onDrawerOpen={() => dispatch(openDrawer())}
      renderNavigationView={navigationView}
    >
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
