var menuState = {

    create: function(){

        game.add.plugin(Phaser.Plugin.Debug);
        // game.add.image(15, 80, 'kayle');
        game.add.plugin(Phaser.Plugin.Inspector);

        // var playButton = game.add.text(350, 250, 'Play', {font: '30px Courier', fill: '#fff',align: "center"});
        var playButton = game.add.button(350, 250, 'btn-play', this.play, this, 2, 1, 0);

    },
    play: function(){
        game.state.start('overworld');
    },
    highscore: function(){
        // game.state.start('overworld');
        console.log("highscore()");
    },
    credit: function(){
        // game.state.start('overworld');
        console.log('credit');
    }
};