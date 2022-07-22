import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { transformComic } from "../../services/MarvelService";

const _apiBase='https://gateway.marvel.com:443/v1/public/';
const _apiKey='apikey=531082be7ba2891c77469570d4d4606b';
const _baseOffsetChars=210;


export const apiComic = createApi({
    reducerPath: 'apiComic',
    baseQuery: fetchBaseQuery({baseUrl:_apiBase}),
    endpoints: builder => ({
        getAllComics: builder.query({
            query: (offset = 0) => `comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`,
            transformResponse: responseData => {
                return responseData.data.results.map(transformComic);
            }
        })
    })
})

export const {useGetAllComicsQuery} = apiComic;