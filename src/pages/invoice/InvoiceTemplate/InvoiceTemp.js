import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../../assets/Nihon Logo-01.png"
import "./invoicetemp.css"
import ReactToPrint from 'react-to-print';

export default function InvoiceTemp() {

  const containerRef = useRef(null);
  
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`https://nihon-inventory.onrender.com/api/get-invoice/${id}`);
        setInvoice(response.data);
      } catch (error) {
        console.error(`Failed to fetch invoice with id ${id}`, error.message);
        // Handle error
      }
    };

    fetchInvoice();
  }, [id]);

  const calculateTotal = () => {
    let total = 0;
    if (invoice && invoice.products) {
      total = invoice.products.reduce((acc, product) => acc + parseFloat(product.invoiceTotal), 0);
    }
    return total;
  };
  
  const calculateTaxtot = () => {
    if (invoice && invoice.products) {
      const taxRate = invoice.Tax || 0; // Default to 0 if tax rate is not available
  
      const totalTax = invoice.products.reduce((acc, product) => {
        const productTax = parseFloat(product.invoiceTotal) * (taxRate / 100);
        return acc + productTax;
      }, 0);
  
      const subtotal = calculateTotal(); // Get the subtotal
      const totalWithTax = subtotal + totalTax; // Subtract tax amount from subtotal
  
      return totalWithTax.toFixed(2); // Adjust decimal places as needed
    }
  
    return 0;
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  // Ensure there are always 6 rows displayed, adding empty rows if needed
  const productsCount = invoice.products.length;
  const emptyRowsCount = Math.max(6 - productsCount, 0);
  const filledRows = invoice.products.map((product, index) => (
    <tr key={index}>
      <td>{product.productCode}</td>
      <td>{product.productName}</td>
      <td>{product.quantity}</td>
      <td>${product.labelPrice}</td>
      <td>{product.discount}</td>
      <td>${product.unitPrice}</td>
      <td>${product.invoiceTotal}</td>
    </tr>
  ));
  const emptyRows = Array.from({ length: emptyRowsCount }, (_, index) => (
    <tr key={`empty-${index}`}>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
  ));
  const allRows = [...filledRows, ...emptyRows];

  

  return (
    <body>
    <div>
      <a href="/all-invoices">Go Back</a><br/>
      <ReactToPrint
      
        trigger={() => (
          <a href="#">Print this out!</a>
          
        )}
        content={() => containerRef.current}
        documentTitle=" "
        pageStyle="print"
      />
        
      <div ref={containerRef} >
        <div class="invoice-wrapper" id="print-area">
          {/* Your existing invoice template code */}
          <div className="image"><img src={Logo} width="270px" height="100px" /></div>
          <div className="textheader">
            <h6>No 44, Wawsiri Uyana, Kelepitimulla , Hunumulla</h6>
            <h6>Web: www.nihonagholdings.com</h6>
            <h6>Email: info@nihonagholdings.com</h6>
            <h6>Hotline: 0777666802</h6>
          </div>
          <div class="invoice-container">
            <div class="invoice-head">
              <div class="invoice-head-top">
                <div class="invoice-head-top-left text-start"></div>
                <div class="invoice-head-top-right text-end"></div>
              </div>
              <div class="invoice-head-bottom">
                <div class="invoice-head-bottom-left">
                  <ul>
                    <li class='text-bold1'>Customer Details</li>
                    <li className="licus"><span class="label">Code:</span>{invoice.code}</li>
                    <li className='cusd'><span class="label">Name:</span>{invoice.customer}</li>
                    <li className='cusd'><span class="label">Address:</span>{invoice.address}</li>
                    <li className='cusd'><span class="label">contact:</span>{invoice.contact}</li>
                  </ul>
                </div>
                <div class="invoice-head-bottom-right">
                  <ul class="text-end">
                    <li class='text-boldorder'>Order Details</li>
                    <li className='cusd' id='ornumber'><span class="label">Order Number:</span>{invoice.orderNumber}</li>
                    <li className='cusd' id='ordate'><span class="label">Date:</span>{invoice.orderDate}</li>
                    <li className='cusd' id='orexe'><span  class="label">Exe:</span>{invoice.exe}</li>
                    <li  className="ordt" id='orinvoice'><span class="label">Invoice No:</span>{invoice.invoiceNumber}</li>
                    <li className='cusd' id='oridate'><span class="label">Date:</span>{invoice.invoiceDate}</li>
                  </ul>
                </div>
              </div>
            </div>
            <h4 className="table-cell-pay"><span class="label">Payment Details</span></h4>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell"><span class="label">Mode of Payment:</span>{invoice.ModeofPayment}</div>
                <div className="table-cell"><span class="label">Terms of Payment:</span>{invoice.TermsofPayment} days</div>
                <div className="table-cell with-space"><span class="label">Due date:</span>{invoice.Duedate}</div>
              </div>
            </div>
            <div class="overflow-view">
              <div class="invoice-body">
                <table>
                  <thead>
                    <tr>
                      <td className="text-bold" id='tdtext'>Product Code</td>
                      <td className="text-bold" id='tdtext'>Description</td>
                      <td className="text-bold" id='tdtext'>Quantity</td>
                      <td className="text-bold" id='tdtext'>Label Price</td>
                      <td className="text-bold" id='tdtext'>Discount</td>
                      <td className="text-bold" id='tdtext'>Unit Price</td>
                      <td className="text-bold" id='tdtext'>Invoice Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {allRows}
                  </tbody>
                </table>
                <div class="invoice-body-bottom">
                  <div class="invoice-body-info-item border-bottom">
                    <div className="info-container">
                      <div className="info-item">
                        <p className="subject">Invoiced by</p>
                      </div>
                      <div className="info-item-td text-end text-bold" id="second"><span class="label">SubTotal:</span>RS{calculateTotal()}</div>
                    </div>
                  </div>
                  <div class="invoice-body-info-item border-bottom">
                    <div className="info-container">
                      <div className="info-item">
                        <p className="subject">Checked and Approved by</p>
                      </div>
                      <div className="info-item-td text-end text-bold" id="second1"><span class="label">Tax:%</span>{invoice.Tax}</div>
                    </div>
                  </div>
                  <div class="invoice-body-info-item">
                    <div className="info-container">
                      <div className="info-item">
                        <p className="subject">Goods issued by</p>
                      </div>
                      <div className="info-item-tot" id="second2"><span class="label" >Total</span>RS{calculateTaxtot()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell2">Security Checked by</div>
                <div className="table-cell2">Gate Pass No:{invoice.GatePassNo}</div>
                <div className="table-cell2 with-space">Vehicle No:{invoice.VehicleNo}</div>
              </div>
            </div>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell2">Driver Mobile:</div>
                <div className="table-cell2">Nic:</div>
                <div className="table-cell2 with-space">Name:</div>
              </div>
            </div>
            <h5 className="table-cell-pay">I/We acknowledge receipt of the above mentioned goods in good condition</h5>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell2">Customer stamp</div>
                <div className="table-cell2">Name and NIC</div>
                <div className="table-cell2">Signature</div>
                <div className="table-cell2 with-space">Date:</div>
              </div>
            </div>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell1"></div>
                <div className="table-cell1"></div>
                <div className="table-cell1"></div>
                <div className="table-cell1 with-space"></div>
              </div>
            </div>
            <h5 className="table-cell-final">Please draw the cheques infavour of "NIHON AGRICUTURE HOLDINGS (PVT)LTD " A/C PAYEE ONLY</h5>
          </div>
          {/* End of your existing invoice template code */}
        </div>
      </div>
    </div>
    </body>
  );
}
