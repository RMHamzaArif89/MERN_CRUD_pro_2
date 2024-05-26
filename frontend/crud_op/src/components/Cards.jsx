import React, { useContext, useEffect } from 'react'
import './cards.css'
import productContext from './context/Form_Context'

function Users() {
    const {productData,getData}=useContext(productContext)


    useEffect(()=>{
      getData()
    },[])


    const deleteProduct=async(id)=>{
      
          try{
            const response=await fetch(`http://localhost:5000/api/deleteProduct/${id}`,{
              method:'DELETE',
              headers:{
            "Content-Type":'application/json'
              },
              // body:JSON.stringify(values)
          })
          // console.log(response)
          const data=await response.json()
           if(response.ok){
            
           getData()
           }
              }
          
            catch(e){
              console.log('products error',e)
            }
      }
    



   

  return (
    <div className='products'>
      {
        productData.map((product)=>{
            // cosnt{name,email,age}=product
           return(
            <div className="products-card">
            <div className="products-name">{product.name}</div>
            <div className="products-price">{product.email}</div>
            <div className="products-detail">{product.age}</div>
            <div className="edit">Edit</div>
            <div className="delete" onClick={()=>deleteProduct(product._id)}>Delete</div>
            </div>
           )
        })
      }
      
    </div>
  )
}

export default Users

