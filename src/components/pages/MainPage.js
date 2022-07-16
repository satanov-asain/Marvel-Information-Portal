import { useState } from "react";
import { Provider } from "react-redux";
import store from "../../store";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";



import decoration from '../../resources/img/vision.png';


const MainPage=()=>{
    
    let [charId, setCharacter]=useState(null);

    const onSelectedChar=(id)=>{
       setCharacter(id)
    }

    return(
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <Provider store={store}>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onSelectedChar={onSelectedChar}/>
                    </ErrorBoundary>
                    <div>
                        <ErrorBoundary>
                            <CharInfo charId={charId}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharSearchForm/>
                        </ErrorBoundary>
                    </div>

                </div>
            </Provider>
            
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;


