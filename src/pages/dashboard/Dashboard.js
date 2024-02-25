import React, { useEffect } from 'react'
import NavBar from '../../compenents/sidebar/NavBar';
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from '../../redux/features/product/productSlice';
import ProductList from '../../compenents/product/productList/ProductList';
import ProductSummary from '../../compenents/product/productSummary/ProductSummary';
import Footer from '../../compenents/footer/Footer';




const Dashboard = () => {
  const name=useSelector(selectName)
  useRedirectLoggedOutUser("/login");

  const dispatch=useDispatch()


  const isLoggedin= useSelector(selectIsLoggedIn)
  const {products, isLoading, isError, message} =useSelector((state)=> state.product)

  useEffect(()=>{
    if(isLoggedin===true){
      dispatch(getProducts())
      
    }
    

    if(isError){
      console.log(message);
    }

  }, [isLoggedin, isError, message, dispatch])


  return (
    <div>
      
      <NavBar/>
      <br/><br/>
      
      <ProductSummary products={products}/>
      <ProductList products={products} isLoading={isLoading} />
      <Footer/>

     
        
    </div>
  )
}

export default Dashboard