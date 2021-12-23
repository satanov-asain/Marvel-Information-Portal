import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton.js'

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

const CharInfo=(props)=>{
    const [char,setChar]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    useEffect(()=>{
        updateCharInfo();
    },[]);

    useEffect(()=>{
            updateCharInfo();
        },[props.charId])

    const marvelService = new MarvelService();

    const updateCharInfo=()=>{
        const {charId}=props;
        if(!charId){return;}

        onCharLoading();
        marvelService
        .getCharacter(charId)
        .then(onCharLoaded)
        .catch(onError)

        
    }

    const onCharLoading=()=>{
        setLoading(true);
    }
    const onCharLoaded=(char)=>{
        setChar(char);
        setLoading(false);
    }

    const onError=()=>{
        setLoading(false);
        setError(true);
    }

    

    
    const skeleton=char||error||loading? null:<Skeleton/>;
    const errorMessage=error?<ErrorMessage/>:null;
    const spinner = loading?<Spinner/>:null;
    const content = (!error&&!loading)&&char?<View char={char}/>:null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View =({char})=>{

    const {name,description,thumbnail,homepage,wiki,comics}=char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    return(
        <>
            <div className="char__basics">
                    <img src={thumbnail} style={imgStyle} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                   {comics.length>0?null:"К сожалению комиксы по данному персонажу отсутсвуют"}
                   {
                       comics.map((item,i)=>{
                           if(i>9) return;
                           return(
                            <li className="char__comics-item" key ={i}>
                                {item.name}
                            </li>
                           )
                       })
                   }
                </ul>
        </>
    )
}

CharInfo.propTypes={
    charId: PropTypes.number
}

export default CharInfo;