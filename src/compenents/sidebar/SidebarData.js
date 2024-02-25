import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { MdSwitchAccount } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";

export const SidebarData = [
  <div>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></link>
  </div>,
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Add Products summery',
    path: '/dateproductDetails',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Product Registration',
    path: '/add-products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Add Products',
    path: '/dateproduct',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
 
  {
    title: 'Add Invoice',
    path: '/add-invoice',
    icon:<FaFileInvoice />,
    cName: 'nav-text'
  },
  {
    title: 'All invoices',
    path: '/all-invoices',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Customer Registration',
    path: '/customerReg',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Customer database',
    path: '/getAllCustomer',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Calculate Outstanding',
    path: '/AllOutstanding',
    icon: <MdSwitchAccount />,
    cName: 'nav-text'
  },
  

  
];