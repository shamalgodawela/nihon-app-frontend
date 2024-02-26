// Import the useState and useEffect hooks
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./invoice.css"
import Footer from '../../compenents/footer/Footer';
import NavBar from '../../compenents/sidebar/NavBar';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    products: [
      {
        productCode: '',
        productName: '',
        quantity: 0,
        labelPrice: 0,
        discount: 0,
        unitPrice: 0,
        invoiceTotal: 0,
        // Remove the category field
      },
    ],
    invoiceNumber:'',
    customer: '',
    code:'',
    address:'',
    contact:'',
    invoiceDate: '',
    orderNumber:'',
    orderDate:'',
    exe: '',
    ModeofPayment:'',
    TermsofPayment:'',
    Duedate:'',
    Tax: '',
    GatePassNo: '',
    VehicleNo:'',
  });
  const [lastNumbers, setLastNumbers] = useState({
    lastInvoiceNumber: '',
    lastOrderNumber: '',
  });
  const [calculatedValues, setCalculatedValues] = useState({
    unitPrice: 0,
    invoiceTotal: 0,
  });

  const [customerDetailsFetched, setCustomerDetailsFetched] = useState(false);

  const handleChange = async (e, index) => {
    const { name, value } = e.target;
  
    if (name.startsWith('products')) {
      const [field, productField] = name.split('.');
      const updatedProducts = [...formData.products];
      updatedProducts[index] = { ...updatedProducts[index], [productField]: value };
  
      if (productField === 'productCode') {
        try {
          const response = await axios.get(`https://nihon-inventory.onrender.com/api/products/${value}`);
          const product = response.data;
  
          if (product.category === updatedProducts[index].category) {
            setFormData({
              ...formData,
              products: updatedProducts,
            });
          } else {
            // Handle category mismatch
            toast.error('Category mismatch for the provided product code', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } catch (error) {
          console.error('Failed to fetch product details', error.message);
          // Handle product not found
          toast.error('No matching product found for the provided product code', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else if (productField === 'productName') {
        // Handle product name change
        setFormData({
          ...formData,
          products: updatedProducts,
        });
      } else {
        setFormData({
          ...formData,
          products: updatedProducts,
        });
      }
    }  else if (name === 'TermsofPayment') {
      const termOfPaymentDays = parseInt(value, 10);
      if (!isNaN(termOfPaymentDays) && termOfPaymentDays > 0) {
        const today = new Date();
        const dueDate = new Date(today.setDate(today.getDate() + termOfPaymentDays));
        
        if (!isNaN(dueDate.getTime())) {
          // Date is valid, update the form data
          setFormData({
            ...formData,
            [name]: value,
            Duedate: dueDate.toISOString().split('T')[0],
          });
        } else {
          toast.error('Invalid date')
          console.error('Invalid due date');
          // Handle error
        }
      } else {
        toast.error('Invalid date')
        console.error('Invalid terms of payment');
        // Handle error
      }
    }else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  
  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        {
          productCode: '',
          productName: '',
          quantity: 0,
          labelPrice: 0,
          discount: 0,
          unitPrice: 0,
          invoiceTotal: 0,
        },
      ],
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);

    setFormData({
      ...formData,
      products: updatedProducts,
    });
  };

  useEffect(() => {
    let totalUnitPrice = 0;
    let totalInvoiceTotal = 0;
  
    formData.products.forEach((product) => {
      const calculatedUnitPrice = parseFloat(product.labelPrice) - (parseFloat(product.labelPrice) * parseFloat(product.discount) / 100);
      const calculatedInvoiceTotal = parseFloat(calculatedUnitPrice) * parseFloat(product.quantity);
  
      totalUnitPrice += isNaN(calculatedUnitPrice) ? 0 : calculatedUnitPrice;
      totalInvoiceTotal += isNaN(calculatedInvoiceTotal) ? 0 : calculatedInvoiceTotal;
  
      product.unitPrice = isNaN(calculatedUnitPrice) ? 0 : calculatedUnitPrice;
      product.invoiceTotal = isNaN(calculatedInvoiceTotal) ? 0 : calculatedInvoiceTotal;
    });
  
    // Fetch last invoice number and order number
    const fetchLastNumbers = async () => {
      try {
        const response = await axios.get(`https://nihon-inventory.onrender.com/api/lastInvoiceNumber`);
        const { lastInvoiceNumber, lastOrderNumber } = response.data;
  
        setLastNumbers({
          lastInvoiceNumber: lastInvoiceNumber,
          lastOrderNumber: lastOrderNumber,
        });
      } catch (error) {
        console.error('Failed to fetch last numbers', error.message);
        // Handle error
      }
    };
  
    fetchLastNumbers(); // Fetch last numbers on component mount
  
    setCalculatedValues({
      unitPrice: totalUnitPrice,
      invoiceTotal: totalInvoiceTotal,
    });
  }, [formData.products]);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerDetailsFetched) {
      toast.error('Please fetch customer details before submitting the form', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await axios.post(`https://nihon-inventory.onrender.com/api/add-invoice`, formData);
      console.log('Invoice added successfully', response.data);

      // Optionally, reset the form or navigate to another page on success

      // Show success toast
      toast.success('Invoice added successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Failed to add invoice', error.message);
      // Handle error, show a user-friendly message, or redirect to an error page
      // Show error toast
      toast.error('Product Not Found', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    navigate("/all-invoices")
  };

  const handleGetDetails = async (e) => {
    e.preventDefault(); // Prevent default button click behavior

    try {
      const response = await axios.get(`https://nihon-inventory.onrender.com/api/customers/${formData.code}`);
      const customer = response.data;
      setFormData({
        ...formData,
        customer: customer.name,
        address: customer.address,
        contact: customer.contact,
      });
      setCustomerDetailsFetched(true);
    } catch (error) {
      console.error('Failed to fetch customer details', error.message);
      toast.error('Customer not found', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleGetProductDetails = async (index) => {
    const productCode = formData.products[index].productCode;
  
    try {
      const response = await axios.get(`https://nihon-inventory.onrender.com/api/products/category/${productCode}`);
      const product = response.data;
  
      // Update the product details in the form data state for the corresponding product index
      setFormData((prevFormData) => {
        const updatedProducts = [...prevFormData.products];
        updatedProducts[index] = {
          ...updatedProducts[index],
          productName: product.name,
          labelPrice: product.price,
        };
        return { ...prevFormData, products: updatedProducts };
      });
  
      // Show success toast
      toast.success('Product details fetched successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Failed to fetch product details', error.message);
      // Show error toast
      toast.error('Failed to fetch product details', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  return (
    <div>
      <NavBar/>
      <br/>
      <div className="invoice-form">
        <h2>Add Invoice</h2>
        <form onSubmit={handleSubmit}>
          {formData.products.map((product, index) => (
            <div key={index}>
               <div>
    <label>Product Code:</label>
    <input
      type="text"
      name={`products[${index}].productCode`}
      value={product.productCode}
      onChange={(e) => handleChange(e, index)}
    />
    <button onClick={() => handleGetProductDetails(index)}>Get Details</button> {/* Pass index */}
  </div>
              <h3>Product {index + 1}</h3>
              <div>
                <label>Product Code:</label>
                <input
                  type="text"
                  name={`products[${index}].productCode`}
                  value={product.productCode}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Product Name:</label>
                <input
                  type="text"
                  name={`products[${index}].productName`}
                  value={product.productName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Number of unit:</label>
                <input
                  type="number"
                  name={`products[${index}].quantity`}
                  value={product.quantity}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Label Price:</label>
                <input
                  type="number"
                  name={`products[${index}].labelPrice`}
                  value={product.labelPrice}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Discount (%):</label>
                <input
                  type="number"
                  name={`products[${index}].discount`}
                  value={product.discount}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Unit Price:</label>
                <span>{product.unitPrice}</span>
              </div>
              <div>
                <label>Invoice Total:</label>
                <span>{product.invoiceTotal}</span>
              </div>
              <button type="button" onClick={() => removeProduct(index)}>
                Remove Product
              </button>
            </div>
          ))}
          <button type="button" onClick={addProduct}>
            Add Product
          </button>
          <div>
        <label>Customer Code:</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
        />
        <button onClick={handleGetDetails}>Get Details</button>
      </div>
      

          <div>
          <p>Last Invoice Number: {lastNumbers.lastInvoiceNumber}</p>
            <label>Invoice Number:</label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) => handleChange(e)}
            />
            
             
          </div>
          <div>
            <label>Invoice Date:</label>
            <input
              type="date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <h4></h4>
          <div>
            <h3>Customer details</h3>
            <label>Customer:</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Customer Code:</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Customer Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Contact:</label>
            <input
              type="text"
              name="address"
              value={formData.contact}
              onChange={(e) => handleChange(e)}
            />
          </div>
         
          <div>
            <h3>Order details</h3>
            <p>Last order Number:{lastNumbers.lastOrderNumber}</p>
            <label>Order Number:</label>
            <input
              type="text"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={(e) => handleChange(e)}
            />
            
          </div>
          <div>
            <label>Order Date:</label>
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Executive (EXE):</label>
            <input
              type="text"
              name="exe"
              value={formData.exe}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <h3>Payment details</h3>
          <div>
            <label>Mode of Payment:</label>
              <select
              name="ModeofPayment"
              value={formData.ModeofPayment}
              onChange={(e) => handleChange(e)}
              >
               <option value="">Select mode of payment</option>
               <option value="Cash">Cash</option>
               <option value="Check">Check</option>
              </select>
          </div>
          <div>
            <label>Terms of Payment(days):</label>
            <input
              type="text"
              name="TermsofPayment"
              value={formData.TermsofPayment}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Due date:</label>
            <input
              type="date"
              name="Duedate"
              value={formData.Duedate}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Tax:</label>
            <input
              type="number"
              name="Tax"
              value={formData.Tax}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Gate Pass No:</label>
            <input
              type="text"
              name="GatePassNo"
              value={formData.GatePassNo}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Vehicle No:</label>
            <input
              type="text"
              name="VehicleNo"
              value={formData.VehicleNo}
              onChange={(e) => handleChange(e)}
            />
          </div>
          
          <button type="submit">Submit</button>
        </form>

        {/* Toast container */}
        <ToastContainer />
      </div>
      <Footer/>
    </div>
  );
};

export default InvoiceForm;
