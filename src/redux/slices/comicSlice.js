import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMarvelService } from "../../services/MarvelService";

const {fetchComic} = fetchMarvelService();

export const fetchComicInfo = createAsyncThunk(
    'comic/fetchComicInfo',
    async (id) => {
        return await fetchComic(id);
    }
)

const initialState = {
    comicData: null,
    comicId: 0,
    comicLoadingStatus: 'idle'
}

const comicSlice = createSlice({
    name: 'comic',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        //Отработка загрузки для ComicInfo
        .addCase(fetchComicInfo.pending, state => {state.comicLoadingStatus = 'loading';})
        .addCase(fetchComicInfo.fulfilled, (state, action) => {
            state.comicLoadingStatus = 'idle';
            state.comicData = action.payload;
            state.comicId = action.payload.id;
        })
        .addCase(fetchComicInfo.rejected, state => {
            state.comicLoadingStatus = 'error';
            state.comicData = null;})
    }
})

const {reducer} = comicSlice;
export default reducer;
