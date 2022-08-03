import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMarvelService } from "../../services/MarvelService";
 
const {fetchCharacter, fetchCharacterByName} = fetchMarvelService();

export const fetchCharInfo = createAsyncThunk(
    'char/fetchCharInfo',
    async (id) => {
        return await fetchCharacter(id);
    }
)

export const fetchRandomChar = createAsyncThunk(
    'char/fetchRandomChar',
    async (id) => {
        return await fetchCharacter(id);
    }
)

export const fetchSearchChar = createAsyncThunk(
    'char/searchChar',
    async (name) => {
        return await fetchCharacterByName(name);
    }
)
const initialState = {
    //state для CharInfo
    charData:null,
    charId:0,
    charLoadingStatus:'idle',
    //state для RandomChar
    randomCharData:{},
    randomCharId:0, 
    randomCharLoadingStatus:'idle',
    //state для SearchChar
    searchCharData: {},
    searchCharId:0,
    searchCharLoadingStatus:'idle',
    //state для SingleCharacter
    singleCharData: {},
    singleCharId:0,
    singleCharLoadingStatus:'idle'
}

const charSlice = createSlice({
    name:'char',
    initialState,
    reducers: {
        charSetSingle: (state, action) => {
            state.singleCharData = action.payload.data;
            state.singleCharId = action.payload.id;
            state.singleCharLoadingStatus = action.payload.status;
        }
    },
    extraReducers: builder => {
        builder
        //Отработка загрузки для CharInfo
        .addCase(fetchCharInfo.pending, state => {state.charLoadingStatus = 'loading';})
        .addCase(fetchCharInfo.fulfilled, (state, action) => {
            state.charLoadingStatus = 'idle';
            state.charData = action.payload ;
            state.charId = action.payload.id;})
        .addCase(fetchCharInfo.rejected, state => {
            state.charLoadingStatus = 'error';
            state.charData = null;} )
        //Отработка загрузки для RandomChar
        .addCase(fetchRandomChar.pending, state => {state.randomCharLoadingStatus = 'loading';})
        .addCase(fetchRandomChar.fulfilled, (state, action) => {
            state.randomCharLoadingStatus = 'idle';
            state.randomCharData = action.payload;
            state.randomCharId = action.payload.id;})
        .addCase(fetchRandomChar.rejected, state => {
            state.randomCharLoadingStatus = 'error'
            state.randomCharData = {};})
        //Отработка загрузки для SearchChar
        .addCase(fetchSearchChar.pending, state => {state.searchCharLoadingStatus = 'loading';})
        .addCase(fetchSearchChar.fulfilled, (state, action) => {
            state.searchCharLoadingStatus = 'idle';
            state.searchCharData = action.payload;
            state.searchCharId = action.payload.id;})
        .addCase(fetchSearchChar.rejected, state => {
            state.searchCharLoadingStatus = 'error';
            state.searchCharData = {};
        })
        .addDefaultCase(()=>{})
    }
})

const {reducer, actions} = charSlice;
export const {charSetSingle} = actions;
export default reducer;







