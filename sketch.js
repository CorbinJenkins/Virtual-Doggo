//Create variables here
var dogimg,happydog,database,foodS,foodStock

function preload()
{
  dogimg=loadImage("dogImg.png")
  happydog=loadImage("dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,250,10,10);
  dog.addImage(dogimg)
  dog.scale=0.3;
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(happydog);
    
  }

  drawSprites();
  //add styles here
  fill("white")
  text("food left: "+foodS,200,100)
  text("note:press th up arrow to feed this fat dog!!!",100,30)

}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }

  database.ref("/").update({
    Food:x
  })
}

