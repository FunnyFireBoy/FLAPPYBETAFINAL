var bg, bgImg
var bottomGround
var topGround
var bird, birdImg
var obs1, obs2, obs3, top1, top2, obstacle, tops
var obsGroup
var topsGroup
var PLAY = 1
var END = 0
var gameState = PLAY
var gameOver, gameOverImg

function preload(){
bgImg = loadImage("assets/bg.png")
obs1 = loadImage("assets/pillar1.png")
obs2 = loadImage("assets/pillar2.png")
obs3 = loadImage("assets/pillar3.png")
birdImg = loadAnimation("assets/bird.png")
top1 = loadImage("assets/top2.png")
top2 = loadImage("assets/top3.png")
gameOverImg = loadImage("assets/gameOver.png")
}
 
function setup(){

//background image
bg = createSprite(0,0,1,1);
bg.addImage(bgImg);
bg.scale = 1


//creating top and bottom grounds
bottomGround = createSprite(200,370,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
bird = createSprite(100,200,20,50);
bird.addAnimation("bird",birdImg);
bird.scale = 0.1;
bird.debug = true 
obsGroup = new Group()
topsGroup = new Group()

gameOver = createSprite(220,200);
gameOver.addImage("gameOver",gameOverImg);
gameOver.scale = 0.3;
gameOver.visible = false




}

function draw() {

  
  background("white");
     if(gameState === PLAY)  
     {

     
          //making the hot air balloon jump
          if(keyDown("space")) {
           bird.velocityY = -6 ;
            
          }

          //adding gravity
           bird.velocityY = bird.velocityY + 2;



   
           spawnObstacle()

           topsObstacle()
           if(topsGroup.isTouching(bird)|| obsGroup.isTouching(bird))
           {
                gameState = END
                console.log(gameState)

           }
     } 
     if(gameState == END)
     {
        gameOver.visible = true
        bird.velocityX = 0
        bird.velocityY = 0
        topsGroup.setVelocityXEach(0)
        obsGroup.setVelocityXEach(0)
     }     
        drawSprites();
        
}


function spawnObstacle()
{
        if(World.frameCount%60===0)
        {
                obstacle = createSprite(400,250,40,50)
                var rand = Math.round(random(1,2))
                switch(rand)
                {
                         case 1:
                        obstacle.addImage(obs1)
                        break
                        case 2:
                                obstacle.addImage(obs2)
                                break
                        
                              
                }
                obstacle.scale = 0.1
                obstacle.velocityX = -5
                bird.depth = bird.depth + 1
obsGroup.add(obstacle)

        }
}

function topsObstacle()
{
        if(World.frameCount%80===0)
        {
                tops = createSprite(400,50,40,50)
                var rand = Math.round(random(1,2))
                switch(rand)
                {
                         case 1:
                        tops.addImage(top1)
                        break
                        case 2:
                                tops.addImage(top2)
                                break
                        
                              
                }
                tops.scale = 0.1
                tops.velocityX = -5
                bird.depth = bird.depth + 1
                
topsGroup.add(tops)

        }
}