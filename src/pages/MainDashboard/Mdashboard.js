import React from 'react';
import './Mdash.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';

const Card = ({ imageClass, title, text, href }) => (
  <li className="cards__item">
    <div className="card">
      <div className={`card__image ${imageClass}`}></div>
      <div className="card__content">
        <div className="card__title">{title}</div>
        <p className="card__text">{text}</p>
        <a href={href} className="btn btn--block card__btn">
          Button
        </a>
      </div>
    </div>
  </li>
);

const Mdashboard = () => {
  const cardsData = [
    {
      imageClass: "card__image--fence",
      title: "Inventory Management",
      text: "",
      href: "/dashboard" // Example link
    },
    {
      imageClass: "card__image--river",
      title: "Sales performance and collection",
      text: "",
      href: "/sales" // Example link
    },
    {
      imageClass: "card__image--record",
      title: "Sales of product quantity",
      text: "",
      href: "/Season-Product-Quantity" // Example link
    },
    
  ];

  const navigate=useNavigate();
  const goBack = () => {
    // Use navigate(-1) to navigate back
    navigate(-1);
  };

  return (
    <div className='madashboard-body'>
    <Link to="#" onClick={goBack}><IoMdArrowRoundBack size={23}/></Link>&nbsp;&nbsp;

      <h1 className='madash-h1'>Nihon ERP System</h1>
      <ul className="cards">
        {cardsData.map((card, index) => (
          <Card key={index} imageClass={card.imageClass} title={card.title} text={card.text} href={card.href} />
        ))}
      </ul>
    </div>
  );
};

export default Mdashboard;
