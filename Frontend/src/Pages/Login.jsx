import React, { useState } from 'react'
import '../Pages/CSS/Login.css'

const Login = () => {

  const [state, setState] = useState("Login")
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const login = async()=>{
    console.log("Login fn executed",formData)
    let responseData;
    await fetch("http://localhost:3000/Login",{
      method:"POST",
      headers:{
        Accept:"application/formData",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    .then((res)=>res.json())
    .then((data)=>responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/");
    }else{
      alert(responseData.error)
    }
    
  }

  const signup = async()=>{
    console.log("signup fn executed",formData)
    let responseData;
    await fetch("http://localhost:3000/signup",{
      method:"POST",
      headers:{
        Accept:"application/formData",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    .then((res)=>res.json())
    .then((data)=>responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/");
    }else{
      alert(responseData.error)
    }
    
  }

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }



  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input type="text" 
          name="username"
          value={formData.username}
          onChange={changeHandler}
          placeholder="Your Name" />:<></>}
          <input type="email" 
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Email Address" />
          <input type="password" name="password"
          value={formData.password}
          onChange={changeHandler}
          placeholder='Your Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className="loginsignup-login">Already have a account? <span onClick={()=>{setState("Login")}}>Login here</span></p>:<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}       
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default Login