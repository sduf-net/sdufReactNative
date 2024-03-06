import {configureStore} from '@reduxjs/toolkit'
import currentScreenReducer from './screens'
import currentUserReducer from './users'
import currentFormReducer from './form'
import floatCardReducer from './floatCard'
import currentMapReducer from './map'
import modalWindowReducer from './modalWindow'
import ErrorsReducer from './errors'

export default configureStore({
    reducer: {
        screen: currentScreenReducer,
        floatCard: floatCardReducer,
        user: currentUserReducer,
        form: currentFormReducer,
        map: currentMapReducer,
        modalWindow: modalWindowReducer,
        errors: ErrorsReducer
    }
})