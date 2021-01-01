//Create variables here
var dog,dogImg, happyDogImg, database, foodS, foodStock;
var feed,addFood;
var foodTime,lastFed;
var foodObj


function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/happyDogImg.png")
}

function setup() {
  createCanvas(500, 500);

  foodObj=new Food();
  database=firebase.database();
  databaseRef=database.ref("Food");
  databaseRef.on("value",readStock)
  
  dog=createSprite(250,300,50,10)
  dog.addImage(dogImg)
  dog.scale=0.3
 
  feed=createButton("Feed The Dog")
  addFood=createButton("Add Food");

}



function draw() { 
  
  background(46,139,87)

    fedTime=database.ref("fedTime");
    fedTime.on("value",function(data){
      lastFed=data.val()})

    fill(255);
    textSize(20)

    if(lastFed>=12){
      text("Last Feed:" +lastFed%12+"PM",250,30);
    }
    else if(lastFed==0){
      text("Last Feed: 12 AM",250,30)
    }else{
      text("Last Feed: "+ lastFed+ "AM",250,30)
    }

    foodObj.display();
    drawSprites();

    feed.position(650,120)
    feed.mousePressed(feedDog);
  

    addFood.position(750,120);
    addFood.mousePressed(addFoods);
    
  }

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
  
}

function feedDog(){
  dog.addImage(happyDogImg)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    fedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}