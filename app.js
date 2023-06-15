const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("views", path.join(__dirname, "views")); //경로를 지정
app.set("view engine", "ejs"); //view engine을 ejs로 설정

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); //request 파싱

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath); //파일 읽을 수 있음
  const storedRestaurants = JSON.parse(fileData); //json->자스객체로

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurants = req.body; //form 가져옴
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath); //파일 읽을 수 있음
  const storedRestaurants = JSON.parse(fileData); //json->자스객체로

  storedRestaurants.push(restaurants); //form에 입력받은 값은 자바스크립트 값으로 들어옴

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); //파일에 json 형식으로 바꾸어 파일에 입력함

  res.redirect("/confirm");
});

app.listen(3000);
