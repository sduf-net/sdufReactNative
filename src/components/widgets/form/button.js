import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux';

export default function ButtonWidget({ data }) {
    const currentForm = useSelector(state => state.form);
    
    const onPressLearnMore = () => {
        sendCurrentForm();
    }

    const sendCurrentForm = async () => {
        console.log(currentForm);
    }
    // TODO add click handled
    // and send form to backend
    return (
        <View>
            {data ? <Button
                onPress={onPressLearnMore}
                style={[styles.input]}
                title={data.text}
                name={data?.name}
                disabled={data?.disabled}
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 7,
        paddingLeft: 7,
        marginRight: 10
    }
});