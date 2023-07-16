import React, { useEffect } from 'react';
import { View, StyleSheet, VirtualizedList, BackHandler } from 'react-native';
import { getItem, getItemCount } from '../../utils';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import ComponentFactory from './../factory';
import { hideFloatCard } from '../../redux/floatCard';

const FloatingCard = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const floatCard = useSelector(state => state.floatCard);

    const renderWidget = ({ item }) => (
        <ComponentFactory props={item} navigation={navigation} route={route} />
    );

    const handleBackButton = () => {
        if (floatCard.showFloatCard) {
            dispatch(hideFloatCard());
            return true;
        }
        // Define your custom back button behavior here
        // For example, show a confirmation modal or navigate back in the app.
        // Return true if you want to override the default behavior (exit the app).
        // Return false if you want to keep the default behavior (go back in the app).
        // In this example, we are just logging a message and returning false.
        return false;
    };

    useFocusEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            backHandler.remove();
        };
    });

    return (
        <View style={styles.container}>
            {floatCard && floatCard.showFloatCard && <VirtualizedList
                data={floatCard.nestedComponents}
                contentContainerStyle={[styles.justifyContent]}
                renderItem={renderWidget}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal={true}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: 300,
        position: 'absolute',
        bottom: 70,
        padding: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4, // For Android shadow
        shadowColor: 'black', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.2, // For iOS shadow
        shadowRadius: 4, // For iOS shadow
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        alignSelf: 'center', // Center horizontally (this is required for Android),
      },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
    },
});

export default FloatingCard;
