import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useDispatch, useStore } from 'react-redux';
import { handleEventAction, onPress } from '../../../event_handler';
import { resetForm, setForm } from '../../../redux/form';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ButtonWidget({ data }) {
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const store = useStore();

    const onPressHandle = () => {
        onPress(data.actions, navigation, route);

        if (data.form_id) {
            dispatch(setForm({ form_id: data.form_id, [data.name]: data.value }));
            sendCurrentForm();
            dispatch(resetForm());
        }
    }

    const sendCurrentForm = () => {
        const updatedForm = store.getState().form;

        const formData = updatedForm.data[data.form_id];
        const formOriginalData = updatedForm.forms[data.form_id];

        handleEventAction({
            type: "submit_form",
            form: { ...formOriginalData, data: formData },
            params: data
        }, navigation, route);
    }

    return (
        <View>
            {data ? <Button
                onPress={onPressHandle}
                color={data.color}
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