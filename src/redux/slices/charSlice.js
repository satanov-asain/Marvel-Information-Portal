import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMarvelService } from "../../services/MarvelService";
 
const {fetchCharacter} = fetchMarvelService();

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
const initialState = {
    //state для CharInfo
    charData:null,
    charId:0,
    charLoadingStatus:'idle',
    //state для RandomChar
    randomCharData:{},
    randomCharId:0, 
    randomCharLoadingStatus:'idle',
    count:0
}

const charSlice = createSlice({
    name:'char',
    initialState,
    reducers: {
        changeCharId(state, action){state.charId = action.payload;},
        increment(state, action){
            state.count += action.payload;}
    },
    extraReducers: builder => {
        builder
        //Отработка загрузки для CharInfo
        .addCase(fetchCharInfo.pending, state => {state.charLoadingStatus = 'loading';})
        .addCase(fetchCharInfo.fulfilled, (state, action) => {
            state.charLoadingStatus = 'idle';
            state.charData = action.payload ;})
        .addCase(fetchCharInfo.rejected, state => {state.charLoadingStatus = 'error';} )
        //Отработка загрузки для RandomChar
        .addCase(fetchRandomChar.pending, state => {state.randomCharLoadingStatus = 'loading';})
        .addCase(fetchRandomChar.fulfilled, (state, action) => {
            state.randomCharLoadingStatus = 'idle';
            state.randomCharData = action.payload;})
        .addCase(fetchRandomChar.rejected, state => {state.randomCharLoadingStatus = 'error'})
        .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = charSlice;

export const {changeCharId, increment} = actions;
export default reducer;







