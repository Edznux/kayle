/*
* @param {Object} text
* @param {int} x in px
* @param {int} y in px
* @param {int} size in px
* @param {int} duration in ms
 */

var ROCK_ID     = 0,
    GRASS_ID    = 1,
    TREE_ID     = 2,
    FARM_ID     = 3,
    WOODFARM_ID = 4,
    WOOD_CASTLE_LEFT_ID      = 5,
    WOOD_CASTLE_MID_LEFT_ID  = 6,
    WOOD_CASTLE_MID_ID      = 7,
    WOOD_CASTLE_MID_RIGHT_ID = 8,
    WOOD_CASTLE_RIGHT_ID     = 8;


var ITEMS_NAME = [
    "rock",
    "grass",
    "tree",
    "undefined",
    "undefined",
    "undefined",
    "undefined",
    "undefined",
    "undefined",
    "undefined"
];
/*
var ITEMS_NAME = [
    "rock",
    "grass",
    "tree",
    "farm",
    "wood_farm",
    "wood_castle_left",
    "wood_castle_mid_left",
    "wood_castle_mid",
    "wood_castle_mid_right",
    "wood_castle_mid_left"
];
*/
var MAP_LENGTH= 2000;
var TILE_SIZE = 64;
var GROUND_Y = 464;

var NB_RENDER_SCREEN = 3;
var NB_RENDER_TILES = parseInt(game.width / TILE_SIZE) * NB_RENDER_SCREEN;


function information(text, x, y, size, duration){
    size = size || 30;
    x = x || game.width/2 - (text.length * (size / 2));
    y = y || 100;

    duration = duration || 2000;

    var textInfo = game.add.text(x, y, text, {font: size+'px Courier', fill: '#fff'});
    game.time.events.add(duration, function() {
        game.add.tween(textInfo).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        textInfo.destroy();
    }, this);
}

function getSeed(){
    if(localStorage.getItem("seed") == null){
        var seed = Math.random()*1000000;
        game.world.seed = seed;
        localStorage.setItem("seed", JSON.stringify(seed));
    }else{
        game.world.seed = JSON.parse(localStorage.getItem("seed"));
    }
    return game.world.seed;
}

function saveMap(){
    localStorage.setItem("map", game.world.map);
}