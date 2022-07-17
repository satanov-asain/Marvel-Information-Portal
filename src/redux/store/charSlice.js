import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import store from ".";
import { fetchMarvelService } from "../../services/MarvelService"; 


export const fetchCharInfo = createAsyncThunk(
    'char/fetch',
    async (id) => {
        const {fetchCharacter} = fetchMarvelService();
        return await fetchCharacter(id);

    }
)
const initialState = {
    charData:null,
    charId:1,
    charLoadingStatus:'idle',
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
        .addCase(fetchCharInfo.pending, state => {state.charLoadingStatus = 'loading';})
        .addCase(fetchCharInfo.fulfilled, (state, action) => {state.charLoadingStatus = 'idle';
                                                           state.charData = action.payload ;})
        .addCase(fetchCharInfo.rejected, state => {state.charLoadingStatus = 'error';} )
        .addDefaultCase(()=>{})
    }
})

const {actions, reducer} = charSlice;

export const {changeCharId, increment} = actions;
export default reducer;







