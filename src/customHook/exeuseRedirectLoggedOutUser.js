// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { SET_LOGIN } from '../redux/features/auth/authSliceExe'
// import { getLoginStatus } from '../services/authServiceExe'



// const exeuseRedirectLoggedOutUser = (path) => {
//     const dispatch =useDispatch()
//     const navigate=useNavigate()

//     useEffect(()=>{
//         const redirectLoggedOutUser =async ()=>{
//             const isLoggedIn =await getLoginStatus()
//             dispatch(SET_LOGIN(isLoggedIn))
            
//             if(!isLoggedIn){
//                 toast.info("session expired,please login to continue")
//                 navigate(path)
//                 return

//             }
            
//         };
//         redirectLoggedOutUser()


//     }, [navigate,path,dispatch])
  
// }

// export default exeuseRedirectLoggedOutUser