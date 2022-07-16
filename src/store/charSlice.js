import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux/es/exports";
import store from ".";
import useMarvelService from '../services/MarvelService';
import useHttp from "../hooks/http.hooks";

const _apiBase='https://gateway.marvel.com:443/v1/public/';
const _apiKey='apikey=531082be7ba2891c77469570d4d4606b';

export const fetchCharInfo = createAsyncThunk(
    'charInfo/fetch',
    async (id) => {
        const {getCharacter} = useMarvelService();
        // const prom = new Promise((resolve, reject) => {
        //     const data = getCharacter(id);
        //     data ? resolve(data) : reject();
        // })
        // return prom;
        return await getCharacter(id);
    }
)
const initialState = {
    charData: [],
    charId:1,
    charLoadingStatus:'idle',
}

const charSlice = createSlice({
    name:'char',
    initialState,
    reducers: {
        changeCharId: (state, action) => {state.charId = action.payload;}
    },
    extraReducers: builder => {
        builder
        .addCase(fetchCharInfo.pending, state => {state.charLoadingStatus = 'loading';})
        .addCase(fetchCharInfo.fulfilled, (state, action) => {state.charLoadingStatus = 'idle';
                                                            state.charData.push(action.payload);})
        .addCase(fetchCharInfo.rejected, state => {state.charLoadingStatus = 'error';} )
        .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = charSlice;

export const {changeCharId} = actions;
export default reducer;
