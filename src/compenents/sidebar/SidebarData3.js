import React from 'react';
import { BsDatabaseFillGear } from "react-icons/bs";
import { GiMaterialsScience } from "react-icons/gi";




export const SidebarData3 = [
  <div>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></link>
  </div>,
 

  {
    title: 'Manage Custormers',
    path: '/getAllCustomer',
    icon: <BsDatabaseFillGear />,
    cName: 'nav-text'
  },

  {
    title: 'Customer registration',
    path: '/customerReg',
    icon: <GiMaterialsScience />,
    cName: 'nav-text'
  },



];