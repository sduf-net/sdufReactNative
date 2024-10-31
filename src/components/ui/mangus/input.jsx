import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Input, Icon } from 'react-native-magnus';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { onChange } from '../../../event_handler';
import {
  selectFieldErrors,
  selectFormValue,
  setForm,
  setFormValidations,
} from '../../../redux/form';
import { Text } from 'react-native';

const InputWidget = ({ data }) => {
  const formId = data.form_id ?? null;
  const fieldName = data.name ?? null;
  const value = useSelector((state) => selectFormValue(state, formId, fieldName), shallowEqual);
  const error = useSelector((state) => selectFieldErrors(state, formId, fieldName), shallowEqual);

  const [text, onChangeText] = useState('');
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (value == text) return;
    onChangeText(value);
  }, [value]);

  useEffect(() => {
    if (!formId || !fieldName) return;
    dispatch(
      setFormValidations({
        form_id: formId,
        [fieldName]: { required: data?.required, regexp: data?.regexp },
      })
    );
  }, []);

  const handleChanges = (text) => {
    onChangeText(text);

    if (formId) {
      onChange(data.actions, text, navigation, route);
      dispatch(setForm({ form_id: formId, [fieldName]: text }));
    }
  };

  return (
    <>
      <Input
        value={text}
        onChangeText={handleChanges}
        prefix={data.prefix ? <Icon {...data.prefix.props} /> : null}
        suffix={data.suffix ? <Icon {...data.suffix.props} /> : null}
        {...data.props}
      />
      {!!error && <Text style={{ color: 'red' }}>{error}</Text>}
    </>
  );
};

export default InputWidget;
