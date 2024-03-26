import React, { useState } from 'react';
import axios from 'axios';

const AddReturnDetails = () => {
    const [returnData, setReturnData] = useState({
        products: [{
            productCode: '',
            quantity: 0,
            unitPrice: 0,
            returntotal: 0, // Adding returntotal field
        }],
        invoiceNumber: '',
        customer: '',
        reason: '',
        date: '',
        remarks: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReturnData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleProductChange = (e, index) => {
        const { name, value } = e.target;
        setReturnData(prevData => ({
            ...prevData,
            products: prevData.products.map((product, i) => i === index ? { ...product, [name]: value } : product)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/addreturndetails', returnData);
            alert('Return details added successfully!');
            // You can redirect or perform any other action here after successful addition
        } catch (error) {
            console.error('Error adding return details:', error);
            alert('An error occurred while adding return details.');
        }
    };

    return (
        <div>
            <h2>Add Return Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="invoiceNumber">Invoice Number:</label>
                    <input type="text" id="invoiceNumber" name="invoiceNumber" value={returnData.invoiceNumber} onChange={handleChange} />
                </div>
                {returnData.products.map((product, index) => (
    <div key={index}>
        <label htmlFor={`productCode${index}`}>Product Code:</label>
        <input type="text" id={`productCode${index}`} name={`productCode${index}`} value={product.productCode} onChange={(e) => handleProductChange(e, index)} />
        
        <label htmlFor={`quantity${index}`}>Quantity:</label>
        <input type="number" id={`quantity${index}`} name={`quantity${index}`} value={product.quantity} onChange={(e) => handleProductChange(e, index)} />
        
        <label htmlFor={`unitPrice${index}`}>Unit Price:</label>
        <input type="number" id={`unitPrice${index}`} name={`unitPrice${index}`} value={product.unitPrice} onChange={(e) => handleProductChange(e, index)} />
        
        <label htmlFor={`returntotal${index}`}>Return Total:</label>
        <input type="number" id={`returntotal${index}`} name={`returntotal${index}`} value={product.returntotal} onChange={(e) => handleProductChange(e, index)} />
    </div>
))}

<div>
    <label htmlFor="customer">Customer:</label>
    <input type="text" id="customer" name="customer" value={returnData.customer} onChange={handleChange} />
</div>

<div>
    <label htmlFor="reason">Reason:</label>
    <textarea id="reason" name="reason" value={returnData.reason} onChange={handleChange}></textarea>
</div>

<div>
    <label htmlFor="date">Date:</label>
    <input type="date" id="date" name="date" value={returnData.date} onChange={handleChange} />
</div>

<div>
    <label htmlFor="remarks">Remarks:</label>
    <textarea id="remarks" name="remarks" value={returnData.remarks} onChange={handleChange}></textarea>
</div>

                <button type="submit">Add Return Details</button>
            </form>
        </div>
    );
};

export default AddReturnDetails;
