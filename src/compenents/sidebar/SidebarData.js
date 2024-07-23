import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { FaProductHunt } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import { BsDatabaseFillGear } from "react-icons/bs";
import { PiOfficeChairFill } from "react-icons/pi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { GiMaterialsScience } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { AiFillProduct } from "react-icons/ai";




export const SidebarData = [
  <div>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></link>
  </div>,
  {
    title: 'Products summery',
    path: '/dashboard',
    icon:<FaProductHunt />,
    cName: 'nav-text'
  },
  {
    title: 'Executive products',
    path: '/exetable',
    icon:<FaProductHunt />,
    cName: 'nav-text'
  },
  {
    title: 'Finished Products',
    path: '/dateproductDetails',
    icon: <FaProductHunt />,
    cName: 'nav-text'
  },
  {
    title: 'Bulk Products Details',
    path: '/allbulkproduct',
    icon: <GiMaterialsScience />,
    cName: 'nav-text'
  },
  {
    title: 'Inserted return and new product',
    path: '/Add-newReturn-product',
    icon: <GiMaterialsScience />,
    cName: 'nav-text'
  },
  {
    title: 'View all inserted products',
    path: '/view-all-product-details',
    icon: <GiMaterialsScience />,
    cName: 'nav-text'
  },
  
 

];