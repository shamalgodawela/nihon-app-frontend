import axios from "axios"


export const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;

const API_URL=`${BACKEND_URL}/api/products/`

//create new product
const createProduct=async(fromData)=>{
    const response=await axios.post(API_URL,fromData)
    return response.data

};
//Get all products
const getProducts=async()=>{
    const response=await axios.get(API_URL);
    return response.data;

};
//Delete a product
const deleteProduct=async(id)=>{
    const response=await axios.delete(API_URL + id);
    return response.data;

};
// Get a Product
const getProduct = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
  };
// Update Product
const updateProduct = async (id, fromData) => {
    const response = await axios.patch(`${API_URL}${id}`,fromData);
    return response.data;
  };


const productService={
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct
    
}


export default productService