import useHttp from "../hooks/http.hooks";

const _apiBase='https://gateway.marvel.com:443/v1/public/';
const _apiKey='apikey=531082be7ba2891c77469570d4d4606b';
const _baseOffsetChars=210;

const _transformChar=(char)=>{
    return  {
    id:char.id,
    name:char.name,
    description:char.description ? `${char.description.slice(0, 210)}...` : 'К сожалению, описание к данному Герою отсутсвует',
    thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
    thumbnailName:char.thumbnail.path,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics:char.comics.items,           
};
}
const _transformComics=(comics)=>{
    return  {
    id:comics.id,
    title:comics.title,
    description:comics.description || 'There is no description',
    pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
    thumbnail:comics.thumbnail.path + '.' + comics.thumbnail.extension,
    language: comics.textObjects.language || 'en-us',
    price: comics.prices.price ? `${comics.prices.price}$` : 'not available'       
    };
}

const useMarvelService=()=>{
    const{loading, error, process, setProcess, request, baseFetch, clearError }=useHttp();
    const getAllCharacters= async (offset=_baseOffsetChars)=>{
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformChar);
    }
    const getCharacter= async (id)=>{
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformChar(res.data.results[0]);
    }
    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformChar);
    }
    const getAllComics= async (offset=_baseOffsetChars)=>{
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getComic= async (id)=>{
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }
    
    return{loading, error,
            process, setProcess, 
            clearError,
            getCharacter, getCharacterByName, getAllCharacters, 
            getComic, getAllComics};
}

export const fetchMarvelService = () => {
    const fetchCharacter = async (id) => {
        const request2 = async(url, method="GET", body=null, headers={"Content-Type":"application/json"})=>{
            try{
                const res= await fetch(url, {method, body, headers});
                if(!res.ok){
                    throw new Error(`Cannot fetch ${url}. Status ${res.status}`)
                }
                const data= await res.json();
    
                return data;
            }
            catch(e){
                throw e;
            }
        }
        const res = await request2(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformChar(res.data.results[0]);
    }
    return{fetchCharacter};
}

export default useMarvelService;