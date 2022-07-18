import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton.js';

const setContent=(amount)=>{

    switch(amount){
        case 'single':
            return(
                (status, Component, data) => {
                    switch(status){
                        case 'idle':{
                            return (!data
                            ?<Skeleton/>
                            :<Component data={data}/>)
                        }
                            break;
                        case 'loading':
                            return <Spinner/>
                            break;
                        case 'error':
                            return <ErrorMessage/>
                        default:
                            throw new Error('Unexpected process state');
                    }
                }
                
            );
            
        case 'list':
            return(
                (status, Component, newItemsLoading) => {
                    switch(status){
                        case 'waiting':
                            return <Spinner/>
                        case 'loading': 
                            return newItemsLoading? <Component/>:<Spinner/>;
                        case 'confirmed':
                            return <Component/>
                        case 'error':
                            return <ErrorMessage/>
                        default:
                            throw new Error('Unexpected process state');
                    }
                }
            );
            
            case 'page':
                return(
                    (status, Component, data) => {
                        switch(status){
                            case 'idle':{
                                return (!data
                                ?<Skeleton/>
                                :<Component data={data}/>)
                            }
                                break;
                            case 'loading':
                                return <Spinner/>
                                break;
                            case 'error':
                                return <ErrorMessage/>
                            default:
                                throw new Error('Unexpected process state');
                        }
                    }
                    
                );
                
            default:
                throw new Error('Unexpected process state');
    }


}

export default setContent;

// const setContent=(status, Component, data)=>{
//     switch(status){
//         case 'idle':{
//             return (!data
//             ?<Skeleton/>
//             :<Component data={data}/>)
//         }
//             break;
//         case 'loading':
//             return <Spinner/>
//             break;
//         case 'error':
//             return <ErrorMessage/>
//         default:
//             throw new Error('Unexpected process state');
//     }
// }

// switch(process){
//     case 'waiting':
//         return <Skeleton/>;
//         break;
//     case 'loading':
//         return <Spinner/>
//         break;
//     case 'confirmed':
//         return <Component data={data}/>
//         break;
//     case 'error':
//         return <ErrorMessage/>
//     default:
//         throw new Error('Unexpected process state');
// }