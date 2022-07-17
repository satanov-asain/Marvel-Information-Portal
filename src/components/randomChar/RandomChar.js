import { useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage.js';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { fetchRandomChar } from '../../redux/store/charSlice';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

// const setContent=(status, Component, data)=>{
//     switch(status){
//         case 'idle':{
//             return (!data
//             ?<Skeleton/>
//             :<Component data={data}/>)
//         }
//             break;
//         case 'loading':
//             return <Spinner/>
//             break;
//         case 'error':
//             return <ErrorMessage/>
//         default:
//             throw new Error('Unexpected process state');
//     }
// }


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
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
}

const View = ({data})=>{
    const {name,description,thumbnail,thumbnailName,homepage,wiki}=data;
    
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
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;