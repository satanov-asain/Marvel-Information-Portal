import { configureStore } from "@reduxjs/toolkit";
import char from './charSlice';


const store = configureStore({
    reducer:{
        char,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV === 'production'
})

export default store;