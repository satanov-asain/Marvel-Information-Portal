import {useState,useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { render } from 'react-dom';

const CharList=(props)=> {

    const [charList,setCharList]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    const [newItemsLoading,setNewItemsLoading]=useState(false);
    const [offset,setOffset]=useState(210);
    const [charEnded,setCharEnded]=useState(false);

    useEffect(()=>{onRequest()
    },[]);
    
    const marvelService = new MarvelService();
  
    const onRequest=(offset)=>{
        onCharListLoading();
        marvelService
        .getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError)
    }

    const onCharListLoading=()=>{
        setNewItemsLoading(true);
    }
    const onCharListLoaded=(newCharList)=>{
        let ended = false;
        if(newCharList.length<9){ ended=true;}

        setCharList(charList=>[...charList, ...newCharList]);
        setLoading(loading=>false);
        setNewItemsLoading(setNewItemsLoading=>false);
        setOffset(offset=>offset+9);
        setCharEnded(charEnded=>ended);
    
    }
    const onError=()=>{
        setLoading(false);
        setError(true);
    }
    const itemRefs = useRef([]);

    
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    
    const renderItems=(arr)=> {
        const items =  arr.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    tabIndex={0}
                    ref={elem=>itemRefs.current[i]=elem}
                    onClick={()=>{props.onSelectedChar(item.id);
                                  focusOnItem(i);}}

                    onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                        }
                    }}                    
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

       const items = renderItems(charList);

       const errorMessage= error?<ErrorMessage/>:null;
       const spinner = loading?<Spinner/>:null;
       const content = !(error||loading)?items:null;
        return (
            <div className="char__list">
                
                    {errorMessage}
                    {spinner}
                    {content}
                
                <button className="button button__main button__long"
                        disabled={newItemsLoading}
                        style={{'display': charEnded?'none':'block'}}
                        onClick={()=>this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
   
}

CharList.propTypes={
    onSelectedChar:PropTypes.func
}

export default CharList;