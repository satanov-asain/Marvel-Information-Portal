import {useState, useEffect} from 'react';
import store from '../../redux/store';
import { apiComic } from '../../redux/api/apiComic';
import { useDispatch } from 'react-redux';
import { fetchComicInfo } from '../../redux/slices/comicSlice';
import { useGetAllComicsQuery } from '../../redux/api/apiComic';
import { Link } from 'react-router-dom';

import setContent from '../../utils/setContent';
import './comicsList.scss';

const getContent = setContent('list');

const ComicsList = () => {
    const dispatch = useDispatch();

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {
        data: comicsListQuery = [],
        isLoading,
        isFetching,
        isError
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
        onComicsListLoaded(comicsListQuery);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length % 8 !== 0) {
            ended = true;
        }
        setComicsList(comicsList =>comicsList.concat(newComicsList));
        setComicsEnded(ended);
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
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
            )
        })
        return (
            <ul className="comics__grid">
                    {items} 
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
                <div className="inner">Подзагрузить</div>
            </button>
        </div>
    )
}

export default ComicsList;  