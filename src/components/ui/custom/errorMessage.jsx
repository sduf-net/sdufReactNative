import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import useErrors from '../../../hooks/useErrors';

const ErrorComponent = ({ children }) => {
  const { removeErrorByIndex } = useErrors();
  const errors = useSelector((state) => state.errors.errors);

  return (
    <View style={styles.container}>
      {children}
      <View style={styles.errorContainer}>
        <FlatList
          data={errors}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => removeErrorByIndex(index)}>
              <Text style={styles.errorText}>{item}</Text>
            </TouchableOpacity>
          )}
          inverted={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.8,
    alignItems: 'center',
  },
  errorText: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    color: 'white',
    elevation: 2,
    shadowColor: '#000',
    backgroundColor: '#F44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default ErrorComponent;
