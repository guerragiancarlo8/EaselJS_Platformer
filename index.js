var canvas;
var stage;
var screen_width;
var screen_height;
var bmpAnimation;

var imgMonsterARun = new Image();

function init(){
	canvas = document.getElementById("testCanvas")
	imgMonsterARun.onload = handleImageLoad;
	imgMonsterARun.onerror = handleImageError;
	imgMonsterARun.src = "img/MonsterARun.png"
}

function reset(){
	stage.removeAllChildren();
	createjs.Ticker.removeAllListeners();
	stage.update();
}

function handleImageLoad(e){
	startGame();
}

function startGame(){
	//create new stage and point it at canvas
	stage = new createjs.Stage(canvas)
	//grab canvas width and height for later calcs
	screen_width = canvas.width;
	screen_height = canvas.height;
	//create spritesheet and assign the associated data
	var spriteSheet = new createjs.SpriteSheet({
		//image to use
		images: [imgMonsterARun],
		//width height & registration point of each sprite
		frames: {width: 64, height: 64, regX: 32, regY: 32},
		animations: {
			walk: [0,9,"walk"]
		}
	});

	//create BitmapAction instance to display and play back the spritesheet
	bmpAnimation = new createjs.BitmapAnimation(spriteSheet);
	//start playing the first sequence:
	bmpAnimation.gotoAndPlay("walk");
	//set up shadow. expensive
	bmpAnimation.shadow = new createjs.Shadow("#454",0,5,4);
	bmpAnimation.name = "monster1";
	bmpAnimation.direction = 90;
	bmpAnimation.vX = 4;
	bmpAnimation.x = 16;
	bmpAnimation.y = 32;
	//have monster start at a specific frame
	bmpAnimation.currentFrame = 0;
	stage.addChild(bmpAnimation);

	createjs.Ticker.addListener(window)
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
}

function handleImageError(e){
	console.log("Error Loading Image : " + e.target.src);
}

function tick(){
	//Hit testing the screen width, otherwise our sprite disapppears
	if(bmpAnimation.x >= screen_width - 16){
		//we've reached the right side of our screen
		//we need to walk left now to go back to our init pos
		bmpAnimation.direction = -90;
	}
	if(bmpAnimation.x < 16){
		//we've reached the left side of screen
		//walk right
		bmpAnimation.direction = 90;
	}
	if(bmpAnimation.direction == 90){
		bmpAnimation.x += bmpAnimation.vX;
	}
	else {
		bmpAnimation.x -= bmpAnimation.vX;
	}
	stage.udpate();
}