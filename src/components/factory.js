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
import LineWidget from './widgets/line'
import Label1 from './widgets/label1'
import Label2 from './widgets/label2'
import Label3 from './widgets/label3'
import Hr from './widgets/hr'
import CarouselReanimated from './widgets/carousel'
import InputWidget from './widgets/input'
import ItemHeader2 from './widgets/itemHeader2'
import CustomModal from './widgets/modal'
import chatPreview from './widgets/chatPreview'


const keysToComponentMap = {
    // layouts
    Column: Column,
    Row: Row,
    SimpleRow: Row,
    LineWidget: Hr,
    // widgets
    ChatPreviewWidget: chatPreview,
    Item2Header: ItemHeader2,
    PopupWidget: CustomModal,
    HeaderWidget: Header,
    FooterWidget: Footer,
    ImageWidget: ImageWidget,
    TextWidget: TextWidget,
    ItemCard1: ItemCard1,
    ItemCard2: ItemCard2,
    Label1Widget: Label1,
    Label2Widget: Label2,
    Label3Widget: Label3,
    ImageCarouselWidget: CarouselReanimated,
    InputWidget: InputWidget,
    ApiWidget: ApiWidget
}


function ComponentFactory(config) {
    const getComponentName = useCallback((key) => {
        return keysToComponentMap[key] ? keysToComponentMap[key] : Error
    }, [config.props.name])

    return createElement(
        getComponentName(config.props.name),
        {
            data: config.props.data,
            id: config.props.id,
            navigation: config.navigation,
            route: config.route,
            nestedComponents: config.props.nestedComponents ? config.props.nestedComponents : null
        }
    );
}


export default memo(ComponentFactory);


