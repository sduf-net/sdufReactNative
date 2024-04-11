import { useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const YouAreOfflineScreen = () => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Index', {});
    };

    if (!isFocused) return;

    return (
        <View style={styles.container}>
            <Text style={styles.message}>You are offline. Please check your internet connection.</Text>
            <Button onPress={onPress} title='Reload' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default YouAreOfflineScreen;