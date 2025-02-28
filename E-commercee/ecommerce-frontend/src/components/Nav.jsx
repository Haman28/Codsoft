import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "./CartContext"; 

export const Nav = () => {
  const { totalPrice } = useCart();

  return (
    <nav className='vv' style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#333", color: "white" }}>
      <ul className='llk'>
        <li><Link to="/" className='ee'>HOME</Link></li>
      </ul>
      <div style={{ marginRight: "20px", fontSize: "18px" }}>
        🛒 Cart: ${totalPrice.toFixed(2)} 
      </div>
    </nav>
  );
};
