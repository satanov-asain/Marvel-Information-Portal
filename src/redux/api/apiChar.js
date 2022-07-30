import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { transformChar} from '../../services/MarvelService';

const _apiBase='https://gateway.marvel.com:443/v1/public/';
const _apiKey='apikey=531082be7ba2891c77469570d4d4606b';
const _baseOffsetChars=200;


export const apiChar = createApi({
    reducerPath: 'apiChar',
    baseQuery: fetchBaseQuery({baseUrl:_apiBase}),
    endpoints: builder => ({
        getAllCharacters: builder.query({
            query: (offset = _baseOffsetChars) => `characters?limit=9&offset=${offset}&${_apiKey}`,
            transformResponse: responseData => {
                return responseData.data.results.map(transformChar);
            }
        })
    })
})

export const {useGetAllCharactersQuery} = apiChar;