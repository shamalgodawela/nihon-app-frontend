import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../../assets/Nihon Logo-01.png"
import ReactToPrint from 'react-to-print';
import './exeinvoicetemp.css'

export default function InvoiceExetemp() {
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
      }
    };

    fetchInvoice();
  }, [id]);

  const calculateTotal = () => {
    let total = 0;

    if (invoice && invoice.products) {
        total = invoice.products.reduce((acc, product) => {
            const productTotal = product.labelPrice * (1 - product.discount / 100) * product.quantity;
            return acc + productTotal;
        }, 0);
    }

    return total.toFixed(2);
  };

  const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTaxtot = () => {
    if (invoice && invoice.products) {
        const taxRate = invoice.Tax || 0;

        const totalTax = invoice.products.reduce((acc, product) => {
            const productTax = parseFloat(product.invoiceTotal) * (taxRate / 100);
            return acc + productTax;
        }, 0);

        const subtotal = parseFloat(calculateTotal());
        const totalWithTax = subtotal - totalTax;

        return totalWithTax.toFixed(2);
    }

    return 0;
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  const productsCount = invoice.products.length;
  const emptyRowsCount = Math.max(6 - productsCount, 0);
  const filledRows = invoice.products.map((product, index) => (
    <tr key={index}>
      <td className="invoice-product-code">{product.productCode}</td>
      <td className="invoice-product-name">{product.productName}</td>
      <td className="invoice-quantity">{product.quantity}</td>
      <td className="invoice-label-price">{formatNumbers(product.labelPrice.toFixed(2))}</td>
      <td className="invoice-discount">{product.discount}</td>
      <td className="invoice-unit-price">{formatNumbers(product.unitPrice.toFixed(2))}</td>
      <td className="invoice-total" style={{ textAlign: 'end' }}>
        {formatNumbers((product.labelPrice * (1 - product.discount / 100) * product.quantity).toFixed(2))}
      </td>
    </tr>
  ));

  const emptyRows = Array.from({ length: emptyRowsCount }, (_, index) => (
    <tr key={`empty-${index}`}>
      <td className="invoice-empty-cell">&nbsp;</td>
      <td className="invoice-empty-cell">&nbsp;</td>
      <td className="invoice-empty-cell">&nbsp;</td>
      <td className="invoice-empty-cell">&nbsp;</td>
      <td className="invoice-empty-cell">&nbsp;</td>
      <td className="invoice-empty-cell">&nbsp;</td>
      <td className="invoice-empty-cell">&nbsp;</td>
    </tr>
  ));

  const allRows = [...filledRows, ...emptyRows];

  return (
    <div>
      <a href="/exeinvoices">Go Back</a><br />
      <ReactToPrint
        trigger={() => (
          <a href="#">Print this out!</a>
        )}
        content={() => containerRef.current}
        documentTitle="Invoice"
        pageStyle="print"
      />
      <div ref={containerRef}>
        <div className="invoice-wrapper">
          <div className="invoice-logo"><img src={Logo} width="270px" height="100px" /></div>
          <div className="invoice-header">
            <h6>No 44, Wawsiri Uyana, Kelepitimulla , Hunumulla</h6>
            <h6>Web: www.nihonagholdings.com</h6>
            <h6>Email: info@nihonagholdings.com</h6>
            <h6>Hotline: 0777666802</h6>
          </div>
          <p id='invoice-tax-text'>{invoice.VatNO}</p>
          <p id='invoice-vat-reg'>{invoice.VatRegNo}</p>

          <div className="invoice-details">
            <div className="invoice-customer-details">
              <ul>
                <li className="invoice-customer-code"><span className="label">Code:</span>{invoice.code}</li>
                <li className="invoice-customer-name"><span className="label">Name:</span>{invoice.customer}</li>
                <li className="invoice-customer-address"><span className="label">Address:</span>{invoice.address}</li>
                <li className="invoice-customer-contact"><span className="label">Contact:</span>{invoice.contact}</li>
              </ul>
            </div>
            <div className="invoice-order-details">
              <ul>
                <li className="invoice-order-number"><span className="label">Order Number:</span>{invoice.orderNumber}</li>
                <li className="invoice-order-date"><span className="label">Date:</span>{invoice.orderDate}</li>
                <li className="invoice-order-exe"><span className="label">Exe:</span>{invoice.exe}</li>
                <li className="invoice-invoice-number"><span className="label">Invoice No:</span>{invoice.invoiceNumber}</li>
                <li className="invoice-invoice-date"><span className="label">Date:</span>{invoice.invoiceDate}</li>
              </ul>
            </div>
            <p className='invoice-tax-number'>-{invoice.TaxNo}</p>
          </div>

          <h4 className="invoice-payment-details-title"><span className="label">Payment Details</span></h4>
          <div className="invoice-payment-details">
            <div className="payment-detail">
              <span className="label">Mode of Payment:</span>{invoice.ModeofPayment}
            </div>
            <div className="payment-detail">
              <span className="label">Terms of Payment:</span>{invoice.TermsofPayment} days
            </div>
            <div className="payment-detail">
              <span className="label">Due date:</span>{invoice.Duedate}
            </div>
          </div>

          <div className="invoice-table">
            <table className="invoice-table-head">
              <thead>
                <tr>
                  <td>Product Code</td>
                  <td>Description</td>
                  <td>Quantity</td>
                  <td>Label Price</td>
                  <td>Discount</td>
                  <td>Unit Price</td>
                  <td>Invoice Total</td>
                </tr>
              </thead>
              <tbody>
                {allRows}
              </tbody>
            </table>

            <div className="invoice-summary">
              <div className="invoice-summary-item">
                <span className="label">SubTotal:</span>{formatNumbers(calculateTotal())}
              </div>
              <div className="invoice-summary-item">
                <span className="label">Total:</span>{formatNumbers(calculateTaxtot())}
              </div>
            </div>
          </div>

          <div className="invoice-footer">
            <div className="invoice-footer-section">
              <span className="footer-label">Security Checked by</span>
            </div>
            <div className="invoice-footer-section">
              <span className="footer-label">Gate Pass No:</span>{invoice.GatePassNo}
            </div>
            <div className="invoice-footer-section">
              <span className="footer-label">Driver Mobile:</span>
            </div>
          </div>

          <h5 className="invoice-footer-acknowledgment">I/We acknowledge receipt of the above mentioned goods in good condition</h5>

          <div className="invoice-signature">
            <div className="signature-section">Customer stamp</div>
            <div className="signature-section">Name and NIC</div>
            <div className="signature-section">Signature</div>
            <div className="signature-section">Date:</div>
          </div>

          <h5 className="invoice-final-note">Please draw the cheques in favour of "NIHON AGRICULTURE HOLDINGS (PVT) LTD" A/C PAYEE ONLY</h5>
        </div>
      </div>
    </div>
  );
}
