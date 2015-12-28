//noinspection JSDuplicatedDeclaration
var ROCK_ID     = 0,
    GRASS_ID    = 1,
    TREE_ID     = 2,
    FARM_ID     = 3,
    WOODFARM_ID = 4,
    WOOD_CASTLE_LEFT      = 5,
    WOOD_CASTLE_MID_LEFT  = 6,
    WOOD_CASTLE_MID       = 7,
    WOOD_CASTLE_MID_RIGHT = 8,
    WOOD_CASTLE_RIGHT     = 8;

var MAP_LENGTH= 2000;
var TILE_SIZE = 64;

var overworldState = {
    self:this,
    player:null,
    cursors:null,
    grass:null,
    seedKey:null,
    floor: null,
    nbFloorTiles:null,

    drawFloor: function(){
        self.nbFloorTiles = parseInt(game.width / TILE_SIZE) + 4;
        self.floor = game.add.group();
        var i=0;
        for(i; i < self.nbFloorTiles; i++) {
            self.floor.create(i * TILE_SIZE, 464, 'grass');
        }
    },

    createCastle: function(x, era){
        era = era || "WOOD";
        if(era == "WOOD"){
            game.world.map[x-2] =  WOOD_CASTLE_LEFT;
            game.world.map[x-1] =  WOOD_CASTLE_MID_LEFT;
            game.world.map[x]   =  WOOD_CASTLE_MID;
            game.world.map[x+1] =  WOOD_CASTLE_MID_RIGHT;
            game.world.map[x+2] =  WOOD_CASTLE_RIGHT;
        }
        if(era == "STONE"){
            // todo
        }
    },

    generateWorld: function(){
        var rand;

        // tmp id, used only in the loop
        var id;
        for (var i = 0; i < MAP_LENGTH; i++){
            // random between 0 and 99

            rand = parseInt(Math.random()*100);
            if(rand > 0 ){
                //console.log(id);
                id = null;
            }
            if(rand > 70){
                id = ROCK_ID;
            }
            if(rand > 80){
                id = TREE_ID;
            }
            if(rand > 90){
                id = FARM_ID;
            }
            if(rand > 95){
                id = WOODFARM_ID;
            }
            game.world.map.push(id);
        }

        // create starting caste in the center
        var center = parseInt(game.world.map.length / 2);
        this.createCastle(center, 0);
        //console.log(game.world.map);
    },

    create: function(){

        game.world.map = [];

        //setting up the seed random
        Math.seedrandom(getSeed());

        //setting up scene
        game.add.plugin(Phaser.Plugin.Debug);
        this.drawFloor();
        game.add.plugin(Phaser.Plugin.Inspector);

        game.world.setBounds(0, 0, MAP_LENGTH*TILE_SIZE, 600);

        // display into text
        information("...Kayle...");

        // generating world
        this.generateWorld();

        // adding player and camera control
        //self.player = game.add.sprite((MAP_LENGTH*TILE_SIZE)/2, 400, 'player');
        self.player = game.add.sprite((MAP_LENGTH * TILE_SIZE) / 2, 400, 'player');
        self.player.enableBody = true;
        self.cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(self.player);

        //setting up shortcut keys
        game.input.enabled = true;
        self.seedKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    },

    update: function() {
         self.floor.forEach(function(tile){
             //console.log(self.floor[i].x);
             if(tile.x >= (game.camera.x + game.camera.width + TILE_SIZE)){
                 tile.x = game.camera.x - TILE_SIZE;
             }
             if(tile.x <= game.camera.x - TILE_SIZE){
                 console.log(game.camera.x);
                 console.log(tile.x);
                 tile.x =  game.camera.x + game.camera.width + TILE_SIZE;
             }
         }, this);


        if(self.seedKey.isDown){
            console.log("Your seed is",getSeed());
        }
        if (self.cursors.left.isDown){
            self.player.x -= 4;
        }
        else if (self.cursors.right.isDown){
            self.player.x += 4;
        }
    },

    render: function(){
        game.debug.cameraInfo(game.camera, 32, 32);
    }
};