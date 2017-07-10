var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var bg0,bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8;

var bounds = width;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game');

game.state.add("bootGame",bootGame);
game.state.add("preloadGame",preloadGame);
game.state.add("playGame",playGame);
game.state.start("bootGame");
