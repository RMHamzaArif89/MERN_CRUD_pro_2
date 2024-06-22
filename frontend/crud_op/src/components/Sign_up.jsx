import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Sign_up() {
    const [values,setValues]=useState({
        name:'',
        age:'',
        email:'',
        password:''

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

    const handleSubmit=async(e)=>{
      console.log('submit')
      e.preventDefault();
 try{
  // fetch(url, {  
  //   // ...
    
  // })
  const response=await fetch('http://localhost:5000/api/signup',{
    method:'POST',
    headers:{
  "Content-Type":'application/json'
    },
    body:JSON.stringify(values),
    credentials: 'include'  
})
console.log(response)
 if(response.ok){
  
  setValues({
    name:'',
    age:'',
    email:'',
    password:''
})
navigate('/login')
 }
    }

  catch(e){
    console.log('signup',e)
  }
}

  return (
   <>
   <form onSubmit={(e)=>{handleSubmit(e)}} className='container' >
   <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input value={values.name} name='name' onChange={(e)=>{handleChange(e)}}  type="text" className="form-control" id="name"/>
  </div>

   <div className="mb-3">
    <label htmlFor="Age" className="form-label">Age</label>
    <input value={values.age} name='age' onChange={(e)=>{handleChange(e)}} type="text" className="form-control" id="Age"/>
  </div>


  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input value={values.email} name='email' onChange={(e)=>{handleChange(e)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={values.password} name='password' onChange={(e)=>{handleChange(e)}} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
   </>
  )
}

export default Sign_up
