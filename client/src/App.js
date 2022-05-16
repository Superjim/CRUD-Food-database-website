import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { PieChart } from "react-minimal-pie-chart";

function App() {
  const [foodName, setFoodName] = useState("");
  const [kcal, setKcal] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");
  const [foodList, setFoodList] = useState([]);

  //calls the backend and stores the response in an array
  //the data is taken from a MYsql database and contains
  //foodname, kcal, carbs, fat and protein
  useEffect(() => {
    Axios.get(
      "https://nutritional-information-mysql.herokuapp.com/api/get"
    ).then((response) => {
      console.log(response);
      setFoodList(response.data);
    });
  });

  //passes new food data to the backend post API
  const addFood = () => {
    Axios.post(
      "https://nutritional-information-mysql.herokuapp.com/api/insert",
      {
        foodName: foodName,
        kcal: kcal,
        carbs: carbs,
        fat: fat,
        protein: protein,
      }
    );

    //adds the food to the foodList array so it is rendered onscreen
    setFoodList([
      ...foodList,
      {
        foodName: foodName,
        kcal: kcal,
        carbs: carbs,
        fat: fat,
        protein: protein,
      },
    ]);
  };

  //passes the variable sent (foodname) to the backend delete API
  const deleteFood = (food) => {
    Axios.delete(
      `https://nutritional-information-mysql.herokuapp.com/api/delete/${food}`
    );
  };

  return (
    <div className="App">
      <h1>Nutritional Database</h1>
      {
        //Add food input container
      }
      <div className="addFood">
        <label>Food Name:</label>
        <input
          type="text"
          name="foodName"
          onChange={(e) => setFoodName(e.target.value)}
        />

        <label>Energy (kcal):</label>
        <input
          type="number"
          name="kcal"
          onChange={(e) => setKcal(e.target.value)}
        />

        <label>Carbs (g):</label>
        <input
          type="number"
          name="carbs"
          onChange={(e) => setCarbs(e.target.value)}
        />

        <label>Fat (g):</label>
        <input
          type="number"
          name="fat"
          onChange={(e) => setFat(e.target.value)}
        />

        <label>Protein (g):</label>
        <input
          type="number"
          name="protein"
          onChange={(e) => setProtein(e.target.value)}
        />
        {
          //Add food button
        }
        <button onClick={addFood}>Add Food</button>
      </div>
      {
        //Renders each object in the foodList array via array.map
        //displays title, kcal, carbs fat and protein
        //A piechart is created which displays the % of carbs, fat and protein
      }
      <div className="foodDisplay">
        {foodList.map((e) => {
          return (
            <div className="foodContainer">
              <h3>{e.foodname}</h3>
              <div className="dataChartContainer">
                <div className="foodData">
                  <p>Energy (kcal) : {e.kcal}</p>
                  <p>Carbohydrate (g): {e.carbs}</p>
                  <p>Fat (g): {e.fat}</p>
                  <p>Protein (g): {e.protein}</p>
                </div>
                <div className="pieChart">
                  <PieChart
                    label={({ dataEntry }) =>
                      `${dataEntry.title} ${Math.round(dataEntry.percentage)}%`
                    }
                    data={[
                      {
                        title: "Carbs",
                        value: e.carbs,
                        color: "#804000",
                      },
                      {
                        title: "Fat",
                        value: e.fat,
                        color: "#FFFF00",
                      },
                      {
                        title: "Protein",
                        value: e.protein,
                        color: "#C13C37",
                      },
                    ]}
                  />
                </div>
              </div>
              {
                //Delete food button
                //Passes foodname to deleteFood function
                //Which is sent to the backend
              }
              <button onClick={() => deleteFood(e.foodname)}>
                Delete Food
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
