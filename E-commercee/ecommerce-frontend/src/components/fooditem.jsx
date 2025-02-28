import React from "react";
import { useCart } from "./CartContext";

const FoodItem = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{food.name}</h3>
      <p>Price: ${food.price}</p>
      <button onClick={() => addToCart(food)}>Add to Cart</button>
    </div>
  );
};

export default FoodItem;
