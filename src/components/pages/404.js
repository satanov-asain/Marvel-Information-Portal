import { Link } from "react-router-dom"
import img from '../../resources/img/notFound.jpg';
const Page404=()=>{
    return(
        <div>
            <Link 
            style={{'display':'block'}}
            to="/">
                <img src={img}
                  style={{'display':'block','margin':'0 auto', 'height':'35%','width':'35%'}}></img>
            </Link>
        </div>
    )
}
export default Page404;