import React from 'react';
import { View, StyleSheet } from 'react-native';

const OverlayContainer = (props) => {
    const { behind, front } = props;

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <View style={styles.behind}>
                    {behind}
                </View>
                <View style={styles.front}>
                    {front}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    behind: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    front: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    }
});

export default OverlayContainer;
