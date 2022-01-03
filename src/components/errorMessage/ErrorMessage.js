import img from './ErrorMessage.gif';

const ErrorMessage=()=>{
    return(
        <img src={img } alt='Error' style={{objectFit:'contain',display:'block', width:'250px',height:'250px', margin:'0 auto'}}/>
    )
}

export default ErrorMessage;