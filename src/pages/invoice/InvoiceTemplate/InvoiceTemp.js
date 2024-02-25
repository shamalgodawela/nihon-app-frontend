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
        const response = await axios.get(`http://localhost:5000/api/get-invoice/${id}`);
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
    <div>
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
              <div class="hr"></div>
              <div class="invoice-head-middle">
                <div class="invoice-head-middle-left text-start">
                  <p><span class="text-bold">Date:</span>:{invoice.invoiceDate}</p>
                </div>
                <div class="invoice-head-middle-right text-end">
                  <p><span class="text-bold">Invoice No:</span>{invoice.invoiceNumber}</p>
                </div>
              </div>
              <div class="hr"></div>
              <div class="invoice-head-bottom">
                <div class="invoice-head-bottom-left">
                  <ul>
                    <li class='text-bold'>Customer Details</li>
                    <li>Code:{invoice.code}</li>
                    <li>Name:{invoice.customer}</li>
                    <li>Address:{invoice.address}</li>
                    <li>contact:{invoice.contact}</li>
                  </ul>
                </div>
                <div class="invoice-head-bottom-right">
                  <ul class="text-end">
                    <li class='text-bold'>Order Details</li>
                    <li>Order Number:{invoice.orderNumber}</li>
                    <li>Date:{invoice.orderDate}</li>
                    <li>Exe:{invoice.exe}</li>
                  </ul>
                </div>
              </div>
            </div>
            <h4 className="table-cell-pay">Payment Details</h4>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell">Mode of Payment:{invoice.ModeofPayment}</div>
                <div className="table-cell">Terms of Payment:{invoice.TermsofPayment}</div>
                <div className="table-cell with-space">Due date:{invoice.Duedate}</div>
              </div>
            </div>
            <div class="overflow-view">
              <div class="invoice-body">
                <table>
                  <thead>
                    <tr>
                      <td className="text-bold">Product Code</td>
                      <td className="text-bold">Description</td>
                      <td className="text-bold">Quantity</td>
                      <td className="text-bold">Label Price</td>
                      <td className="text-bold">Discount</td>
                      <td className="text-bold">Unit Price</td>
                      <td className="text-bold">Invoice Total</td>
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
                      <div className="info-item-td text-end text-bold" id="second">SubTotal:${calculateTotal()}</div>
                    </div>
                  </div>
                  <div class="invoice-body-info-item border-bottom">
                    <div className="info-container">
                      <div className="info-item">
                        <p className="subject">Checked and Approved by</p>
                      </div>
                      <div className="info-item-td text-end text-bold" id="second">Tax:%{invoice.Tax}</div>
                    </div>
                  </div>
                  <div class="invoice-body-info-item">
                    <div className="info-container">
                      <div className="info-item">
                        <p className="subject">Goods issued by</p>
                      </div>
                      <div className="info-item-td text-end text-bold" id="second">Total: ${calculateTaxtot()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell">Security Checked by</div>
                <div className="table-cell">Gate Pass No:{invoice.GatePassNo}</div>
                <div className="table-cell with-space">Vehicle No:{invoice.VehicleNo}</div>
              </div>
            </div>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell">Driver Mobile:</div>
                <div className="table-cell">Nic:</div>
                <div className="table-cell with-space">Name:</div>
              </div>
            </div>
            <h5 className="table-cell-pay">I/We acknowledge receipt of the above mentioned goods in good condition</h5>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell">Customer stamp</div>
                <div className="table-cell">Name and NIC</div>
                <div className="table-cell">Signature</div>
                <div className="table-cell with-space">Date:</div>
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
  );
}
