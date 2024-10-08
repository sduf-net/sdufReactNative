import * as React from 'react';
import { Image } from 'react-native-magnus';
import CustomTouchableOpacity from '../../helpers/touchableOpacity';

const ImageWidget = ({ data }) => {
  return (
    <CustomTouchableOpacity data={data}>
      <Image {...data.props} />
    </CustomTouchableOpacity>
  );
};

export default ImageWidget;
