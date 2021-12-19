

class MarvelService{
    _apibase='https://gateway.marvel.com:443/v1/public/';
    _apikey='apikey=531082be7ba2891c77469570d4d4606b';
    _baseOffsetChars=210;
    getRecource= async (url) =>{
        let res= await fetch(url);

        if(!res.ok){
            throw new Error(`Cannor fetch ${url}, status: ${res.status}`); 
        }

        return await res.json();
    }

    getAllCharacters= async (offset=this._baseOffsetChars)=>{
        const res = await this.getRecource(`${this._apibase}characters?limit=9&offset=${offset}&${this._apikey}`);
        return res.data.results.map(this._transformChar);
    }

    getCharacter= async (id)=>{
        const res = await this.getRecource(`${this._apibase}characters/${id}?${this._apikey}`);
        return this._transformChar(res.data.results[0]);
    }
    _transformChar=(char)=>{
        let charDescription=null;
        let cdl=char.description.length;
        if(cdl==0){
            charDescription='К сожалению, описание к данному Герою отсутсвует';
        }
        if(cdl>=200){
            charDescription=`${char.description.slice(0,199)}...`;
        }
        if(cdl>0&&cdl<200){
            charDescription=char.description;
        }
        
        return  {
            id:char.id,
            name:char.name,
            description:charDescription,
            thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
            thumbnailName:char.thumbnail.path,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics:char.comics.items,
            
        };
    }
}

export default MarvelService;
