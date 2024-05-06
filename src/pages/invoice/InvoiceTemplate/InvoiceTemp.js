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
  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // Ensure there are always 6 rows displayed, adding empty rows if needed
  const productsCount = invoice.products.length;
  const emptyRowsCount = Math.max(6 - productsCount, 0);
  const filledRows = invoice.products.map((product, index) => (
    <tr key={index}>
      <td className="fontfamily-td">{product.productCode}</td>
      <td className="fontfamily-td">{product.productName}</td>
      <td className="tdquantity">{product.quantity}</td>
      <td className="fontfamily-td">{formatNumbers(product.labelPrice.toFixed(2))}</td>
      <td className="tddiscount">{product.discount}</td>
      <td className="fontfamily-td">{formatNumbers(product.unitPrice.toFixed(2))}</td>
      <td className="tdtot" style={{ textAlign: 'end' }}>
  {formatNumbers((product.labelPrice * (1 - product.discount / 100) * product.quantity).toFixed(2))}
</td>


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
          <p id='inventory'>{invoice.VehicleNo}</p>
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
                    <li className="licus"><span class="label" >Code:</span>{invoice.code}</li>
                    <li className='cusd1'><span class="label" >Name:</span>{invoice.customer}</li>
                    <li className='cusd2'><span class="label" >Address:</span>{invoice.address}</li>
                    <li className='cusd3'><span class="label" >contact:</span>{invoice.contact}</li>
                  </ul>
                </div>
                <div class="invoice-head-bottom">
                  <ul>
                    <li class='text-boldorder'>Order Details</li>
                    <li className='cusd45'><span id="ornumber">Order Number:</span>{invoice.orderNumber}</li>
                    <li className='cusd4'><span id='ordate' >Date:</span>{invoice.orderDate}</li>
                    <li className='cusd44'><span id='orexe' >Exe:</span>{invoice.exe}</li>
                    <li  className="ordt" ><span id='orinvoice'>Invoice No:</span>{invoice.invoiceNumber}</li>
                    <li className='cusd46' ><span id='oridate'>Date:</span>{invoice.invoiceDate}</li>
                  </ul>
                </div>
              </div>
            </div>
            <h4 className="table-cell-pay"><span class="label">Payment Details</span></h4>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell" id='mod'><span class="label" >Mode of Payment:</span>{invoice.ModeofPayment}</div>
                <div className="table-cell"><span class="label" id='mod1'>Terms of Payment:</span>{invoice.TermsofPayment} days</div>
                <div className="table-cell with-space"><span class="label" id='mod2'>Due date:</span>{invoice.Duedate}</div>
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
                      <div className="info-item-td text-end text-bold" id="second"><span class="label">SubTotal:</span>{formatNumbers(calculateTotal().toFixed(2))}</div>
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
                      <div className="info-item-tot" id="second2"><span class="label" >Total</span>{formatNumbers(calculateTaxtot())}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell2">Security Checked by</div>
                <div className="table-cell2">Gate Pass No:{invoice.GatePassNo}</div>
                <div className="table-cell2 with-space">Vehicle No:</div>
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
