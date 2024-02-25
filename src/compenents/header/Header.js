import React from 'react'
import  styles from "./header.css"
import { logoutUser } from '../../services/authService'
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const name=useSelector(selectName)

  const logout=async()=>{
   
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login")

  }
  return (
    <div className='--pad header'>
        <div className='--flex-between'>
        <h3>
            <span className='--fw-thin' id='wel'>Welcome,{name} </span>
            {/* <span className='--color-danger' id='wel-name'>Shamal </span> */}
        </h3>
        <button onClick={logout} className='--btn --btn-danger' >Logout</button>
        </div>
        <hr/>
    </div>

  )
}

export default Header