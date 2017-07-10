var bg0,bg1,bg2,bg3,bg4,bg5,bg6,bg7;

bootGame = {
	create:function(){
		gameNight.physics.startSystem(Phaser.Physics.ARCADE);
        gameNight.world.setBounds(0,0,bounds,0);
		gameNight.stage.backgroundColor = "#ccc";
        keyboard = gameNight.input.keyboard.createCursorKeys();
		gameNight.state.start("preloadGame");
	},
}

preloadGame = {
	preload:function(){
        gameNight.load.image("bg0","assets/img/night/parallax/layer_01_1920 x 1080.png");
        gameNight.load.image("bg1","assets/img/night/parallax/layer_02_1920 x 1080.png");
        gameNight.load.image("bg2","assets/img/night/parallax/layer_03_1920 x 1080.png");
        gameNight.load.image("bg3","assets/img/night/parallax/layer_04_1920 x 1080.png");
        gameNight.load.image("bg4","assets/img/night/parallax/layer_05_1920 x 1080.png");
        gameNight.load.image("bg5","assets/img/night/parallax/layer_06_1920 x 1080.png");
        gameNight.load.image("bg6","assets/img/night/parallax/layer_07_1920 x 1080.png");
        // gameNight.load.spritesheet("pusakal","img/baddie.png",32,32);
	},
	create:function(){
		gameNight.state.start("playGame");
	},
}

playGame = {
	create:function(){
        gameNight.world.setBounds(0,0,bounds,0);
        gameNight.physics.startSystem(Phaser.Physics.ARCADE);

        bg6 = gameNight.add.tileSprite(0,
            gameNight.height - gameNight.cache.getImage("bg6").height,
            bounds,
            gameNight.cache.getImage("bg6").height,
            "bg6");

        bg5 = gameNight.add.tileSprite(0,
            gameNight.height - gameNight.cache.getImage("bg5").height,
            bounds,
            gameNight.cache.getImage("bg5").height,
            "bg5");

        bg4 = gameNight.add.tileSprite(0,
            gameNight.height - gameNight.cache.getImage("bg4").height,
            bounds,
            gameNight.cache.getImage("bg4").height,
            "bg4");

        bg3 = gameNight.add.tileSprite(0,
            gameNight.height - gameNight.cache.getImage("bg3").height,
            bounds,
            gameNight.cache.getImage("bg3").height,
            "bg3");

        bg2 = gameNight.add.tileSprite(0,
            gameNight.height - gameNight.cache.getImage("bg2").height,
            bounds,
            gameNight.cache.getImage("bg2").height,
            "bg2");

        bg1 = gameNight.add.tileSprite(0,
            gameNight.height - gameNight.cache.getImage("bg1").height,
            bounds,
            gameNight.cache.getImage("bg1").height,
            "bg1");

        bg0 = gameNight.add.tileSprite(0,
            gameNight.height - gameNight.cache.getImage("bg0").height,
            bounds,
            gameNight.cache.getImage("bg0").height,
            "bg0");

        // pusakal = gameNight.add.sprite(gameNight.width/2,gameNight.height-(32*3),"pusakal");
        // pusakal.scale.x = 3;
        // pusakal.scale.y = 3;

        // gameNight.camera.follow(pusakal,Phaser.Camera.FOLLOW_TOPDOWN);
        // pusakal.animations.add("meow-left",[0,1],10,true);
        // pusakal.animations.add("meow-right",[2,3],10,true);

        // keyboard = gameNight.input.keyboard.createCursorKeys();

        // gameNight.physics.arcade.enable(pusakal);
        // pusakal.body.collideWorldBounds = true;

	},
	update:function(){
        bg0.tilePosition.x -= 0.7;
        bg1.tilePosition.x -= 0.6;
        bg2.tilePosition.x -= 0.5;
        bg3.tilePosition.x -= 0.4;
        bg4.tilePosition.x -= 0.3;
        bg5.tilePosition.x -= 0.2;
        bg6.tilePosition.x -= 0.1;
        // if(keyboard.left.isDown){
        //     pusakal.body.velocity.x = -200;
        //     pusakal.animations.play("meow-left");
        // }
        // else if(keyboard.right.isDown){
        //     pusakal.body.velocity.x = +200;
        //     pusakal.animations.play("meow-right");
        //     bg1.tilePosition.x += 0.1;
        //     bg2.tilePosition.x += 0.5;
        //     bg3.tilePosition.x += 1;
        // }
        // else{
        //     pusakal.body.velocity.x = 0;
        //     pusakal.animations.stop();
        //     pusakal.frame = 2;
        // }
	}
}