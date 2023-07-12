import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { setForm } from "../../../redux/form";
import { useDispatch, useSelector } from "react-redux";

export default function SelectWidget({ data }) {
    const [selectedValue, setSelectedValue] = useState();
    const dispatch = useDispatch();

    const handleChanges = (value) => {
        setSelectedValue(value);
        dispatch(setForm({[data.name]: value }));
        console.log({[data.name]: value })
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => handleChanges(itemValue)}
            >
                {data.options.map((option) => {
                    return <Picker.Item key={option.id} label={option.text} value={option.value} />
                })}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
});