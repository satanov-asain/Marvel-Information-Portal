import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MainPage, ComicsPage , Page404, SingleComicPage} from "../pages";
import AppHeader from '../appHeader/AppHeader';

const App =()=>{

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route  path="/"
                                element={<MainPage/>}/>
                        <Route  path="/comics"
                                element={<ComicsPage/>}/>
                        <Route  path="/comics/:comicId"
                                element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>    
    )

}

export default App;



let myStr = "Satanov was born in Karaganda";

console.log(/karaganda/i.test(myStr));



function isPallindrom(word){
    word=word.toLowerCase().replace(/\s/g,'');
    
    return console.log(word===word.split('').reverse().join('') ?
        'Pallindrom':'Not');
}

isPallindrom("А роза             упала на лапу Азора");

