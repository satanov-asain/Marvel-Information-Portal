import { Link } from "react-router-dom"
import './404.scss';
import img from '../../resources/img/notFound.jpg';

const Page404=()=>{
    return(
        <div className="notFound">
            <Link 
            className="inner"
            style={{'display':'block'}}
            to="/">
                <img src={img}
                  ></img>
            </Link>
        </div>
    )
}
export default Page404;