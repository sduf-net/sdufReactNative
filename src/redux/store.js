import {configureStore} from '@reduxjs/toolkit'
import currentScreenReducer from './screens'
import currentUserReducer from './users'
import currentFormReducer from './form'

export default configureStore({
    reducer: {
        screen: currentScreenReducer,
        user: currentUserReducer,
        form: currentFormReducer
    }
})