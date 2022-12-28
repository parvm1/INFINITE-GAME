var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5  
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background(200);

  if(gameState === "play"){
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x-3
    }
    if(keyDown("right_Arrow")){
      ghost.x = ghost.x+3
    }
    if(keyDown("space")){
      ghost.velocityY = -10
    }

    if(tower.y > 400){
      tower.y = 300
    }

    ghost.velocityY = ghost.velocityY+0.8

    spawnDoors()

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0 
    }

    if(invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy()
      gameState = 'end'
    }

  }
  
  
  drawSprites();
  
  if(gameState === 'end'){
    stroke('yellow')
    fill('yellow')
    textSize(30)
    text('game over',250,230)
  }

  
}

function spawnDoors(){

  if(frameCount%240===0){
    door = createSprite(200,-50)
    climber = createSprite(200,10)
    invisibleBlock = createSprite(200,15)

    invisibleBlock.width = climber.width
    invisibleBlock.height = 2

    door.x = Math.round(random(120,400))
    climber.x = door.x
    invisibleBlock.x = door.x

    door.addImage(doorImg)
    climber.addImage(climberImg)

    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1

    door.lifeTime = 600
    climber.lifeTime = 600
    invisibleBlock.lifeTime = 600
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(door)
    
    invisibleBlock.debug = false
  }

  

}
  

  



