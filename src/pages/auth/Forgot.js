import React, { useState } from 'react'
import "./login.css"
import { FaMailBulk } from "react-icons/fa";
import { forgotPassword, validateEmail } from '../../services/authService';
import { toast } from 'react-toastify';

       

const Forgot = () => {
  const [email, setEmail]=useState("")

  const forgot=async(e)=>{
    e.preventDefault();

    if(!email){
      return toast.error("please enter Email")
    }
    if(!validateEmail(email)){
      return toast.error("Please enter the valid  email")
    
     }
     const userData={
      email,
     
     };

     await forgotPassword(userData)
     setEmail("")

  }

  return (
   
    <body className='body1'>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
       
       
       <br/><br/><br/><br/><br/><br/>
    <div id='login-form'>
      
      
        <form onSubmit={forgot}>
          <div className='icon-mail'>
          <FaMailBulk size={35}/>

          </div>
            <h2 className='h2-login' >Forgot Password </h2>
  <div class="mb-3">
   
    <input type="email" placeholder='Email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"name='email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <button type="submit" className="btn btn-primary" id='login-btn'>Get Reset Email</button><br/>
</form>

  

  <a href='/' className='a-login'>-Home</a>
  <a href='/login' className='a-login' id='forgot-l'>-Login</a>
    </div>

     
    </body>
  )
}

export default Forgot;