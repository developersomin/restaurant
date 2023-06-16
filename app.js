const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const resData = require("./util/restaurant-data")

app.set("views", path.join(__dirname, "views")); //경로를 지정
app.set("view engine", "ejs"); //view engine을 ejs로 설정

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); //request 파싱

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const restaurants = resData.getStoredRestaurants();


  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
  });
});

app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const restaurants = resData.getStoredRestaurants();


  for (const restaurant of restaurants) {
    if(restaurant.id === restaurantId){
      return res.render("restaurant-Detail", {restaurant : restaurant})
    }
  }
  res.status(404).render("404");
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
  const restaurant = req.body; //form 가져옴
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant); //form에 입력받은 값은 자바스크립트 값으로 들어옴

  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

app.use((req,res)=>{
  res.status(404).render('404');
})

app.use((err,req,res,next)=>{
  res.status(500).render('500');
})


app.listen(3000);
