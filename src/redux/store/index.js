import { configureStore, combineReducers } from "@reduxjs/toolkit";
import char from '../slices/charSlice';
import comic from '../slices/comicSlice';

const rootReducer = combineReducers({
    char,
    comic
})

const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;