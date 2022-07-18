import { useState, useEffect, useDebugValue} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import setContent from '../../utils/setContent';

import { useSelector } from 'react-redux';

import './charInfo.scss';

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


const CharInfo = (props) => {

    const {charData, charLoadingStatus} = useSelector(state => state.char);

    const [char,setChar]=useState(null);

    useEffect(()=>{
        updateCharInfo();
    },[]);

    useEffect(()=>{
            updateCharInfo();
        },[props.charId, charData])

    const updateCharInfo=()=>{
        if(!charData){return;}  
        onCharLoaded(charData);
        
    }

    const onCharLoaded=(char)=>{
        setChar(char);
    }
    
    // const skeleton=char||error||loading? null:<Skeleton/>;
    // const errorMessage=error?<ErrorMessage/>:null;
    // const spinner = loading?<Spinner/>:null;
    // const content = (!error&&!loading)&&char?<View char={char}/>:null;


    return (
        <div className="char__info">
            {getContent(charLoadingStatus, View, char)}
            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
        </div>
    )

}

const View =({data})=>{

    const {name,description,thumbnail,homepage,wiki,comics}=data;
    let imgStyle=/image_not_available'/.test(thumbnail)?
        {'objectFit':'contain'}:{'objectFit':'cover'};
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