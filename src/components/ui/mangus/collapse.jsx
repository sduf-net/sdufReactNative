import * as React from 'react';
import { VirtualizedList } from 'react-native';
import { Collapse, Icon, Text } from 'react-native-magnus';
import { getItem, getItemCount } from '../../../utils';

const CollapseWidget = (config) => {
  const renderWidget = ({ item }) => <config.factory props={item} />;

  return (
    <Collapse>
      <Collapse.Header
        {...config?.data?.header?.props}
        prefix={config.data.prefix ? <Icon {...config.data.prefix.props} /> : null}
      >
        {config?.data?.header?.text?.value}
      </Collapse.Header>
      <Collapse.Body {...config?.data?.body?.props}>
        <VirtualizedList
          data={config.nestedComponents}
          renderItem={renderWidget}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </Collapse.Body>
    </Collapse>
  );
};

export default CollapseWidget;
