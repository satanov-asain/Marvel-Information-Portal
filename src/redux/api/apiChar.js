import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { transformChar, transformComics } from '../../services/MarvelService';

const _apiBase='https://gateway.marvel.com:443/v1/public/';
const _apiKey='apikey=531082be7ba2891c77469570d4d4606b';
const _baseOffsetChars=210;


export const apiChar = createApi({
    reducerPath: 'charApi',
    baseQuery: fetchBaseQuery({baseUrl:_apiBase}),
    endpoints: builder => ({
        getAllCharacters: builder.query({
            query: (offset = _baseOffsetChars,) => `characters?limit=9&offset=${offset}&${_apiKey}`,
            transformResponse: responseData => {
                return responseData.data.results.map(transformChar);
            }
        })
    })
})



// const getAllCharacters= async (offset=_baseOffsetChars)=>{
//     const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
//     return res.data.results.map(transformChar);
// }
// const getCharacter= async (id)=>{
//     const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
//     return transformChar(res.data.results[0]);
// }
// const getCharacterByName = async (name) => {
//     const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
//     return res.data.results.map(transformChar);
// }

export const {useGetAllCharactersQuery} = apiChar;