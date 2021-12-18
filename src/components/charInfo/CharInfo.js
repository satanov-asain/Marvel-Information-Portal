import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton.js'

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
    constructor(props){
        super(props);
        
    }
    state={
        char:null,
        loading : false,
        error: false
    }
    componentDidMount(){
        this.updateCharInfo();
    }

    componentDidUpdate(prevProps){
        if(this.props.charId!==prevProps.charId){
            this.updateCharInfo();
        }
    }

    marvelService = new MarvelService();

    updateCharInfo=()=>{
        const {charId}=this.props;
        if(!charId){return;}

        this.onCharLoading();
        this.marvelService
        .getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    onCharLoading=()=>{
        this.setState({loading:true})
    }
    onCharLoaded=(char)=>{
        this.setState({char, loading:false});
    }
    onError=()=>{
        this.setState({
            loading:false,
            error:true
        })
    }

    
    render(){
        const {char, error, loading} = this.state;
        const skeleton=char||error||loading? null:<Skeleton/>;
        const errorMessage=error?<ErrorMessage/>:null;
        const spinner = loading?<Spinner/>:null;
        const content = (!error&&!loading)&&char?<View char={char}/>:null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View =({char})=>{

    const {name,description,thumbnail,homepage,wiki,comics}=char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
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

export default CharInfo;