import React, { memo, useCallback, useState } from 'react';
import { Button, StyleSheet, View, VirtualizedList } from 'react-native';
import Modal from 'react-native-modal';
import { useRoute } from '@react-navigation/native';

function CustomModal({ nestedComponents, navigation }) {
  const route = useRoute();

  [isVisible, setIsVisible] = useState(false);

  const pressBtm = () => {
    setIsVisible(!isVisible);
  };

  const renderWidget = useCallback(({ item }) => {
    return <config.factory props={item} navigation={navigation} route={route} />
  });

  const getItemCount = (item) => {
    return item.length;
  };
  const getItem = (data, index) => {
    return data[index];
  };

  return (
    <View style={styles.page}>
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        onSwipeComplete={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.view}
        >
        {nestedComponents ? <VirtualizedList
          data={nestedComponents}
          contentContainerStyle={styles.view}
          initialNumToRender={2}
          renderItem={renderWidget}
          keyExtractor={item => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        /> : null}
      </Modal>
      <Button title='asdasdasdasd' onPress={pressBtm} />
    </View>
  );
}

export default memo(CustomModal);

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    margin: 10
  },
  page: {
    flex: 1,
    backgroundColor: 'white'
  }
});