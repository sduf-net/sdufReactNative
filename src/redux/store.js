import {configureStore} from '@reduxjs/toolkit'
import currentScreenReducer from './screens'
import currentUserReducer from './users'

export default configureStore({
    reducer: {
        screen: currentScreenReducer,
        user: currentUserReducer
    }
})