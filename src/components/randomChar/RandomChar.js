import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import setContent from '../../utils/setContent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomChar, charSetSingle } from '../../redux/slices/charSlice';

import './randomChar.scss';

const getContent = setContent('single');

const RandomChar=()=>{
    const dispatch = useDispatch();
    const {randomCharData, randomCharLoadingStatus} = useSelector(state => state.char);

    const [char,setChar]=useState({});
    
    useEffect(()=>{
        updateChar();
        const timerId = setInterval(updateChar(), 60000);
        return () => {
            clearInterval(timerId)
        }
    },[]);

    useEffect(() => {
        onCharLoaded(randomCharData);
    }, [randomCharData])

   
    const updateChar=()=>{
        const id=Math.floor(Math.random()*(1011400-1011000)+1011000);
        dispatch(fetchRandomChar(id));
        onCharLoaded(randomCharData);
    }
    
    const onCharLoaded=(char)=>{
        setChar(char);
    }

    return (
        <div className="randomchar">
            {getContent(randomCharLoadingStatus, View, char)}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Случайный персонаж на сегодня!<br/>
                    Хочешь разузнать о нём по-лучше?
                </p>
                <p className="randomchar__title">
                    Или выбери кого-нибудь ещё
                </p>
                <button className="button button__main"
                        onClick={updateChar}>
                    <div className="inner">попробуй это</div>
                </button>
            </div>
        </div>
    )
    
}

const View = ({data})=>{
    const dispatch = useDispatch()
    const {randomCharLoadingStatus, randomCharId, randomCharData} = useSelector(state => state.char)
    const {name,description,thumbnail,thumbnailName,homepage,wiki, id}=data;
    const payload = {
        data: randomCharData,
        id: randomCharId,
        status: randomCharLoadingStatus}
    let imgStyle=/image_not_available/.test(thumbnail)?
        {'objectFit':'unset'}:{'objectFit':'cover'};
   
    return(
    <div className="randomchar__block">
        <img src={thumbnail} style={imgStyle} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
                
            </p>
            <div className="randomchar__btns">
                <Link to={`/characters/${id}`} className="button button__main">
                    <div className="inner"
                        onClick={() => {dispatch(charSetSingle(payload))}}>На страницу</div>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;