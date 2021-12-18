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
            error:false

        }
    }
    componentDidMount(){
        this.updateCharList();
    }
    
    marvelService = new MarvelService();
    updateCharList=()=>{
        this.onCharLoading();
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharLoading=()=>{
        this.setState({loading:true})
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
        const {charList,error,loading}=this.state;
    

       const items = this.renderItems(charList);

       const errorMessage= error?<ErrorMessage/>:null;
       const spinner = loading?<Spinner/>:null;
       const content = !(error||loading)?items:null;
        return (
            <div className="char__list">
                
                    {errorMessage}
                    {spinner}
                    {content}
                
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

export default CharList;