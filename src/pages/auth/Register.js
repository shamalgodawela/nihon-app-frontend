import React, { useState } from 'react'
import "./login.css"
import { toast } from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../compenents/loader/Loader';


const initialState={
  name:"",
  email:"",
  password:"",
  password2:"",
} 

const Register = () => {
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [fromData, setfromData] = useState(initialState)
  const {name,email,password,password2}=fromData
  
  const handleInputChange=(e)=>{
    const {name, value}= e.target;
    setfromData({ ...fromData, [name]:value});

  };

const register= async(e)=>{
  e.preventDefault()
 if(!name || !email || !password){
  return toast.error("All field are required")
}

 if(password !== password2){
  return toast.error("Passwords do not match")

 }
 if(password.length <6 ){
  return toast.error("Passwords must be up to 6 characters")

 }
 if(!validateEmail){
  return toast.error("Please enter the valid  email")

 }
 const userData={
  name,email,password
 }
 setIsLoading(true)
 try {
  const data= await registerUser(userData)
  // console.log(data);
  await dispatch(SET_LOGIN(true))
  await dispatch(SET_NAME(data.name))
  navigate("/dashboard")
  setIsLoading(false)

  
 } catch (error) {
  setIsLoading(false)
  console.log(error.message);
  
 }


};

  return (
   
    <body className='body1'>
      {isLoading && <Loader/>}
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
       <h1 className='h1-login'>Nihon &nbsp; Inventory  &nbsp; System</h1>
       
       <br/><br/><br/><br/><br/><br/>
    <div id='register-form'>
      
      
        <form onSubmit={register}>
            <h2 className='h2-login' >Register</h2>
  <div class="mb-3">
    
  <input type="name" placeholder='Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name'value={name} onChange={handleInputChange}/>
   
    <input type="email" placeholder='Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"name='email'value={email} onChange={handleInputChange}/>
    
  </div>
  <div class="mb-3">
  <input type="password" placeholder='Password' className="form-control" id="exampleInputPassword1"name='password'value={password} onChange={handleInputChange}/>
  <input type="password" placeholder='Confirm Password' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"name='password2'value={password2} onChange={handleInputChange}/>
   
   
  </div>
  <button type="submit" className="btn btn-primary" id='login-btn'>Register Here</button><br/>
 
</form>


  <a href='forgot' className='a-login'>Forgot Password</a><br/>
  <a href='/' className='a-login'>Home</a><br/>
  <a href='/register' className='a-login'>Register</a>
    </div>
     

    </body>
  )
}

export default Register