import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { handleEventAction } from '../../../event_handler';
import { resetForm, setForm } from '../../../redux/form';

export default function ButtonWidget({ data, navigation }) {
    const currentForm = useSelector(state => state.form);
    const dispatch = useDispatch();

    const onPressLearnMore = () => {
        dispatch(setForm({ [data.name]: data.value }));
        sendCurrentForm();
    }

    const sendCurrentForm = async () => {
        handleEventAction({
            type: "submit_form",
            form: currentForm,
            params: data
        }, navigation);
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