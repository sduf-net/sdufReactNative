import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useDispatch, useStore } from 'react-redux';
import { handleEventAction } from '../../../event_handler';
import { resetForm, setForm } from '../../../redux/form';
import { useRoute } from '@react-navigation/native';

export default function ButtonWidget({ data, navigation }) {
    const dispatch = useDispatch();
    const route = useRoute();
    const store = useStore();
    const widgetStyles = data.styles ?? {};

    const onPressLearnMore = () => {
        dispatch(setForm({ [data.name]: data.value }));
        sendCurrentForm();
        dispatch(resetForm());
    }

    const sendCurrentForm = () => {
        const updatedForm = store.getState().form;
        handleEventAction({
            type: "submit_form",
            form: updatedForm,
            params: data
        }, navigation, route);
    }

    return (
        <View>
            {data ? <Button
                onPress={onPressLearnMore}
                style={[styles.input, widgetStyles]}
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