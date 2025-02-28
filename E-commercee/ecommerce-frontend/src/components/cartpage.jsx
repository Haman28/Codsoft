import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name} (x{item.quantity})</span>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Price: ${totalAmount.toFixed(2)}</p>

      {cart.length > 0 && (
        <button onClick={() => navigate("/payment", { state: { totalAmount } })}>
          Proceed to Payment
        </button>
      )}
    </div>
  );
};

export default CartPage;
