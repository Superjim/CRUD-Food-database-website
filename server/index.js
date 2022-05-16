const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

//database login
const db = mysql.createPool({
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b857774e4187b7",
  password: "6b163e80",
  database: "heroku_c7bdbf2d9cf067b",
});

//clearDB info
//mysql://b857774e4187b7:6b163e80@eu-cdbr-west-02.cleardb.net/heroku_c7bdbf2d9cf067b?reconnect=true

//start server on this port

const PORT = 3001;
app.listen(process.env.PORT || PORT, () => {
  console.log(`server on port ${PORT}`);
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//insert new row into database foods table
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

//get all information from foods table
app.get("/api/get", (req, res) => {
  const getInfo = "SELECT * FROM foods";
  db.query(getInfo, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

//delete food in database by foodname
//i should change this to unique ID
app.delete("/api/delete/:foodname", (req, res) => {
  const foodname = req.params.foodname;
  const deleteInfo = "DELETE FROM foods WHERE foodname = ?";
  db.query(deleteInfo, foodname, (err, result) => {
    if (err) console.log(err);
  });
});
