import { configureStore, combineReducers } from "@reduxjs/toolkit";
import char from '../slices/charSlice';
import comic from '../slices/comicSlice';
import { apiChar } from "../api/apiChar";
import { apiComic } from "../api/apiComic";

const rootReducer = combineReducers({
    char,
    comic,
    [apiChar.reducerPath]: apiChar.reducer,
    [apiComic.reducerPath]: apiComic.reducer
})

const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiChar.middleware, apiComic.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;