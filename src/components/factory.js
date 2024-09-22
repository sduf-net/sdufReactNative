import { createElement, memo, useCallback } from 'react';
import Hr from './ui/custom/hr';
import Row from './layouts/row';
import CustomDrawer from './layouts/drawer';
import Wrap from './layouts/wrap';
import Error from './ui/custom/error';
import Column from './layouts/column';
import ApiWidget from './ui/custom/api';
import Header from './ui/custom/header';
import Center from './layouts/center';
import Label1 from './ui/custom/label1';
import Label2 from './ui/custom/label2';
import Label3 from './ui/custom/label3';
import ItemList from './ui/custom/list';
import Footer from './ui/custom/footer';
import TextWidget from './ui/custom/text';
import ImageWidget from './ui/custom/image';
import MapWidget from './ui/custom/mapLibre';
import ItemCard1 from './ui/custom/itemCard1';
import ItemCard2 from './ui/custom/itemCard2';
import CameraWidget from './ui/custom/camera';
import MyCarousel from './ui/custom/carousel';
import FormWidget from './ui/custom/form/form';
import WebViewWidget from './ui/custom/webView';
import InputWidget from './ui/custom/form/input';
import ItemHeader2 from './ui/custom/itemHeader2';
import chatPreview from './ui/custom/chatPreview';
import ChatMessage from './ui/custom/chatMessage';
import WormholeWidget from './ui/custom/wormhole';
import TinderWidget from './ui/custom/tinderCard';
import SelectWidget from './ui/custom/form/select';
import SwipeableLayout from './layouts/swipable';
import ButtonWidget from './ui/custom/form/button';
import PaginationWidget from './ui/custom/pagination';
import TextAreaWidget from './ui/custom/form/textarea';
import ImageLibraryWidget from './ui/custom/imageLibrary';
import DateTimePickerWidget from './ui/custom/datepicker';
import InputWithButton from './ui/custom/form/inputWithBtn';
import ShareWidget from './ui/custom/share';

const keysToComponentMap = {
  // layouts
  Column: Column,
  TwoColumn: Column,
  Row: Row,
  SimpleRow: Row,
  LineWidget: Hr,
  DrawerWidget: CustomDrawer,
  // widgets
  ChatPreviewWidget: chatPreview,
  Item2Header: ItemHeader2,
  HeaderWidget: Header,
  FooterWidget: Footer,
  ImageWidget: ImageWidget,
  TextWidget: TextWidget,
  ItemCard1: ItemCard1,
  ItemCard2: ItemCard2,
  Label1Widget: Label1,
  Label2Widget: Label2,
  Label3Widget: Label3,
  ImageCarouselWidget: MyCarousel,
  InputWidget: InputWidget,
  TextAreaWidget: TextAreaWidget,
  SelectWidget: SelectWidget,
  ButtonWidget: ButtonWidget,
  FormWidget: FormWidget,
  MaplibreWidget: MapWidget,
  ApiWidget: ApiWidget,
  ChatMessageWidget: ChatMessage,
  WebViewWidget: WebViewWidget,
  ListWidget: ItemList,
  SimpleWrap: Wrap,
  PaginationWidget: PaginationWidget,
  FixedCenter: Center,
  TinderWidget: TinderWidget,
  SwipeableLayout: SwipeableLayout,
  InputWithButtonWidget: InputWithButton,
  DateTimePickerWidget: DateTimePickerWidget,
  CustomWidget: WormholeWidget,
  CameraWidget: CameraWidget,
  ImageLibraryWidget: ImageLibraryWidget,
  ShareWidget: ShareWidget,
};

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
