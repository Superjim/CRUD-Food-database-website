import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [kcal, setKcal] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setFoodList(response.data);
    });
  });

  const addFood = () => {
    Axios.post("http://localhost:3001/api/insert", {
      foodName: foodName,
      kcal: kcal,
      carbs: carbs,
      fat: fat,
      protein: protein,
    }).then(() => {
      alert("Food Added");
    });
  };

  return (
    <div className="App">
      <h1>Calorie Tracker</h1>
      <div className="addFood">
        <label>Food Name:</label>
        <input
          type="text"
          name="foodName"
          onChange={(e) => setFoodName(e.target.value)}
        />

        <label>kcal:</label>
        <input
          type="number"
          name="kcal"
          onChange={(e) => setKcal(e.target.value)}
        />

        <label>Carbs (grams):</label>
        <input
          type="number"
          name="carbs"
          onChange={(e) => setCarbs(e.target.value)}
        />

        <label>Fat (grams):</label>
        <input
          type="number"
          name="fat"
          onChange={(e) => setFat(e.target.value)}
        />

        <label>Protein (grams):</label>
        <input
          type="number"
          name="protein"
          onChange={(e) => setProtein(e.target.value)}
        />

        <button onClick={addFood}>Add Food</button>
        {foodList.map((val) => {
          return (
            <h3>
              {val.foodname} - {val.kcal} kcal, {val.carbs}g carbs, {val.fat}g{" "}
              fat, {val.protein}g protein
            </h3>
          );
        })}
      </div>
    </div>
  );
}

export default App;
