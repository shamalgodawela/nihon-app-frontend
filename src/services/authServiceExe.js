import axios from "axios"
import {toast} from "react-toastify"

export const BACKEND_URL=process.env.REACT_APP_BACKEND_URL

export const validateEmail=(email)=>{
    return email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

//login user
export const loginUser =async (userData)=>{
    try {
        const response =await axios.post(`${BACKEND_URL}/api/loginexe`, userData, {withCredentials:true})
        if(response.statusText==="OK"){
            toast.success("Login Successfull...")
        }
        return response.data
    } catch (error) {
        const message=(
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
        console.log(error);
        
    }

}
//logout user
export const logoutUser =async ()=>{
    try {
        await axios.get(`${BACKEND_URL}/api/logout`,);
     
   
    } catch (error) {
        const message=(
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
        console.log(error);
        
    }

}

//get login status
export const getLoginStatus =async ()=>{
    try {
        const response=await axios.get(`${BACKEND_URL}/api/logedinexe`,);
        return response.data
   
    } catch (error) {
        const message=(
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message)
        console.log(error);
        
    }

}