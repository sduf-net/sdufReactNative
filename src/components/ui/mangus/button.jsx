import React, { useState } from 'react';
import { VirtualizedList } from 'react-native';
import { Button, Icon } from 'react-native-magnus';
import { getItem, getItemCount } from '../../../utils';
import { handleEventAction, onLongPress, onPress } from '../../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useStore } from 'react-redux';
import { resetForm, setForm } from '../../../redux/form';

const ButtonWidget = (config) => {
  const { data } = config;
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const store = useStore();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onPressHandle = () => {
    const options = {'setLoading': setLoading, 'setDisabled': setDisabled};
    onPress(data.actions, navigation, route, options);

    if (data.form_id) {
      dispatch(setForm({ form_id: data.form_id, [data.name]: data.value }));
      sendCurrentForm();
    }
  };

  const onLongPressHandle = () => {
    onLongPress(data.actions, navigation, route);
  };

  const sendCurrentForm = async () => {
    const updatedForm = store.getState().form;

    const formData = updatedForm.data[data.form_id];
    const formOriginalData = updatedForm.forms[data.form_id];

    const result = await handleEventAction(
      {
        type: 'submit_form',
        form: { ...formOriginalData, data: formData },
        params: data,
      },
      navigation,
      route
    );

    if (result) {
      dispatch(resetForm({ form_id: data.form_id }));
    }
  };

  const renderWidget = ({ item }) => <config.factory props={item} />;

  return (
    <>
      {data.props && (
        <Button
          {...data.props}
          onPress={onPressHandle}
          onLongPress={onLongPressHandle}
          prefix={data.prefix ? <Icon {...data.prefix.props} /> : null}
          suffix={data.suffix ? <Icon {...data.suffix.props} /> : null}
          loading={loading}
          disabled={disabled}
          loaderColor={data.props?.color}
        >
          {config?.nestedComponents?.length > 0 ? (
            <VirtualizedList
              data={config.nestedComponents}
              renderItem={renderWidget}
              keyExtractor={(item) => item.id}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          ) : data.text.value ? (
            data.text.value
          ) : null}
        </Button>
      )}
    </>
  );
};

export default ButtonWidget;
