import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import productService from './productService';
import { toast } from 'react-toastify';



const initialState = {
    product:null,
    products:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
    totalStoreValue:0,
    outOfStoack:0,
    category:[],

};
//create new product
export const createProduct=createAsyncThunk(
  "products/create",
  async(fromData, thunkAPI)=>{
    try {
      return await productService.createProduct(fromData)
    } catch (error) {
      const message=(
        error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    console.log(message);
    return thunkAPI.rejectWithValue(message)
    }
  }
)
//get all products
export const getProducts=createAsyncThunk(
  "products/getAll",
  async(_, thunkAPI)=>{
    try {
      return await productService.getProducts();
    } catch (error) {
      const message=(
        error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    console.log(message);
    return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get a product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//Delete a product
export const deleteProduct=createAsyncThunk(
  "products/delete",
  async(id, thunkAPI)=>{
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message=(
        error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    console.log(message);
    return thunkAPI.rejectWithValue(message)
    }
  }
)
//update product
// Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, fromData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, fromData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state,action){
      const products=action.payload
      const array=[]
      products.map((item)=>{
        const {price,quantity}=item
        const productvalue= price * quantity
        return array.push(productvalue)

      })
      const totalVlaue= array.reduce((a,b)=>{
        return a + b

      }, 0)
      state.totalStoreValue=totalVlaue;
      
    },
    CALC_OUTOFSTOCK(state,action){
      const products=action.payload
      const array=[]
      products.map((item)=>{
        const {quantity}=item
        
        return array.push(quantity)

      });
      let count=0
      array.forEach((number)=>{
        if(number === 0 ||number === "0"){
          count +=1

        }
      })
      state.outOfStoack=count

    }
  },
  extraReducers:(builder) =>{

    builder
        .addCase(createProduct.pending, (state)=>{
          state.isLoading=true
        })
        .addCase(createProduct.fulfilled, (state,action)=>{
          state.isLoading=false;
          state.isSuccess=true;
          state.isError=false;
          console.log(action.payload);
          state.products.push(action.payload);
          toast.success("Product added successfully")
        })
        .addCase(createProduct.rejected, (state,action)=>{
          state.isLoading=false;
          state.isError=true;
          state.message=action.payload;
          toast.error(action.payload)
        })
        //-----------------------------------------------------------------------------------
        .addCase(getProducts.pending, (state)=>{
          state.isLoading=true
        })
        .addCase(getProducts.fulfilled, (state,action)=>{
          state.isLoading=false;
          state.isSuccess=true;
          state.isError=false;
          console.log(action.payload);
          state.products=action.payload;
         
        })
        .addCase(getProducts.rejected, (state,action)=>{
          state.isLoading=false;
          state.isError=true;
          state.message=action.payload;
          toast.error(action.payload)
        })
        //-------------------------------------------------------------------------
         .addCase(deleteProduct.pending, (state)=>{
          state.isLoading=true
        })
        .addCase(deleteProduct.fulfilled, (state,action)=>{
          state.isLoading=false;
          state.isSuccess=true;
          state.isError=false;
          toast.success("Product deleted successfully")
         
        })
        .addCase(deleteProduct.rejected, (state,action)=>{
          state.isLoading=false;
          state.isError=true;
          state.message=action.payload;
          toast.error(action.payload)
        })
        //------------------------------------------------------------------------------------
        .addCase(getProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.product = action.payload;
        })
        .addCase(getProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        })
        //-----------------------------------------------------------------------------------
        .addCase(updateProduct.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          toast.success("Product updated successfully");
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload);
        });
        //--------------------------------------------------------------------------
        
  }
});




export const {CALC_STORE_VALUE, CALC_OUTOFSTOCK} = productSlice.actions;

export const selectIsLoading =(state)=>state.product.isLoading;

export const selectProduct =(state)=>state.product.product;

export const selectTotalStoreValue =(state)=>state.product.totalStoreValue;

export const selectOutOfStock =(state)=>state.product.outOfStoack;

export const selectProductCode =(state)=>state.product.productcode;

export default productSlice.reducer