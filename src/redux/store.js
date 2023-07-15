import {configureStore} from '@reduxjs/toolkit'
import currentScreenReducer from './screens'
import currentUserReducer from './users'
import currentFormReducer from './form'
import floatCardReducer from './floatCard'

export default configureStore({
    reducer: {
        screen: currentScreenReducer,
        floatCard: floatCardReducer,
        user: currentUserReducer,
        form: currentFormReducer
    }
})