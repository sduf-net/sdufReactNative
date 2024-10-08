import Hr from './hr';
import ApiWidget from './api';
import Header from './header';
import Label1 from './label1';
import Label2 from './label2';
import Label3 from './label3';
import ItemList from './list';
import Footer from './footer';
import TextWidget from './text';
import ImageWidget from './image';
import MapWidget from './mapLibre';
import ItemCard1 from './itemCard1';
import ItemCard2 from './itemCard2';
import CameraWidget from './camera';
import MyCarousel from './carousel';
import FormWidget from './form/form';
import WebViewWidget from './webView';
import InputWidget from './form/input';
import ItemHeader2 from './itemHeader2';
import chatPreview from './chatPreview';
import ChatMessage from './chatMessage';
import WormholeWidget from './wormhole';
import TinderWidget from './tinderCard';
import SelectWidget from './form/select';
import ButtonWidget from './form/button';
import PaginationWidget from './pagination';
import TextAreaWidget from './form/textarea';
import ImageLibraryWidget from './imageLibrary';
import DateTimePickerWidget from './datepicker';
import InputWithButton from './form/inputWithBtn';
import ShareWidget from './share';

export const customToComponentMap = {
  LineWidget: Hr,
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
  PaginationWidget: PaginationWidget,
  TinderWidget: TinderWidget,
  InputWithButtonWidget: InputWithButton,
  DateTimePickerWidget: DateTimePickerWidget,
  CustomWidget: WormholeWidget,
  CameraWidget: CameraWidget,
  ImageLibraryWidget: ImageLibraryWidget,
  ShareWidget: ShareWidget,
};
