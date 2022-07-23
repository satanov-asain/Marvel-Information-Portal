import {useState,useEffect, useRef, useMemo} from 'react';
import store from '../../redux/store'
import { apiChar } from '../../redux/api/apiChar';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchCharInfo} from '../../redux/slices/charSlice';
import { useGetAllCharactersQuery } from '../../redux/api/apiChar';

import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import setContent  from '../../utils/setContent';
import './charList.scss';

const getContent = setContent('list');

const CharList=(props)=> {
    const dispatch = useDispatch();

    const [charList,setCharList]=useState([]);
    const [newItemsLoading,setNewItemsLoading]=useState(false);
    const [offset,setOffset]=useState(210);
    const [charEnded,setCharEnded]=useState(false);

    const {
        currentData: characterList = [],
        isError,
        isLoading,
        isFetching
    } = useGetAllCharactersQuery(offset);

    let isItemsLoading = isLoading || isFetching;
    let isStatus = isLoading?'loading':isFetching?'loading':isError?'error':'confirmed';

    useEffect(()=>{
        if(isStatus === 'confirmed'){
            onRequest();
        }
        return () => {
            setCharList([]);
            setOffset(210);
            store.dispatch(apiChar.util.resetApiState());
        }
    },[]);
    useEffect(() => {
        if(isStatus === 'confirmed'){
            onRequest();}
    }, [isStatus])

    const onRequest=()=>{
        console.log('JUST Request');
        setNewItemsLoading(isStatus);
        onCharListLoaded(characterList);
    }

    const onCharListLoaded=(newCharList)=>{
        let ended = false;
        if(newCharList.length%9!=0){ended=true;}
        setCharList(charList=>charList.concat(characterList));
        setNewItemsLoading(isStatus);
        setCharEnded(ended);  
    }

    const itemRefs = useRef([]);
   
    const focusOnItem = (id, itemId) => {
        dispatch(fetchCharInfo(itemId));
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
                        onClick={()=>{props.onSelectedChar(item.id);
                                    focusOnItem(i, item.id);}}
                        onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
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
        let elements=useMemo(()=>{
            return charList?getContent(isStatus, ()=>renderItems(charList), newItemsLoading):null;
        },[isStatus, charList, offset, characterList]);
        
        return (
            <div className="char__list">
                <button
                style={{'padding':'20px', 'border':'solid red 5px'}}
                onClick={()=>{}}
                >HAPPY</button>
                {elements}    
                <button className="button button__main button__long"
                        disabled={isItemsLoading}
                        style={{'display': charEnded?'none':'block'}}
                        onClick={()=>setOffset(offset => offset+9)}>
                    <div className="inner">Подзагрузить</div>
                </button>
            </div>
        )       
}

CharList.propTypes={
    onSelectedChar:PropTypes.func
}

export default CharList;

