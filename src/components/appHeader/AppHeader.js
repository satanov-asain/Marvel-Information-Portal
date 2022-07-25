import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title"
                name="Marvel information portal">
                <Link to="/">
                    <span>Марвел</span> информационный портал
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink end 
                    style={({isActive})=>({color:isActive?'#9F0013':'inherit'})}
                    to="/"><span>Персонажи</span></NavLink></li>
                    /
                    <li><NavLink 
                    style={({isActive})=>({color:isActive?'#9F0013':'inherit'})}
                    to="/comics"><span>Комиксы</span></NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;