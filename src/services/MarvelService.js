

class MarvelService{
    _apibase='https://gateway.marvel.com:443/v1/public/';
    _apikey='apikey=531082be7ba2891c77469570d4d4606b';
    getRecource= async (url) =>{
        let res= await fetch(url);

        if(!res.ok){
            throw new Error(`Cannor fetch ${url}, status: ${res.status}`); 
        }

        return await res.json();
    }

    getAllCharacters=()=>{
        return this.getRecource(`${this._apibase}characters?limit=9&offset=210&${this._apikey}`);
    }

    getCharacter=(id)=>{
        return this.getRecource(`${this._apibase}characters/${id}?${this._apikey}`);
    }

}

export default MarvelService;
