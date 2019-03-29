let menu = new Phaser.Scene('Menu');

menu.preload = function(){
	this.load.setBaseURL('assets/');
	this.load.image('start_btn','start_btn.png');
	this.load.image('help','help.png');
}

menu.create = function(){
	var tunjuk = this.add.image(config.width/2, 250, 'help');
	var btn = this.add.image(config.width/2,config.height/2+200,'start_btn');
	btn.setInteractive();
	btn.on('pointerup',
		function(){
			this.scene.scene.start('Main');
		});
}