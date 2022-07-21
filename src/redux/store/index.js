import { configureStore, combineReducers } from "@reduxjs/toolkit";
import char from '../slices/charSlice';
import comic from '../slices/comicSlice';
import { apiChar } from "../api/apiChar";

const rootReducer = combineReducers({
    char,
    comic,
    [apiChar.reducerPath]: apiChar.reducer
})

const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiChar.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;