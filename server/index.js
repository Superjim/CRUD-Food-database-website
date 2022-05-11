const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "footdatabase",
});

app.listen(3006, () => {
  console.log("server running port 3006");
});

app.get("/", (req, res) => {
  const sqlInput =
    "INSERT INTO fooddatabase (foodname, weight, kcal, carbs, fat, protein) VALUES ('beef', '100', '101', '102', '103', '104')";
  db.query(sqlInput, (err, result) => {
    res.send("hello world!!");
  });
});
