let main = new Phaser.Scene('Main');

main.preload = function(){
	this.load.setBaseURL('assets/')
	this.load.image('ground', 'land.png');
	this.load.atlas('dragon','dragon.png','dragon.json');
	this.load.image('apple', 'apple.png');
	this.load.audio('jumpSound','jump.wav');
}

var score;
var scoreText;
var obstacles,dontshoot;
var gameManager;
var height;
var width;
var scoreText;
var gameOver;
var dragon;
var dragonY;
var pressed;
var shoot;  
var tembakan;
var velocity;

main.create = function(){
	shoot=false;
	click=false;
	gameOver=false;
	height = config.height;
	width = config.width;
	pressed = false;
	dragon = this.physics.add.sprite(150,height-200,'dragon','frame-1.png').setScale(0.25);
	gameManager= this;
	dragonY=dragon.y;
	tembakan = this.add.group();
	jumpSound=this.sound.add('jumpSound');

	var BetweenPoints = Phaser.Math.Angle.BetweenPoints;
	var SetToAngle = Phaser.Geom.Line.SetToAngle;
	var velocityFromRotation = this.physics.velocityFromRotation;

	velocity = new Phaser.Math.Vector2();
	var line = new Phaser.Geom.Line();
	var gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xFF0000, alpha: 0.5 } });


	this.input.on('pointermove', function (pointer) {
	var angle = BetweenPoints(dragon, pointer);

	SetToAngle(line, dragon.x+75, dragon.y, angle, 128);
	velocityFromRotation(angle, 600, velocity);
	gfx.clear().strokeLineShape(line);
	}, this);

	this.input.on('pointerup', function () {
		dragonShoot();
	}, this);




	this.obstacles = this.add.group();
	this.bullet = this.add.group();
	this.score=0;
	this.scoreText = this.add.text(16,16,'score: 0', { font: "50px Arial", fill: "#ffffff" });  
	this.obstacles = this.add.group();

	cursors = this.input.keyboard.createCursorKeys();
	this.anims.create(
		{key:'move',
		frames: this.anims.generateFrameNames('kiri',{start:1, end:4, zeroPad:0, prefix:'frame-',suffix:'.png'}),
		repeat:-1,
		frameRate:10
	});

	this.timer = this.time.addEvent({
			delay: 3000,	
			callback: ()=>{
				if(!gameOver){
					randomMoveY();
				}
			},
			callbackScope: this,
			loop: true
	});
	dragon.setCollideWorldBounds(true);
	// dragon.play('move');
}

main.update = function(){
	if(gameOver){
		let gameOverText = this.add.text(game.config.width / 2-100, game.config.height / 2, 'GAME OVER \n SCORE: '+this.score, { fontSize: '32px', fill: '#fff' });
		gameOverText.setDepth(1);
		gameManager.physics.pause();
		var btn = this.add.image(config.width/2,config.height-200,'res_btn');
		btn.setInteractive();
		btn.on('pointerup',
		function(){
			gameManager.scene.resume('Main');
			gameManager.scene.restart();
			});
	}
	// if (cursors.right.isDown && pressed==false){
	// 		dragonShoot();
	// 		console.log('tembak');
	// 	}

	// if(cursors.right.isUp || cursors.left.isUp){
	// 	pressed=false;
	// }

	// if(shoot == true){
	// 	shoot= false;
	//  apple.disablebody(true,true);
	// 	apple.destory();
	// }
	this.scoreText.setText('Score: '+this.score);
}

function randomMoveY(){
	var randomizer = Math.floor(Math.random()*2);
	var randomY = Math.random()*50;
	if(randomizer==0){
		dragon.setActive();
		dragon.setVelocity(0,randomY);
		dragonY = dragonY+randomY;
	}
	else{
		dragon.setActive();
		dragon.setVelocity(0,-randomY);
		dragonY = dragonY-randomY;
	}
}

function addTarget(){

}

function dragonShoot(){
		// shoot = true;
		// var apple = gameManager.physics.add.sprite(170,dragonY,'apple').setScale(0.1);
		// apple.setActive(true);
		// apple.setVelocity(100,0);
		// console.log('fire!');
		var apple = gameManager.physics.add.image(dragon.x+75, dragon.y, 'apple').setScale(0.1);
		apple.setVelocity(velocity.x, velocity.y);
		console.log('dor');
		jumpSound.play();
	
}