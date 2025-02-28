import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom'; 

const Han = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const foodItems = [
    { id: 1, name: 'Donuts', price: 5.99 },
    { id: 2, name: 'Burger', price: 8.99 },
    { id: 3, name: 'Pizza', price: 12.49 },
    { id: 4, name: 'Fries', price: 4.99 },
  ];

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  return (

    <div>
         
      <h1>Welcome to Han’s Fast Food!</h1>

      <div>
        <h2>Food Menu</h2>
        <ul>
          {foodItems.map((food) => (
            <li
              key={food.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                {food.name} - ${food.price.toFixed(2)}
              </span>

              {/* Always show Add button */}
              <button onClick={() => addToCart(food)}>Add to Cart</button>

              {/* Show Remove button only if item is in cart */}
              {isInCart(food.id) && (
                <button
                  onClick={() => removeFromCart(food)}
                  style={{ marginLeft: '10px' }}
                >
                  Remove from Cart
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Your Cart</h2>
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
        <p>
          Total Price: $
          {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </p>
      </div>

     
      <div>
        <Link to="/cart">
          <button>Go to Cart</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
      
      </div>
    </div>
  );
};

export default Han;
