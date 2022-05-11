import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <h1>Calorie Tracker</h1>
      <div className="addFood">
        <label>Food Name:</label>
        <input type="text" name="foodName" />
        <label>Food Weight (grams):</label>
        <input type="number" name="foodWeight" />
        <label>kcal:</label>
        <input type="number" name="kcal" />
        <label>Carbs (grams):</label>
        <input type="number" name="carbs" />
        <label>Fat (grams):</label>
        <input type="number" name="fat" />
        <label>Protein (grams):</label>
        <input type="number" name="protein" />
      </div>
    </div>
  );
}

export default App;
