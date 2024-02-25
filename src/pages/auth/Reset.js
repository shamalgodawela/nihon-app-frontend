import React, { useState } from 'react'
import "./login.css"
import { MdPassword } from "react-icons/md";
import {useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';



const initialState={

 
  password:"",
  password2:"",

} 

const Reset = () => {
  const navigate=useNavigate()

  const [fromData, setfromData] = useState(initialState)
  const {password,password2}=fromData;

  const {resetToken}=useParams()

  const handleInputChange=(e)=>{
    const {name, value}= e.target;
    setfromData({ ...fromData, [name]:value});

  };

  const reset=async(e)=>{
    e.preventDefault()

    if(password.length <6 ){
      return toast.error("Passwords must be up to 6 characters")
    
  }
  
 if(password !== password2){
  return toast.error("Passwords do not match")

 };

 const userData={
  password,
  password2
 }
 try {
  const data=await resetPassword(userData,resetToken)
  toast.success(data.message)
  navigate("/login")
 } catch (error) {
  console.log(error.message);
 }
};

  return (
   
    <body className='body1'>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
       
       
       <br/><br/><br/><br/><br/><br/>
    <div id='login-form'>
      
      
        <form onSubmit={reset}>
          <div className='icon-resetpass'>
        

          </div>
          <div className='icon-resetpass'>

          <MdPassword size={35}/>
          </div>
            <h2 className='h2-login' >Reset Password </h2><br/>
  <div class="mb-3">
   
   <input type="password" placeholder='New Password' className="form-control" id="exampleInputPassword1"name='password'value={password} onChange={handleInputChange}/><br/>
   <input type="password" placeholder='Confirm Password' className="form-control" id="exampleInputPassword1"name='password2'value={password2} onChange={handleInputChange}/>
 </div>
 <button type="submit" className="btn btn-primary" id='login-btn'>Reset Password</button><br/>
 
</form>

  

  <a href='/' className='a-login'>-Home</a>
  <a href='/login' className='a-login' id='forgot-l'>-Login</a>
    </div>

     
    </body>
  )
}

export default Reset;