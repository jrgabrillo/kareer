var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var bg0,bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8;

var bounds = width;
var gameNight = new Phaser.Game(width, height, Phaser.CANVAS, 'game');

gameNight.state.add("bootGame",bootGame);
gameNight.state.add("preloadGame",preloadGame);
gameNight.state.add("playGame",playGame);
gameNight.state.start("bootGame");