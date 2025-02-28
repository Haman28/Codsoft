import React from "react";
import FoodItem from "./FoodItem";

const foods = [
  { id: 1, name: "Pizza", price: 10.99 },
  { id: 2, name: "Burger", price: 7.99 },
  { id: 3, name: "Pasta", price: 8.49 }
];

const FoodList = () => {
  return (
    <div>
      {foods.map((food) => (
        <FoodItem key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;
