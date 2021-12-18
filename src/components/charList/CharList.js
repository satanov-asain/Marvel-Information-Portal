import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

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
    
    render(){
        const {charList}=this.state;
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
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charItems}
                    {/* <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
   
}

export default CharList;