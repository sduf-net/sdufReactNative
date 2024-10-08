import * as React from 'react';
import { Icon } from 'react-native-magnus';
import CustomTouchableOpacity from '../../helpers/touchableOpacity';

const IconWidget = ({ data }) => {
  return (
    <CustomTouchableOpacity data={data}>
      <Icon {...data.props} />
    </CustomTouchableOpacity>
  );
};

export default IconWidget;
