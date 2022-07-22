import {useState, useEffect, useRef} from 'react';
import store from '../../redux/store';
import { apiComic } from '../../redux/api/apiComic';
import { useDispatch } from 'react-redux';
import { fetchComicInfo } from '../../redux/slices/comicSlice';
import { useGetAllComicsQuery } from '../../redux/api/apiComic';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


import setContent from '../../utils/setContent';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

// const setContent=(process, Component, newItemsLoading)=>{
//     switch(process){
//         case 'waiting':
//             return <Spinner/>;
//             break;
//         case 'loading':
//             return newItemsLoading ? <Component/> : <Spinner/>;
//             break;
//         case 'confirmed':
//             return <Component/>;
//             break;
//         case 'error':
//             return <ErrorMessage/>
//             break;
//         default:
//             throw new Error('Unexpected process state');           
//     }
// }

const getContent = setContent('list');

const ComicsList = () => {
    const dispatch = useDispatch();

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, process, setProcess, getAllComics} = useMarvelService();
    const {
        data: comicsListQuery = [],
        isLoading,
        isFetching,
        isError,
        isSuccess
    } = useGetAllComicsQuery(offset);
    let isItemsLoading = isLoading || isFetching;
    let isStatus = isLoading?'loading':isFetching?'loading':isError?'error':'confirmed';
    
    useEffect(() => {
        if(isStatus === 'confirmed'){
            onRequest();
        }
        return () => {
            setComicsList([]);
            setOffset(0);
            store.dispatch(apiComic.util.resetApiState())
        }
    }, [])
    useEffect(() => {
        if(isStatus === 'confirmed'){
            onRequest();
        }
    },[isStatus])

    const onRequest = () => {
        setNewItemsLoading(isStatus);
        onComicsListLoaded(comicsListQuery);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length % 8 !== 0) {
            ended = true;
        }
        setComicsList(comicsList =>comicsList.concat(newComicsList));
        setNewItemsLoading(isStatus);
        setComicsEnded(ended);
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <CSSTransition key={i} timeout={500} classNames=''>
                    <li className="comics__item" key={i}
                        onClick={() => {dispatch(fetchComicInfo(item.id))}}
                        onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            dispatch(fetchComicInfo(item.id))
                            }
                        }} >
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        })
        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items} 
                </TransitionGroup>
            </ul>
        )
    }


    return (
        <div className="comics__list">
            {getContent(isStatus, ()=>renderItems(comicsList), isItemsLoading)}
            <button 
                disabled={isItemsLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => {setOffset(offset=>offset+8)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;  