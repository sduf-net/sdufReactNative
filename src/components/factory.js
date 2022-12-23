import { createElement } from 'react'
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

const keysToComponentMap = {
    // layouts
    Column: Column,
    Row: Row,
    SimpleRow: Row,
    LineWidget: Hr,
    // widgets
    HeaderWidget: Header,
    FooterWidget: Footer,
    ImageWidget: ImageWidget,
    TextWidget: TextWidget,
    ItemCard1: ItemCard1,
    ItemCard2: ItemCard2,
    Label1Widget: Label1,
    Label2Widget: Label2,
    Label3Widget: Label3,
    ApiWidget: ApiWidget

}

const getComponentName = (key) => {
    return keysToComponentMap[key] ? keysToComponentMap[key] : Error
}

export default function ComponentFactory(config) {
    return createElement(
        getComponentName(config.props.name),
        {
            data: config.props.data,
            navigation: config.navigation,
            route: config.route,
            nestedComponents: config.props.nestedComponents ? config.props.nestedComponents : null
        }
    );
}


