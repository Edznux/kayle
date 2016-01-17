var loadState = {

    preload: function() {

        /*
        Load all game assets
        Place your load bar, some messages.
        In this case of loading, only text is placed...
        */

        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#fff'});

        //Load your images, spritesheets, bitmaps...
        game.load.image('kayle', 'assets/img/kayle.png');
        game.load.image('tree', 'assets/img/tree.png');
        game.load.image('rock', 'assets/img/rock.png');
        game.load.image('undefined', 'assets/img/undefined.png');
        game.load.image('grass', 'assets/img/grass.png');
        game.load.image('player', 'assets/img/player.png');
        game.load.image('btn-play','assets/img/btn-play.png');
        game.load.image('btn-load','assets/img/btn-play.png');

        //Load your sounds, efx, music...
        //Example: game.load.audio('rockas', 'assets/snd/rockas.wav');

        //Load your data, JSON, Querys...
        //Example: game.load.json('version', 'http://phaser.io/version.json');

    },

    create: function() {

        game.stage.setBackgroundColor('#DEDEDE');
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.state.start('menu');
    }
};
