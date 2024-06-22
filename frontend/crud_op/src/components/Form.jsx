import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Form() {
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
    axios.defaults.withCredentials = true;

    const handleSubmit=async(e)=>{
      // console.log(values.img)
      e.preventDefault();
  try{
    const formData=new FormData()
    formData.append("img",values.img)
    formData.append("name",values.name)
    formData.append("price",values.price)
    formData.append("detail",values.detail)


axios.post(
"http://localhost:5000/api/createProduct",
formData,{
  headers:{
    "Content-Type":"multipart/form-data"
  },
  credentials: 'include'

}
).then(res=>console.log(res)
).then(
  
setValues({
  name:'',
  price:'',
  img:'',
  detail:''
})
).then(
  
    navigate('/Cards')

)


  }catch(e){
    console.log('err',e)
  }
    }



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
    <input accept='image/*'  type="file"  name='img' onChange={(e)=>setValues(pre=>{return {...pre,[e.target.name]:e.target.files[0]}})}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Details</label>
    <input value={values.detail} name='detail' onChange={(e)=>{handleChange(e)}} type="text" className="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
   </>
  )
}

export default Form

