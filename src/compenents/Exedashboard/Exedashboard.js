import React, { useEffect } from 'react'
import HeaderExe from '../headerexe/HeaderExe'
import HeaderE from '../header/HeaderE'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/features/product/productSlicaExe'
import { selectIsLoggedIn, selectName } from '../../redux/features/auth/authSliceExe'
import ProductListExe from '../product/productList/ProductListExe'

const Exedashboard = () => {
  const name=useSelector(selectName)
  

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
        <HeaderExe/>
        <HeaderE/>
        <ProductListExe  products={products} />


    </div>
  )
}

export default Exedashboard