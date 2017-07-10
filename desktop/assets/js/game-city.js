var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var bg0,bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8;

var bounds = width;
var gameCity = new Phaser.Game(width, height, Phaser.CANVAS, 'game');

gameCity.state.add("city_bootGame",city_bootGame);
gameCity.state.add("city_preloadGame",city_preloadGame);
gameCity.state.add("city_playGame",city_playGame);
gameCity.state.start("city_bootGame");