import React, { useRef } from 'react'
import Logo from "../../../assets/Nihon Logo-01.png"
import ReactToPrint from 'react-to-print';

const Sample = () => {
    const containerRef = useRef(null);
 
  return (
    <div>
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
              <div class="hr"></div>
              <div class="invoice-head-middle">
                <div class="invoice-head-middle-left text-start">
                  <p><span class="text-bold">Date:</span></p>
                </div>
                <div class="invoice-head-middle-right text-end">
                <span className="text-bold" style={{ marginRight: '40px' }}>Invoice No:</span>
                </div>
              </div>
              <div class="hr"></div>
              <div class="invoice-head-bottom">
                <div class="invoice-head-bottom-left">
                  <ul>
                    <li class='text-bold'>Customer Details</li>
                    <li>Code:</li>
                    <li>Name:</li>
                    <li>Address:</li>
                    <li>contact:</li>
                  </ul>
                </div>
                <div class="invoice-head-bottom-right">
                  <ul class="text-end">
                  <li>
      Order Number: <span style={{ marginRight: '30px' }}></span>
    </li>
                   
                     <li style={{ marginRight: '46px' }}>Date:</li>
      <li style={{ marginRight: '46px' }}>Exe:</li>
                  </ul>
                </div>
              </div>
            </div>
            <h4 className="table-cell-pay">Payment Details</h4>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell">Mode of Payment:</div>
                <div className="table-cell">Terms of Payment:</div>
                <div className="table-cell with-space">Due date:</div>
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tbody>
                  <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tbody>
                  <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tbody>
                  <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tbody>
                  <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tbody>
                  <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tbody>
                </table>
                <div class="invoice-body-bottom">
                  <div class="invoice-body-info-item border-bottom">
                    <div className="info-container">
                      <div className="info-item">
                        <p className="subject">Invoiced by</p>
                      </div>
                      <div className="info-item-td text-end text-bold" id="second">SubTotal:</div>
                    </div>
                  </div>
                  <div class="invoice-body-info-item border-bottom">
                    <div className="info-container">
                      <div className="info-item">
                        <p className="subject">Checked and Approved by</p>
                      </div>
                      <div className="info-item-td text-end text-bold" id="second">Tax:%</div>
                    </div>
                  </div>
                  <div class="invoice-body-info-item">
                    <div className="info-container">
                      <div className="info-item">
                        <p className="subject">Goods issued by</p>
                      </div>
                      <div className="info-item-td text-end text-bold" id="second">Total:</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-container">
              <div className="table-row">
                <div className="table-cell">Security Checked by</div>
                <div className="table-cell">Gate Pass No:</div>
                <div className="table-cell with-space">Vehicle No:</div>
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
    </div>
  )
}

export default Sample;