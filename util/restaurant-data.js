const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname,"..", "data", "restaurants.json");

function getStoredRestaurants(){
    const fileData = fs.readFileSync(filePath); //파일 읽을 수 있음
    const storedRestaurants = JSON.parse(fileData); //json->자스객체로
    return storedRestaurants;
}

function storeRestaurants(storableRestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    storeRestaurants: storeRestaurants,
};