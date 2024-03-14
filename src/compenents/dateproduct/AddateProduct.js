import React, { useState } from 'react';
import './dateproduct.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddateProduct = () => {
    const [formData, setFormData] = useState({
        GpnDate: '',
        GpnNumber: '',
        productName: '',
        category: '',
        unitPrice: '',
        numberOfUnits: '',
        packsize: ''
    });

    const [showProductDetails, setShowProductDetails] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://nihon-inventory.onrender.com/api/dateProducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const data = await response.json();
            console.log('Product added successfully:', data);
            toast.success('Product added successfully!');
            // You can redirect or perform any other action here
        } catch (error) {
            console.error('Error adding product:', error.message);
            toast.error('Failed to add product. Please try again.');
        }
    };

    const handleGetProductDetails = async () => {
        const productCode = formData.category; // Assuming productCode is the same as category

        try {
            const response = await axios.get(`https://nihon-inventory.onrender.com/api/products/category/${productCode}`);
            const product = response.data;

            // Update the product details in the form data state
            setFormData((prevFormData) => ({
                ...prevFormData,
                productName: product.name,
                unitPrice: product.price,
            }));

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

            // Show product details fields
            setShowProductDetails(true);
        } catch (error) {
            console.error('Failed to fetch product details', error.message);
            // Show error toast
            toast.error('Product not found', {
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

    const handleRemoveProduct = () => {
        // Reset the product details fields
        setFormData((prevFormData) => ({
            ...prevFormData,
            productName: '',
            category: '',
            unitPrice: '',
        }));

        // Hide the product details fields
        setShowProductDetails(false);
    };

    return (
        <div className="add-product-container">
            <h1 className='h1add'>Add Product</h1>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="GpnDate">GPN Date:</label>
                    <input type="date" id="GpnDate" name="GpnDate" value={formData.GpnDate} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="GpnNumber">GPN Number:</label>
                    <input type="text" id="GpnNumber" name="GpnNumber" value={formData.GpnNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Product Code:</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
                    <button onClick={handleGetProductDetails}>Get Product Details</button>
                </div>

                {showProductDetails && (
                    <>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name:</label>
                            <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="unitPrice">Unit Price:</label>
                            <input type="number" id="unitPrice" name="unitPrice" value={formData.unitPrice} onChange={handleChange} required />
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label htmlFor="packsize">Pack Size:</label>
                    <input type="text" id="packsize" name="packsize" value={formData.packsize} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfUnits">Number of Units:</label>
                    <input type="number" id="numberOfUnits" name="numberOfUnits" value={formData.numberOfUnits} onChange={handleChange} required />
                </div>

                <button className="submit-button" type="submit">Add Product</button>
                {showProductDetails && (
                    <button className="remove-product-button" onClick={handleRemoveProduct}>Remove Product</button>
                )}
            </form>
        </div>
    );
};

export default AddateProduct;
