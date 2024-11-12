import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useGet = (url) => {
      const [data, setData] = useState([]);
      const [loader, setLoader] = useState(false)
      const [error, setError] = useState("")
  const fetchdata = async () =>{
        try {
            setLoader(true)
            const res = await axios.get(url)
            setData(res?.data);
            
      } catch (error) {
            setLoader(false)
            setError(error?.message);
      }finally {
            setLoader(false)
      }
  }
  
  useEffect(() => {
      fetchdata();
  }, [url])

  return {data, loader, error};
  
}

export default useGet