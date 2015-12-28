/*
* @param {Object} text
* @param {int} x in px
* @param {int} y in px
* @param {int} size in px
* @param {int} duration in ms
 */
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