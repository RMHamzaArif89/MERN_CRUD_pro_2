import React, { useEffect } from 'react'
import { createContext, useState } from 'react';

const productContext = createContext(null);


export const ContextProvider=({children})=>{
  const  [productData,setProductData]=useState([])
    



    const getData=async()=>{
      try{
        const response=await fetch('http://localhost:5000/api/productsData',{
          method:'GET',
      
      })
      
       if(response.ok){
        const res= await response.json()
        
        
        
    setProductData(res.data)
      
       }
          }
      
        catch(e){
          console.log('data not found',e)
        }
      }
    



    useEffect(()=>{
      getData()
    },[])


    



  return(
    <productContext.Provider value={{productData,getData}}>
    {children}
</productContext.Provider>
  )

}

export default productContext;