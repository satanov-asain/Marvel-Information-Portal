import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import store from '../../store';
import { fetchCharInfo } from '../../store/charSlice';

import { useSelector, useDispatch } from "react-redux";



import './charInfo.scss';

const CharInfo=(props)=>{
    const [char,setChar]=useState(null);
    const {process, setProcess, clearError, getCharacter}=useMarvelService();

    const {charId, charData, charLoadingStatus} = useSelector(state => state.char);
    const dispatch = useDispatch();

    useEffect(()=>{
        updateCharInfo();
    },[]);

    useEffect(()=>{
            updateCharInfo();
        },[props.charId])

    useEffect(() => {
        console.log(charLoadingStatus);
        dispatch(fetchCharInfo(charId));
        console.log(charLoadingStatus);
        console.log(charData);
        
        updateCharInfo();
    }, [charId])

    // const updateCharInfo=()=>{
    //     clearError();
    //     const {charId}=props;
    //     if(!charId){return;}
    //     getCharacter(charId)
    //     .then(onCharLoaded)
    //     .then(()=>setProcess('confirmed'));
    // }

    const updateCharInfo= () => {
        clearError();
        // if(!charId){return;}
        // fetchCharInfo(charId);
        setChar(charData);
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
            {/* <View data = {char}/> */}
            {setContent(process, View, char)}
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
                        <li className="char__comics-item" key = {i}>
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