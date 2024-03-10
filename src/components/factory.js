import { createElement, memo, useCallback } from 'react'
import Header from './widgets/header'
import Footer from './widgets/footer'
import Error from './widgets/error'
import Row from './layouts/row'
import Column from './layouts/column'
import ApiWidget from './widgets/api'
import ImageWidget from './widgets/image'
import TextWidget from './widgets/text'
import ItemCard1 from './widgets/itemCard1'
import ItemCard2 from './widgets/itemCard2'
import Label1 from './widgets/label1'
import Label2 from './widgets/label2'
import Label3 from './widgets/label3'
import Hr from './widgets/hr'
import MyCarousel from './widgets/carousel'
import InputWidget from './widgets/form/input'
import ItemHeader2 from './widgets/itemHeader2'
import chatPreview from './widgets/chatPreview'
import ChatMessage from './widgets/ChatMessage'
import SelectWidget from './widgets/form/select'
import ButtonWidget from './widgets/form/button'
import FormWidget from './widgets/form/form'
import MapWidget from './widgets/mapLibre'
import WebViewWidget from './widgets/webView'
import ItemList from './widgets/list'
import PaginationWidget from './widgets/pagination'
import Wrap from './layouts/wrap'
import TextAreaWidget from './widgets/form/textarea'
import Center from './layouts/center'
import TinderWidget from './widgets/tinderCard'

const keysToComponentMap = {
    // layouts
    Column: Column,
    TwoColumn: Column,
    Row: Row,
    SimpleRow: Row,
    LineWidget: Hr,
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
    TinderWidget: TinderWidget
}


function ComponentFactory(config) {
    const getComponentName = useCallback((key) => {
        return keysToComponentMap[key] ? keysToComponentMap[key] : Error
    }, [config.props.name])

    return createElement(
        getComponentName(config.props.name),
        {
            factory: ComponentFactory,
            data: config.props.data,
            id: config.props.id,
            nestedComponents: config.props.nestedComponents ? config.props.nestedComponents : null
        }
    );
}


export default memo(ComponentFactory);
