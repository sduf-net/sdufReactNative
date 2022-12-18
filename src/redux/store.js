import {configureStore} from '@reduxjs/toolkit'
import currentScreenReducer from './screens'

export default configureStore({
    reducer: {
        screen: currentScreenReducer
    }
})