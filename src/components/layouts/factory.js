import Row from './row';
import Wrap from './wrap';
import Column from './column';
import Center from './center';
import Touchable from './touchable';

export const layoutsToComponentMap = {
  // layouts
  Column: Column,
  TwoColumn: Column,
  Row: Row,
  SimpleRow: Row,
  FixedCenter: Center,
  SimpleWrap: Wrap,
  Touchable: Touchable
};
