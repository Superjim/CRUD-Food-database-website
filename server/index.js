const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "fooddatabase",
});

app.listen(3001, () => {
  console.log("server running port 3001");
});

app.use(bodyParser.urlencoded{extended: true}); 
app.use(cors());

app.post("/api/insert", (req, res) => {

    const foodName = req.body.foodName;
    const foodWeight = req.body.foodWeight;
    const kcal = req.body.kcal;
    const carbs = req.body.carbs;
    const fat = req.body.fat;
    const protein = req.body.protein;

  const input =
    "INSERT INTO foods (foodname, weight, kcal, carbs, fat, protein) VALUES (?,?,?,?,?,?)";
  db.query(input, [foodName, foodWeight, kcal, carbs, fat, protein], (err, result) => {});
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO foods (foodname, weight, kcal, carbs, fat, protein) VALUES ('beef','100','101','102','103','104')";

  db.query(sqlInsert, (err, result) => {
    res.send("hello world!");
  });
});
