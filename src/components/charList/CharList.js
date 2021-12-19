import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { render } from 'react-dom';

class CharList extends Component {
    constructor(props){
        super(props);
        this.state={
            charList:[],
            loading:true,
            error:false,
            newItemsLoading: false,
            offset:210,
            charEnded:false

        }
    }
    componentDidMount(){
        this.onRequest();
    }
    
    marvelService = new MarvelService();
  
    onRequest=(offset)=>{
        this.onCharListLoading();
        this.marvelService
        .getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onCharListLoading=()=>{
        this.setState({newItemsLoading:true})
    }
    onCharListLoaded=(newCharList)=>{
        let ended = false;
        if(newCharList.length<9){ ended=true;}

        this.setState(({charList,offset})=>({
                    charList:[...charList, ...newCharList],
                    loading:false,
                    newItemsLoading:false,
                    offset: offset + 9,
                    charEnded:ended
                })
        );
    
    }
    onError=()=>{
        this.setState({
            loading:false,
            error:true
        })
    }
    
    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={()=>this.props.onSelectedChar(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render(){
        const {charList,error,loading,charEnded,offset,newItemsLoading}=this.state;
    

       const items = this.renderItems(charList);

       const errorMessage= error?<ErrorMessage/>:null;
       const spinner = loading?<Spinner/>:null;
       const content = !(error||loading)?items:null;
        return (
            <div className="char__list">
                
                    {errorMessage}
                    {spinner}
                    {content}
                
                <button className="button button__main button__long"
                        disabled={newItemsLoading}
                        style={{'display': charEnded?'none':'block'}}
                        onClick={()=>this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

export default CharList;