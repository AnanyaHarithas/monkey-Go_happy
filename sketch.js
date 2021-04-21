var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var PLAY = 1 ;
var score = 0;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_end= loadAnimation("sprite_5.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
  
  
 
}



function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(jungleImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  obstaclesGroup = new Group();
  foodGroup = new Group();
 monkey = createSprite(60,240,30,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("ending",monkey_end);
  monkey.scale = 0.2;
  
  ground = createSprite(400,340,800,10);
  ground.visible = false;
  

  
}


function draw() {
  background("white");
  drawSprites();
  if(gameState===PLAY){
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  monkey.velocityY = monkey.velocityY + 0.4                        

  
  monkey .collide(ground); 
 switch(score){
   case 5: monkey.scale = 0.3;
   break;
   case 10: monkey.scale = 0.4;
   break;
   case 15 : monkey.scale = 0.5 ;
   break;
   default: break;
 }
  if (keyDown("space") && monkey.y>=273) {
      monkey.velocityY = -12;
  }
 
  Spawnobstacles();
  Spawnfood();
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score+5;
  }
  if(monkey.isTouching(obstaclesGroup)){
    gameState=END;
      }


}
  
  
fill("white");
textSize(15);
text("Score :"+score, 480 ,50);

  
   if(gameState===END){
    fill("white");
    textSize(25);
    text("Game Over",400,200);
    monkey.changeAnimation("ending",monkey_end);
backgr.velocityX=0;
obstaclesGroup.velocityXEach(0);
foodGroup.velocityXEach(0);

  }
  }


function Spawnobstacles(){
  if(frameCount %200 ==0){
var obstacle = createSprite(800,280,10,40);
    
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -4;
    obstaclesGroup.add(obstacle);
    obstacle.lifetime = 200;
  }
}
function Spawnfood(){
  if(frameCount %150 ==0){
     var banana  = createSprite(800,120,40,10);
    banana.y = Math.round(random(70,120));
     banana.addImage(bananaImage);
    background.x = background.width /2;
    banana.velocityX= -4;
     banana.scale = 0.15;
    banana.lifetime = 200;
    foodGroup.add(banana);

}
}


