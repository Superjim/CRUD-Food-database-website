const express = require("express");
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

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO foods (foodname, weight, kcal, carbs, fat, protein) VALUES ('beef','100','101','102','103','104')";

  db.query(sqlInsert, (err, result) => {
    res.send("hello world!");
  });
});
