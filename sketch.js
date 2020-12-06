var champion,ground,sceneimg,sanitizer,maskimg,sanitizerimg,manimg1,manimg2,manimg3,manimg4,manimg5,manimg6,manimg7,virusimg;
var virusgroup,mandead,houseimg,distance,houseimg;

function preload(){
sceneimg=loadImage("road.jpg");
maskimg=loadImage("mask1.png");
sanitizerimg=loadImage("sanitizer.gif")
manimg=loadAnimation("sprite1.png","sprite2.png","sprite3.png","sprite4.png","sprite5.png","sprite6.png","sprite7.png")
virusimg=loadImage("virus.png");
mandead=loadAnimation("man.png");
houseimg=loadImage("house.png");
}


function setup() {
  createCanvas(1000,600);
    PLAY = 0;
    END =1;
    WON =2;
    gameState=PLAY; 
    distance=0;
   scene=createSprite(0,0,1300,600);
   scene.x=scene.width/2;
   scene.addImage(sceneimg);
   scene.scale=1.7;
    house =createSprite(1000,480,50,50);
    house.addImage(houseimg);
    house.scale=3;
    house.visible=false;
    house.debug=true;
    house.setCollider("rectangle",0,0,70,100)
   
  champion=createSprite(200,480,50,50);
  champion.addAnimation("m1",manimg)
  champion.addAnimation("m2",mandead)
  champion.debug=true;
  champion.setCollider("rectangle",0,0,100,170)
  ground=createSprite(600,550,10000,10);
 // mask=createSprite(220,400);
 // mask.addImage(maskimg);
  ground.visible=false;
  
  //sanitizerimgcount=0;
  virusgroup=new Group();
  maskgroup=new Group();
  sanitizergroup=new Group();
  edges = createEdgeSprites();
  lifetime=1;
}

function draw() {
  background("black"); 

  
      
if(gameState===PLAY){
  if(keyDown("space")&& champion.y>470){
    
    champion.velocityY=-26;
    }

    champion.velocityY=champion.velocityY+1;
   
    if(scene.x<0){
      scene.x=scene.width/2;
    }
    scene.velocityX=-5;

    distance=distance+Math.round(getFrameRate()/60);

   if(maskgroup.isTouching(champion)){
   lifetime++;
     maskgroup.destroyEach();
   }

   if(sanitizergroup.isTouching(champion)){
      lifetime++;
    sanitizergroup.destroyEach();
  }
  if(distance===100){
    house.visible=true;
    house.velocityX=-3;
  }
  if(champion.isTouching(house)){
    textSize(40)
    text("you won",500,300);
    gameState=WON;
  }

    spawnMask();
    spawnSanitizer();
    spawnVirus();
    if(virusgroup.isTouching(champion)){
      lifetime=lifetime-1;
      virusgroup.destroyEach();
      house.velocityX=0;
    }
    if(lifetime===0){
      gameState=END;
    }
  }

  if(gameState===END){
   
   
    console.log("end");
    scene.velocityX=0;
   champion.changeAnimation("m2",mandead)
   champion.velocityY=0;
   maskgroup.destroyEach();
  sanitizergroup.destroyEach();
  virusgroup.setVelocityXEach(0);
  
    
    
  }

  if(gameState===WON){
    scene.velocityX=0;
    champion.velocityY=0;
    maskgroup.destroyEach();
   sanitizergroup.destroyEach();
   virusgroup.destroyEach();
   house.velocityX=0;
   champion.changeAnimation("m2",mandead);
  }
  
   
    champion.collide(edges[3])

  drawSprites();
  
  textSize(40)
  text("Lifetime:"+lifetime,500,200);

  text("Distance:"+distance,100,50);
  
}


function spawnMask() {
  if(frameCount % 370 === 0) {
   var mask =createSprite(1000,100,50,50);
   mask.y = Math.round(random(100,300));
   mask.addImage(maskimg);
    mask.scale = 0.3;
    mask.velocityX = -3;
    maskgroup.add(mask);
  }
}

function spawnSanitizer(){
  if(frameCount % 270 === 0) {
    var sanitizer =createSprite(1000,700,50,50);
   sanitizer.y = Math.round(random(80,220));
    sanitizer.addImage(sanitizerimg);
     sanitizer.scale = 0.2;
     sanitizer.velocityX =- 3;
     sanitizergroup.add(sanitizer);
   }
}


function spawnVirus(){
  if(frameCount % 80 === 0) {
    var virus =createSprite(1000,700,50,50);
     virus.y = Math.round(random(80,500));
     virus.scale=random(0.2,0.8)
    virus.addImage(virusimg);
    virus.debug=true;
     virus.velocityX = -8;
     virusgroup.add(virus);
   }
}


