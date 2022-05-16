const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "food_database",
});

app.listen(3001, () => {
  console.log("server on port 3001");
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/insert", (req, res) => {
  const foodName = req.body.foodName;
  const kcal = req.body.kcal;
  const carbs = req.body.carbs;
  const fat = req.body.fat;
  const protein = req.body.protein;

  const input =
    "INSERT INTO foods (foodname, kcal, carbs, fat, protein) VALUES (?,?,?,?,?)";
  db.query(input, [foodName, kcal, carbs, fat, protein], (err, result) => {
    console.log(result);
  });
});

app.get("/api/get", (req, res) => {
  const getInfo = "SELECT * FROM foods";
  db.query(getInfo, (err, result) => {
    res.send(result);
  });
});
