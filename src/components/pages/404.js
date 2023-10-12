import { Link } from "react-router-dom"
import img from '../../resources/img/notFound.jpg';
const Page404=()=>{
    return(
        <div className="notFound">
            <Link 
            className="inner"
            style={{'display':'block'}}
            to="/">
                <img src={img} alt='page not found'>
                  </img>
            </Link>
        </div>
    )
}
export default Page404;