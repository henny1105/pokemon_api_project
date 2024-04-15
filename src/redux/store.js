import {configureStore} from '@reduxjs/toolkit'
import myInfoSlice from './reducers/Slice'

const store = configureStore({
    reducer:{
        myInfo:myInfoSlice,
    }
})

export default store