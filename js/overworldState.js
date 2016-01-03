var overworldState = {
    self   : this,
    player : null,
    cursors: null,
    grass  : null,
    seedKey: null,
    floor  : null,
    nbFloorTiles: null,

    drawFloor: function(startPos){
        console.log("startPos",startPos);
        startPos = startPos || 0;
        self.nbFloorTiles = parseInt(game.width / TILE_SIZE)+1;
        self.floor = game.add.group();
        var i;
        for(i=0; i < self.nbFloorTiles; i++) {
            self.floor.create( startPos + (i * TILE_SIZE), GROUND_Y, 'grass');
        }
    },
    createChunk: function(){
        var type;
        for(var i=0; i < NB_RENDER_TILES; i++){
            type = game.world.map[i];
            game.world.items.push(game.add.sprite(game.world.x + (i*64), GROUND_Y, ITEMS_NAME[type]));
            game.world.items[i].type = type;
            game.world.items[i].created_at = Date.now();
            game.world.items[i].maxHealth = 100;
            game.world.items[i].health = 100;
        }
    },
    drawChunks: function(){

        var startTile = parseInt(game.world.x / TILE_SIZE) - parseInt((NB_RENDER_TILES / NB_RENDER_SCREEN));
        //console.log("tile render start :", startTile, "world pos x :", game.world.x);

        var type;
        for(var i=0; i < NB_RENDER_TILES; i++){
            type = game.world.map[i];
        }
    },

    createCastle: function(x, era){
        era = era || "WOOD";
        if(era == "WOOD"){
            game.world.map[x-2] =  WOOD_CASTLE_LEFT_ID;
            game.world.map[x-1] =  WOOD_CASTLE_MID_LEFT_ID;
            game.world.map[x]   =  WOOD_CASTLE_MID_ID;
            game.world.map[x+1] =  WOOD_CASTLE_MID_RIGHT_ID;
            game.world.map[x+2] =  WOOD_CASTLE_RIGHT_ID;
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
        game.world.items = [];

        //setting up the seed random
        Math.seedrandom(getSeed());

        game.world.setBounds(0, 0, MAP_LENGTH*TILE_SIZE, 600);

        // display into text
        information("...Kayle...");

        // generating world
        this.generateWorld();
        this.createChunk();
        // adding player and camera control
        self.player = game.add.sprite(0, 0, 'player');
        //self.player.x =(MAP_LENGTH * TILE_SIZE) / 2;
        self.player.y = 400;

        self.player.enableBody = true;
        self.player.collideWorldBounds = true;

        //setting up scene
        game.add.plugin(Phaser.Plugin.Debug);
        this.drawFloor((MAP_LENGTH * TILE_SIZE) / 2);
        game.add.plugin(Phaser.Plugin.Inspector);

        //setting up inputs

        self.cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(self.player);


        //setting up shortcut keys
        game.input.enabled = true;
        self.seedKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

    },

    update: function() {
        this.drawChunks();
        var len = self.floor.children.length;

        for (var i = 0; i < len; i++) {
           // if(!self.floor.children[i].inCamera){
               // console.log("not in camera");
                if(self.floor.children[i].x > game.camera.x + game.camera.width){
                     self.floor.children[i].x = game.camera.x - TILE_SIZE;
                }
                if(self.floor.children[i].x < game.camera.x){
                     self.floor.children[i].x =  game.camera.x + game.camera.width + TILE_SIZE;
                }
           // }
         }

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