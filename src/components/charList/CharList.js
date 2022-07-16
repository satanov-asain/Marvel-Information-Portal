import {useState,useEffect, useRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import { useDispatch, useSelector} from 'react-redux';
import { fetchCharInfo, changeCharId} from '../../store/charSlice';


import './charList.scss';

const setContent=(process, Component, newItemsLoading)=>{
    switch(process){
        case 'waiting':
            return <Spinner/>
        case 'loading': 
            return newItemsLoading? <Component/>:<Spinner/>;
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList=(props)=> {
    const dispatch = useDispatch();
    const {charId, charLoadingStatus} = useSelector(state => state.char);

    

    const {loading,error, process, setProcess, getAllCharacters,clearError} = useMarvelService();

    const [charList,setCharList]=useState([]);
    const [newItemsLoading,setNewItemsLoading]=useState(false);
    const [offset,setOffset]=useState(210);
    const [charEnded,setCharEnded]=useState(false);

    useEffect(()=>{onRequest(offset, true)
    },[]);
    
    const onRequest=(offset,initial)=>{
        clearError();
        setNewItemsLoading(initial?false:true);
        getAllCharacters(offset)
        .then(onCharListLoaded)
        .then(()=>setProcess('confirmed'));
    }

    const onCharListLoaded=(newCharList)=>{
        let ended = false;
        if(newCharList.length<9){ended=true;}

        setCharList(charList=>[...charList, ...newCharList]);
        setNewItemsLoading(false);
        setOffset(offset=>offset+9);
        setCharEnded(ended);   
    }

    const itemRefs = useRef([]);
   
    const focusOnItem = (id, itemId) => {
        dispatch(changeCharId(itemId));
        alert(charId);
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    
    const renderItems=(arr)=> {
        const items =  arr.map((item,i) => {
            let imgStyle=/image_not_available/.test(item.thumbnail)?
            {'objectFit':'unset'}:{'objectFit':'cover'};
            
            return (
                <CSSTransition key={item.id} timeout={500} classNames='char__item'>
                    <li 
                        className="char__item"
                        key={item.id}
                        tabIndex={0}
                        ref={elem=>itemRefs.current[i]=elem}
                        // onClick={()=>dispatch(fetchCharInfo(item.id))}
                        onClick={()=>{
                            
                            focusOnItem(i, item.id);}}
                        onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                           
                            focusOnItem(i, item.id);
                            }
                        }}                    
                        >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
        // const elements=useMemo(()=>{
        //     return setContent(process, ()=>renderItems(charList), newItemsLoading);
        // },[process]);
        const elements = renderItems(charList);
        return (
            <div className="char__list">
                {elements}    
                <button className="button button__main button__long"
                        disabled={newItemsLoading}
                        style={{'display': charEnded?'none':'block'}}
                        onClick={()=>onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

CharList.propTypes={
    onSelectedChar:PropTypes.func
}

export default CharList;


