import React, { useContext, useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
// import productContext from './context/Form_Context';


function UpdateForm() {

    
    const {id}=useParams()

    const [values,setValues]=useState({
      name:'',
      price:'',
      img:'',
      detail:''
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        // e.preventDefault()

        let name=e.target.name;
        let val=e.target.value;
       
    setValues((pre)=>
        ({
            ...pre,[name]:val
        }  
        )
    )

    }
//update data
    const handleSubmit=async(e)=>{
      console.log('submit')
      e.preventDefault();
 try{
  const response=await fetch(`http://localhost:5000/api/updateProduct/${id}`,{
    method:'PATCH',
    headers:{
  "Content-Type":'application/json'
    },
    body:JSON.stringify(values)
})
console.log(response)
 if(response.ok){
  
  setValues({
    name:'',
    price:'',
    img:'',
    detail:''
})
navigate('/Cards')
 }
    }

  catch(e){
    console.log('send error',e)
  }
}

//get singledata
const getOneData=async(id)=>{
    try{
      const response=await fetch(`http://localhost:5000/api/productsData/${id}`,{
        method:'GET',
        
    
    })
    
     if(response.ok){
      const res= await response.json()
  console.log('ok')
  setValues(res.data)
    
     }
        }
    
      catch(e){
        console.log('data not found',e)
      }
    }
  
useEffect(()=>{
getOneData(id)
},[])




  return (
   <>
   <form onSubmit={(e)=>{handleSubmit(e)}} className='container' encType="multipart/form-data" >
   <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input value={values.name} name='name' onChange={(e)=>{handleChange(e)}}  type="text" className="form-control" id="name"/>
  </div>

   <div className="mb-3">
    <label htmlFor="Age" className="form-label">price</label>
    <input value={values.price} name='price' onChange={(e)=>{handleChange(e)}} type="number" className="form-control" id="Age"/>
  </div>


  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
    <input value={values.img} name='img' onChange={(e)=>{setValues(e.target.files[0])}} accept='image/*' type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Details</label>
    <input value={values.detail} name='detail' onChange={(e)=>{handleChange(e)}} type="text" className="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary">Update Form</button>
</form>
   </>
  )
}


export default UpdateForm