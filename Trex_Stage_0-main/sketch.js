var trex , trex_running;
var edges;
var ground, ground_image;
var invisible_ground;
var desert,desert_image;
var cloud,cloud_image;
var score=0
var cactus,cactus_image1,cactus_image2,
cactus_image3,cactus_image4,
cactus_image5,cactus_image6;
var cactus_group
var cloud_group
var PLAY=1
var END=0
var gamestate=PLAY
var trexcollide;
var gameover,gameoverImg
var restart,restartImg
var jump
var die
var checkpoint

function preload(){
  trex_running= loadAnimation("images/trex1.png" ,
                        "images/trex3.png", "images/trex4.png" );
  ground_image = loadImage( "images/ground2.png");
  desert_image = loadImage( "images/desert.png");
  cloud_image=loadImage("images/cloud.png");
  cactus_image1=loadImage("images/obstacle1.png");
  cactus_image2=loadImage("images/obstacle2.png");
  cactus_image3=loadImage("images/obstacle3.png");
  cactus_image4=loadImage("images/obstacle4.png");
  cactus_image5=loadImage("images/obstacle5.png");
  cactus_image6=loadImage("images/obstacle6.png");
  trexcollide=loadAnimation("images/trex_collided.png");
  gameoverImg=loadImage("images/gameOver.png");
  restartImg=loadImage("images/restart.png")
  jump=loadSound("jump.mp3")
  die=loadSound("die.mp3")
  checkpoint=loadSound("checkpoint.mp3")

}

function setup(){
  createCanvas(600,200)

 // desert=createSprite(330,0,800,200);
  //desert.addImage("desert" ,  desert_image) ;
  //  desert.scale=1;
  //create trex
  trex= createSprite(50,160,10,100);
  trex.addAnimation ("running" ,  trex_running) ;
  trex.addAnimation("collided",trexcollide);
  trex.scale=0.5;

  //create edges
  edges = createEdgeSprites();

  // creat ground
  ground=createSprite(300,170,700,20);
  ground.addImage("ground" ,  ground_image) ;
  
//creating groups
  cactus_group=new Group();

  cloud_group=new Group();


  //creat invisible ground
  invisible_ground=createSprite(300,190,700,20);
  invisible_ground.visible=false;
  trex.debug = false;
  trex.setCollider("circle",0,0,40)

gameover=createSprite(300,100)
gameover.addImage("gameover",gameoverImg);
gameover.scale=0.5
restart=createSprite(300,120)
restart.addImage("restart",restartImg);
restart.scale=0.5

}

function draw(){
  background("skyBlue"); 
  text ("score:"+score,500,50)
if(gamestate===PLAY){
  gameover.visible=false
  restart.visible=false
  score=score+Math.round(frameCount/60)
  console.log(trex.y);
 
  //move trex up
 if (keyDown("space")&&trex.y>=100){
  trex.velocityY=-10;
  jump.play();
}
if(score%100===0&& score>0){
  checkpoint.play();
}
//gravity for trex
trex.velocityY=trex.velocityY+0.8;
 //making ground move
 ground.velocityX=-(2+score/100);

 //make ground come continuasly
 if(ground.x<0){
   ground.x= ground.width/2;

 }
  clouds();
  Cactus();
if(cactus_group.isTouching(trex)){
  gamestate=END
  die.play();
}
}
else if(gamestate===END){
gameover.visible=true
restart.visible=true
  ground.velocityX=0
cactus_group.setVelocityXEach(0)
cloud_group.setVelocityXEach(0)
cloud_group.setLifetimeEach(-1)
cactus_group.setLifetimeEach(-1)
trex.changeAnimation("collided",trexcollide);
}



 
 
 

  // collide trex with ground
  trex.collide(invisible_ground);
  
  drawSprites();

}
function clouds() {
  if(frameCount%60===0){
 cloud=createSprite(600,40,100,10);
 cloud.addImage("clouds",cloud_image);
 cloud.scale=0.8;
 cloud.velocityX=-3;
 cloud.y=Math.round(random(10,60));
 trex.depth=cloud.depth;
 trex.depht=trex.depth+1
 cloud.lifetime=200
  cloud_group.add(cloud)

  }
}
function Cactus(){
  if(frameCount%100===0){ 
cactus=createSprite(600,165,10,40)
cactus.velocityX=-(3+score/100)
var R=Math.round(random(1,6));
switch(R){
  case 1:
  cactus.addImage(cactus_image1);
  break;
  case 2:
    cactus.addImage(cactus_image2);
    break;
    case 3:
      cactus.addImage(cactus_image3);
      break;
      case 4:
       cactus.addImage(cactus_image4);
        break;
        case 5:
  cactus.addImage(cactus_image5);
  break;
  case 6:
  cactus.addImage(cactus_image6);
  break;
  default:break;
}
cactus.scale=0.5;
cactus.lifetime=200
cactus_group.add(cactus);
}
}
