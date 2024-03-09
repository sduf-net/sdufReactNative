import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { setForm } from "../../../redux/form";
import { useDispatch } from "react-redux";
import { onChange } from "../../../event_handler";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SelectWidget({ data }) {
    const [selectedValue, setSelectedValue] = useState();
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();
    const widgetStyles = data.styles ?? {};

    const handleChanges = (value) => {
        onChange(data.actions, value, navigation, route);
        setSelectedValue(value);
        dispatch(setForm({[data.name]: value }));
    };

    return (
        <View style={[styles.container, widgetStyles]}>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50 }}
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