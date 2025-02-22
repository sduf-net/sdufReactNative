import * as React from 'react';
import { Div } from 'react-native-magnus';

const DivWidget = (config) => {
  const renderWidget = ({ item }) => <config.factory key={item.id} props={item} />;

  return (
    <Div {...config.data.props}>
      {config.nestedComponents.map((item) => renderWidget({item}))}
    </Div>
  );
};

export default DivWidget;
