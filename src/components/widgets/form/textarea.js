import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { setForm } from '../../../redux/form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { onChange } from '../../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TextAreaWidget({ data }) {
  const formId = data.form_id ?? null;
  const fieldName = data.name ?? null;
  const value = useSelector((state) => {
    const form = state.form.data;
    if (form && form[formId] && form[formId][fieldName] !== undefined) {
      return form[formId][fieldName];
    }
    return '';
  }, shallowEqual);

  const [text, onChangeText] = useState('');
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const widgetStyles = data.styles ?? {};

  useEffect(() => {
    if (value == text) return;
    onChangeText(value);
  }, [value]);

  const handleChanges = (text) => {
    onChangeText(text);

    if (formId) {
      onChange(data.actions, text, navigation, route);
      dispatch(setForm({ form_id: formId, [data.name]: text }));
    }
  };

  return (
    <View>
      {data ? (
        <TextInput
          editable
          multiline
          numberOfLines={4}
          style={[styles.input, widgetStyles]}
          onChangeText={handleChanges}
          value={text}
          placeholder={data?.placeholder}
          name={data?.name}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 7,
    paddingLeft: 7,
    marginBottom: 10,
  },
});
