var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var bg0,bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8;

var bounds = width;
var gameForest = new Phaser.Game(width, height, Phaser.CANVAS, 'game');

gameForest.state.add("forest_bootGame",forest_bootGame);
gameForest.state.add("forest_preloadGame",forest_preloadGame);
gameForest.state.add("forest_playGame",forest_playGame);
gameForest.state.start("forest_bootGame");