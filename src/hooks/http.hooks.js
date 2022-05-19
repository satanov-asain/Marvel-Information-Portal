import { useCallback, useState } from "react";

const useHttp=()=>{
    let [loading, setLoading]=useState(false);
    let [error, setError]=useState(false);
    let [process, setProcess]=useState('waiting');

    const request = useCallback(async(url, method="GET", body=null, headers={"Content-Type":"application/json"})=>{
        setLoading(true);
        setProcess('loading');
        try{
            const res= await fetch(url, {method, body, headers});
            if(!res.ok){
                throw new Error(`Cannot fetch ${url}. Status ${res.status}`)
            }
            const data= await res.json();
            setLoading(false);
            return data;
        }
        catch(e){
            setLoading(false);
            setError(true);
            setProcess('error');
            throw e;
        }
    },[])

    const clearError=useCallback(()=>{
        setError(false);
    },[])

    return{loading, error, 
            process, setProcess, 
            request, 
            clearError};
  
}

export default useHttp;