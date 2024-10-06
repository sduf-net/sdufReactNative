import { createElement, memo, useCallback } from 'react';
import { mangusToComponentMap } from './ui/mangus/factory';
import { layoutsToComponentMap } from './layouts/factory';
import { customToComponentMap } from './ui/custom/factory';

const keysToComponentMap = {...customToComponentMap, ...layoutsToComponentMap, ...mangusToComponentMap};

function ComponentFactory(config) {
  const getComponentName = useCallback(
    (key) => {
      return keysToComponentMap[key] ? keysToComponentMap[key] : Error;
    },
    [config.props.name]
  );

  return createElement(getComponentName(config.props.name), {
    factory: ComponentFactory,
    data: config.props.data,
    id: config.props.id,
    nestedComponents: config.props.nestedComponents ? config.props.nestedComponents : null,
  });
}

export default memo(ComponentFactory);
