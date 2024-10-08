import * as React from 'react';
import { Button, Header, Icon } from 'react-native-magnus';
import { onLongPress, onPress } from '../../../event_handler';
import { useNavigation, useRoute } from '@react-navigation/native';

const HeaderWidget = ({ data }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const onPressHandle = (actions, navigation, route) => {
    onPress(actions, navigation, route);
  };

  const onLongPressHandle = (actions) => {
    onLongPress(actions, navigation, route);
  };

  return (
    <Header
      {...data.props}
      prefix={
        data.prefix ? (
          <Button
            onPress={() => onPressHandle(data.prefix.actions, route, navigation)}
            onLongPress={() => onLongPressHandle(data.prefix.actions, route, navigation)}
            bg="transparent"
          >
            <Icon {...data.prefix.props} />
          </Button>
        ) : null
      }
      suffix={
        data.suffix ? (
          <Button
            onPress={() => onPressHandle(data.suffix.actions, route, navigation)}
            onLongPress={() => onLongPressHandle(data.suffix.actions, route, navigation)}
            bg="transparent"
          >
            <Icon {...data.suffix.props} />
          </Button>
        ) : null
      }
    >
      {data?.text?.value}
    </Header>
  );
};

export default HeaderWidget;
