import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home/Home";
import  Login  from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Report from "./pages/report/Reports"
import Products from "./pages/products/Products"
import Account from "./pages/account/Account"
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetails from "./pages/products/productDetails/ProductDetails";
import EditProduct from "./pages/editproduct/EditProduct";
import InvoiceForm from "./pages/invoice/InvoiceForm";
import AllInvoice from "./pages/invoice/AllInvoice";
import InvoiceTemp from "./pages/invoice/InvoiceTemplate/InvoiceTemp";
import CustomerReg from "./pages/customer/CustomerReg";
import GetCustomer from "./pages/customer/getallCus/GetCustomer";
import Mdetails from "./pages/Packing/Mdetails";
import CustomerDetails from "./pages/customer/singleCustomer/CustomerDetails";
import AllOutStanding from "./pages/outstandingPage/AllOutStanding";
import CalOutstanding from "./pages/outstandingPage/CalOutstanding";
import Dateproduct from "./pages/addProduct/Dateproduct";
import ProductdateDetails from "./pages/products/productDetails/ProductdateDetails";
import AddOrderdetails from "./pages/Order/addorder/AddOrderdetails";
import Allorder from "./pages/Order/ALLorder/Allorder";
import SingleOrder from "./compenents/HandleOrder/SingleOrder";
import ViewallOrder from "./pages/orderAdmin/dashboard/ViewallOrder";
import Oneorder from "./pages/orderAdmin/dashboard/Oneorder";
import LoginForm from "./pages/orderAdmin/login/LoginForm";
import Sample from "./pages/invoice/InvoiceTemplate/Sample";
import Additeams from "./pages/officeInvrntory/Additeams";
import Getalloffice from "./pages/officeInvrntory/Getalloffice";
import UpdateCustomerForm from "./pages/customer/Updatecus/UpdateCustomerForm";









axios.defaults.withCredentials= true;




function App() {
  const dispatch =useDispatch();

  useEffect(()=>{
    async function loginStatus(){
      const status=await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()

  },[dispatch])

  return (
   <BrowserRouter>
   <ToastContainer />
   <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/forgot" element={<Forgot/>}/>
    <Route path="/resetpassword/:resetToken" element={<Reset/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/reports" element={<Report/>}/>
    <Route path="/add-products" element={<AddProduct/>}/>
    <Route path="/account" element={<Account/>}/>
    <Route path="/product-detail/:id" element={<ProductDetails/>}/>
    <Route path="/edit-product/:id" element={<EditProduct/>}/>
    <Route path="/add-invoice" element={<InvoiceForm/>}/>
    <Route path="/all-invoices" element={<AllInvoice/>} />
    <Route path="/invoice-temp/:id" element={<InvoiceTemp/>} />
    <Route path="/invoice-temp" element={<Sample/>} />
    <Route path="/customerReg" element={<CustomerReg/>} />
    <Route path="/getAllCustomer" element={<GetCustomer/>} />
    <Route path="/Mdetails" element={<Mdetails/>} />
    <Route path="/customer/:code" element={<CustomerDetails/>} />
    <Route path="/AllOutstanding" element={<AllOutStanding/>} />
    <Route path="/caloutStanding/:id" element={<CalOutstanding/>} />
    <Route path="/dateproduct" element={<Dateproduct/>} />
    <Route path="/dateproductDetails" element={<ProductdateDetails/>} />
    <Route path="/addorder" element={<AddOrderdetails/>} />
    <Route path="/allorder" element={<Allorder/>} />
    <Route path="/orders/:id" element={<SingleOrder/>} />

    <Route path="/Adminallorder" element={<ViewallOrder/>} />
    <Route path="/adminorder/:id" element={<Oneorder/>} />
    <Route path="/adminlogin" element={<LoginForm/>} />
    <Route path="/additems" element={<Additeams/>} />
    <Route path="/getallinven" element={<Getalloffice/>} />
    <Route path="/customer/update/:customerid" element={<UpdateCustomerForm/>} />

    
    
   
   


    



    
  </Routes>

   </BrowserRouter>
  );
}

export default App;
