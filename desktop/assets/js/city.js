var bg0,bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8;

city_bootGame = {
	create:function(){
		gameCity.physics.startSystem(Phaser.Physics.ARCADE);
        gameCity.world.setBounds(0,0,bounds,0);
		gameCity.stage.backgroundColor = "#ccc";
        keyboard = gameCity.input.keyboard.createCursorKeys();
		gameCity.state.start("city_preloadGame");
	},
}

city_preloadGame = {
	preload:function(){
        gameCity.load.image("bg0","assets/img/city/parallax/layer_01_1920 x 1080.png");
        gameCity.load.image("bg1","assets/img/city/parallax/layer_02_1920 x 1080.png");
        gameCity.load.image("bg2","assets/img/city/parallax/layer_03_1920 x 1080.png");
        gameCity.load.image("bg3","assets/img/city/parallax/layer_04_1920 x 1080.png");
        gameCity.load.image("bg4","assets/img/city/parallax/layer_05_1920 x 1080.png");
        gameCity.load.image("bg5","assets/img/city/parallax/layer_06_1920 x 1080.png");
        gameCity.load.image("bg6","assets/img/city/parallax/layer_07_1920 x 1080.png");
        gameCity.load.image("bg7","assets/img/city/parallax/layer_08_1920 x 1080.png");
        // gameCity.load.spritesheet("pusakal","img/baddie.png",32,32);
	},
	create:function(){
		gameCity.state.start("city_playGame");
	},
}

city_playGame = {
	create:function(){
        gameCity.world.setBounds(0,0,bounds,0);
        gameCity.physics.startSystem(Phaser.Physics.ARCADE);

        bg7 = gameCity.add.tileSprite(0,
            gameCity.height - gameCity.cache.getImage("bg7").height,
            bounds,
            gameCity.cache.getImage("bg7").height,
            "bg7");

        bg6 = gameCity.add.tileSprite(0,
            gameCity.height - gameCity.cache.getImage("bg6").height,
            bounds,
            gameCity.cache.getImage("bg6").height,
            "bg6");

        bg5 = gameCity.add.tileSprite(0,
            gameCity.height - gameCity.cache.getImage("bg5").height,
            bounds,
            gameCity.cache.getImage("bg5").height,
            "bg5");

        bg4 = gameCity.add.tileSprite(0,
            gameCity.height - gameCity.cache.getImage("bg4").height,
            bounds,
            gameCity.cache.getImage("bg4").height,
            "bg4");

        bg3 = gameCity.add.tileSprite(0,
            gameCity.height - gameCity.cache.getImage("bg3").height,
            bounds,
            gameCity.cache.getImage("bg3").height,
            "bg3");

        bg2 = gameCity.add.tileSprite(0,
            gameCity.height - gameCity.cache.getImage("bg2").height,
            bounds,
            gameCity.cache.getImage("bg2").height,
            "bg2");

        bg1 = gameCity.add.tileSprite(0,
            gameCity.height - gameCity.cache.getImage("bg1").height,
            bounds,
            gameCity.cache.getImage("bg1").height,
            "bg1");

        bg0 = gameCity.add.tileSprite(0,
            gameCity.height - gameCity.cache.getImage("bg0").height,
            bounds,
            gameCity.cache.getImage("bg0").height,
            "bg0");
	},
	update:function(){
        bg0.tilePosition.x -= 0.8;
        bg1.tilePosition.x -= 0.7;
        bg2.tilePosition.x -= 0.6;
        bg3.tilePosition.x -= 0.5;
        bg4.tilePosition.x -= 0.4;
        bg5.tilePosition.x -= 0.3;
        bg6.tilePosition.x -= 0.2;
        bg7.tilePosition.x -= 0.1;
	}
}
console.log("city");