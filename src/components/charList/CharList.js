import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    constructor(props){
        super(props);
        this.state={
            charList:[],
            loading:true,
            error:false

        }
    }
    componentDidMount(){
        this.loadCharList();
    }
    marvelService = new MarvelService();
    loadCharList=()=>{
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }
    onCharListLoaded=(charList)=>{
        this.setState({charList, loading:false});
    
    }
    onError=()=>{
        this.setState({
            loading:false,
            error:true
        })
    }
    
    render(){
        const {charList,error,loading}=this.state;
       const charItems=charList.map(item=>{

        let imgStyle=''
        if(item.thumbnailName.slice(-19).includes('image_not_available')){
            imgStyle={width: "200px",
                    height: "200px",
                    objectFit: "contain",
                    transform: 'translate(-15px, -15px)'};
        }
        else{ imgStyle={width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        transform: 'translate(-15px, -15px)'};
            }
            
          return (
               <li className="char__item">
              <img src={item.thumbnail} style={imgStyle} alt="abyss"/>
              <div className="char__name">{item.name}</div>
          </li>
          )
       })

       const errorMessage= error?<ErrorMessage/>:null;
       const spinner = loading?<Spinner/>:null;
       const content = !(error||loading)?charItems:null;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

export default CharList;