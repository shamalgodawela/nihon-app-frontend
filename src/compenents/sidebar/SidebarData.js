import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { FaProductHunt } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { BsDatabaseFillGear } from "react-icons/bs";


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
    title: 'Products summery',
    path: '/dateproductDetails',
    icon: <FaProductHunt />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Orders',
    path: '/allorder',
    icon: <FaBorderAll />,
    cName: 'nav-text'
  },
  {
    title: 'Manage invoices',
    path: '/all-invoices',
    icon: <FaFileInvoice />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Outstanding',
    path: '/AllOutstanding',
    icon: <MdPayments />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Custormers',
    path: '/getAllCustomer',
    icon: <BsDatabaseFillGear />,
    cName: 'nav-text'
  },
  
 

  
];