//Create variables here
var dog,happyDog,dogimg;
var foodStock,foodS;
var database;
 
function preload()
{
	//load images here
 
  dogimg = loadImage("images/dogimg.png");
  happyDog = loadImage("images/dogimg1.png");
  

}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog  = createSprite(250,300,150,150);
  dog.addImage(dogimg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);


  
}


function draw() {  
    background(46, 139, 87);

    if (keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDog);
    }
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("press up arrow key to give milk to the cuti and hungry dog",130,10,300,20); 


}


function readStock(data){
  foodS = data.val();
}


function writeStock(x){
 
 if(x<=0){
   x = 0;
 }else{
   x = x-1;
 }
 
  database.ref("/").update({
    Food:x
  })
}