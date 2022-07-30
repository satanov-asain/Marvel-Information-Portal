import { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import setContent from '../../utils/setContent';

import { useSelector, useDispatch } from 'react-redux';
import { charSetSingle } from '../../redux/slices/charSlice';
import { fetchComicInfo } from '../../redux/slices/comicSlice';

import './charInfo.scss';

const getContent = setContent('single');

const CharInfo = () => {

    const {charData, charLoadingStatus} = useSelector(state => state.char);

    const [char,setChar]=useState(null);

    useEffect(()=>{
        updateCharInfo();
    },[]);

    useEffect(()=>{
            updateCharInfo();
    },[charData])

    const updateCharInfo=()=>{
        if(!charData){return;}  
        onCharLoaded(charData);      
    }

    const onCharLoaded=(char)=>{
        setChar(char);
    }
    
    return (
        <div className="char__info">
            {getContent(charLoadingStatus, View, char)}
        </div>
    )
}

const View =({data})=>{

    const dispatch = useDispatch();
    const {charLoadingStatus} = useSelector(state => state.char);
    const {name,description,thumbnail,homepage,wiki,comics,id}=data;

    const payload = {data, id, status: charLoadingStatus}
    let imgStyle=/image_not_available'/.test(thumbnail)?
        {'objectFit':'contain'}:{'objectFit':'cover'};
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} style={imgStyle} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                    <Link to={`/characters/${id}`} className="button button__main">
                                <div className="inner"
                                    onClick={() => {dispatch(charSetSingle(payload))}}>На страницу</div>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Комиксы:</div>
            <ul className="char__comics-list">
                {comics.length>0?null:"К сожалению комиксы по данному персонажу отсутсвуют"}
                {
                    comics.map((item,i)=>{
                        if(i>9) return;
                        let comicId = item.resourceURI.split('/').splice(-1);
                        return(
                        <li className="char__comics-item" key ={i}>
                            <Link to={`/comics/${id}`} className="">
                                <div className="inner"
                                    onClick={() => {dispatch(fetchComicInfo(comicId))}}>{item.name}</div>
                            </Link>
                        </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;