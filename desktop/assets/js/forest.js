forest_bootGame = {
	create:function(){
		gameForest.physics.startSystem(Phaser.Physics.ARCADE);
        gameForest.world.setBounds(0,0,bounds,0);
		gameForest.stage.backgroundColor = "#ccc";
        keyboard = gameForest.input.keyboard.createCursorKeys();
		gameForest.state.start("forest_preloadGame");
	},
}

forest_preloadGame = {
	preload:function(){
        gameForest.load.image("bg0","assets/img/forest/parallax/layer_01_1920 x 1080.png");
        gameForest.load.image("bg1","assets/img/forest/parallax/layer_02_1920 x 1080.png");
        gameForest.load.image("bg2","assets/img/forest/parallax/layer_03_1920 x 1080.png");
        gameForest.load.image("bg3","assets/img/forest/parallax/layer_04_1920 x 1080.png");
        gameForest.load.image("bg4","assets/img/forest/parallax/layer_05_1920 x 1080.png");
	},
	create:function(){
		gameForest.state.start("forest_playGame");
	},
}

forest_playGame = {
	create:function(){
        gameForest.world.setBounds(0,0,bounds,0);
        gameForest.physics.startSystem(Phaser.Physics.ARCADE);

        bg4 = gameForest.add.tileSprite(0,
            gameForest.height - gameForest.cache.getImage("bg4").height,
            bounds,
            gameForest.cache.getImage("bg4").height,
            "bg4");

        bg3 = gameForest.add.tileSprite(0,
            gameForest.height - gameForest.cache.getImage("bg3").height,
            bounds,
            gameForest.cache.getImage("bg3").height,
            "bg3");

        bg2 = gameForest.add.tileSprite(0,
            gameForest.height - gameForest.cache.getImage("bg2").height,
            bounds,
            gameForest.cache.getImage("bg2").height,
            "bg2");

        bg1 = gameForest.add.tileSprite(0,
            gameForest.height - gameForest.cache.getImage("bg1").height,
            bounds,
            gameForest.cache.getImage("bg1").height,
            "bg1");

        bg0 = gameForest.add.tileSprite(0,
            gameForest.height - gameForest.cache.getImage("bg0").height,
            bounds,
            gameForest.cache.getImage("bg0").height,
            "bg0");
	},
	update:function(){
        bg0.tilePosition.x -= 0.8;
        bg1.tilePosition.x -= 0.7;
        bg2.tilePosition.x -= 0.6;
        bg3.tilePosition.x -= 0.5;
        bg4.tilePosition.x -= 0.4;
	}
}

console.log("forest");