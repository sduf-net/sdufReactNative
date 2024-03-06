import React, { memo, useCallback } from 'react';
import { StyleSheet, View, VirtualizedList } from 'react-native';
import Modal from 'react-native-modal';
import { getItem, getItemCount } from '../../utils';
import ComponentFactory from '../factory';
import { useDispatch, useSelector } from 'react-redux';
import { hideModalWindow } from '../../redux/modalWindow';

function CustomModal() {
  const dispatch = useDispatch();
  const modalWindow = useSelector(state => state.modalWindow);

  const renderWidget = useCallback(({ item }) => {
    return <ComponentFactory props={item} />
  });

  return (
    <View style={styles.page}>
      {modalWindow && <Modal
        testID={'modal'}
        isVisible={modalWindow.showModalWindow}
        onSwipeComplete={() => dispatch(hideModalWindow())}
        onBackdropPress={() => dispatch(hideModalWindow())}
        onRequestClose={() => dispatch(hideModalWindow())}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.view}
      >
        {modalWindow.nestedComponents ? <VirtualizedList
          data={modalWindow.nestedComponents}
          contentContainerStyle={styles.view}
          initialNumToRender={2}
          renderItem={renderWidget}
          keyExtractor={item => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        /> : null}
      </Modal>}
    </View>
  );
}

export default memo(CustomModal);

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    margin: 10
  }
});