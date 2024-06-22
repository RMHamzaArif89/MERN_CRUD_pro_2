import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'



function Login() {
    const [values,setValues]=useState({
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

    const handleLogin=async(e)=>{
      console.log('login',values)
      e.preventDefault();
 try{
  const response=await fetch('http://localhost:5000/api/login',{
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
    email:'',
    password:''
})
navigate("/cards")
 }else{
    console.log('login error')
 }
    }

  catch(e){
    console.log('login error',e)
  }
}

  return (
   <>
   <form onSubmit={(e)=>{handleLogin(e)}} className='container' >



  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input value={values.email} name='email' onChange={(e)=>{handleChange(e)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input value={values.password} name='password' onChange={(e)=>{handleChange(e)}} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary">Login</button>
</form>
   </>
  )
}

export default Login
