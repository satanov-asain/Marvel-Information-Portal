import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage=()=>{  
    return(
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList/>
                    </ErrorBoundary>
                    <div>
                        <ErrorBoundary>
                            <CharInfo />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharSearchForm/>
                        </ErrorBoundary>
                    </div>
                </div>        
        </>
    )
}

export default MainPage;


