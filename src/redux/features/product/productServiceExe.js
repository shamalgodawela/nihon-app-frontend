import axios from "axios"

export const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;

const API_URL=`${BACKEND_URL}/api/allproductexe/`
const API_SINGLE=`${BACKEND_URL}/api/getSingleProductExe/`

//Get all products
const getProducts=async()=>{
    const response=await axios.get(API_URL);
    return response.data;

};

// Get a Product
const getProduct = async (id) => {
    const response = await axios.get(API_SINGLE + id);
    return response.data;
  };


const productService={
    
    getProducts,
    
    getProduct,
    
    
}


export default productService