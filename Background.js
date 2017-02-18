var Background = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;

    // public properties
    var score = 0;
    var lives = 0;
    var highScore = 0;
    var power = 0;
    var specialAmmo = 0;

    // private variables
    var moving = false;
    var stageHeight = Globals.stage.canvas.height;
    var frameCounter = 0;
    var shapes = [];
    // separate layer to drop background shapes on
    var backgroundLayer = new createjs.Container();
    var scoreLayer = new createjs.Container();

    // color the background of the game with a shape
    background = new createjs.Shape();
    background.graphics.beginFill("#000022").drawRect(0,0,800,800);
    background.cache(0,0,800,800);
    backgroundLayer.addChild(background);
    stage.addChild(backgroundLayer);

    // setup up scoreboard
    var txtScore = new createjs.BitmapText("0",assetManager.getSpriteSheet("assets"));
    txtScore.letterSpacing = 2;
    scoreLayer.addChild(txtScore);

    var txtHighScore = new createjs.BitmapText("0",assetManager.getSpriteSheet("assets"));
    txtHighScore.letterSpacing = 4;
    txtHighScore.scaleX = 0.5;
    txtHighScore.scaleY = 0.5;
    txtHighScore.x = 5;
    txtHighScore.y = 65;
    scoreLayer.addChild(txtHighScore);

    var iconLives = assetManager.getSprite("assets","iconLives");
    iconLives.x = 8;
    iconLives.y = 106;
    scoreLayer.addChild(iconLives);

    var txtLives = new createjs.BitmapText("0",assetManager.getSpriteSheet("assets"));
    txtLives.scaleX = 0.5;
    txtLives.scaleY = 0.5;
    txtLives.x = 55;
    txtLives.y = 98;
    scoreLayer.addChild(txtLives);

    var powerBlocks = [];
    for (var n=0; n<Globals.gameConstants.PLAYER_MAX_POWER; n++) {
        var block = assetManager.getSprite("assets","iconPower");
        block.x = 7 + (13 * n);
        block.y = 138;
        scoreLayer.addChild(block);
        powerBlocks.push(block);
    }

    var txtSpecialAmmo = new createjs.BitmapText("0",assetManager.getSpriteSheet("assets"));
    txtSpecialAmmo.scaleX = 0.5;
    txtSpecialAmmo.scaleY = 0.5;
    txtSpecialAmmo.x = 8;
    txtSpecialAmmo.y = 150;
    scoreLayer.addChild(txtSpecialAmmo);    

    scoreLayer.x = 10;
    scoreLayer.y = 10;
    stage.addChild(scoreLayer);
    
    // --------------------------------------------------------- private methods
    function dropShape(dropY) {
        // randomly select properties
        var shape = assetManager.getSprite("assets","backgroundShape" + Globals.randomMe(1,4));
        shape.speed = Globals.randomMe(1,3);
        shape.rotation = Globals.randomMe(50,180);        
        shape.x = Globals.randomMe(200,600);
        if (dropY === undefined) shape.y = -300;
        else shape.y = dropY;
        backgroundLayer.addChild(shape);

        // add to array for reference in updateMe
        shapes.push(shape);
    }

    function refreshScoreBoard() {
        // update scoreboard
        txtScore.text = String(score);
        txtLives.text = String(lives);
        txtHighScore.text = String(highScore);
        for (var n=1; n<=powerBlocks.length; n++) { 
            if (n <= power) powerBlocks[n-1].alpha = 1;
            else powerBlocks[n-1].alpha = 0.3;
        }
        txtSpecialAmmo.text = String(specialAmmo);
    }


    // --------------------------------------------------------- public methods
    this.startMe = function() {        
        // initialization
        moving = true;
        frameCounter = 0;
        shapes = [];
        score = 0;
        highScore = 126628;
        lives = Globals.gameConstants.PLAYER_START_LIVES;
        power = Globals.gameConstants.PLAYER_START_POWER;
        refreshScoreBoard();

        // drop default startup shapes
        dropShape(-200);
        dropShape(0);
        dropShape(200);
        dropShape(400);
        dropShape(600);
    };

    this.stopMe = function() {
        for (var n=0; n<shapes.length; n++){
            backgroundLayer.removeChild(shapes[n]);
            shapes[n] = null;
        }
        shapes = [];
    };

    this.adjustLives = function(amount){
        if (amount === undefined) amount = -1;
        lives+=amount;
        refreshScoreBoard();
    };

    this.adjustPoints = function(amount) {
        score+=amount;
        refreshScoreBoard();
    };

    this.adjustPower = function(amount) {
        if (amount === undefined) amount = -1;
        power+=amount;
        refreshScoreBoard();
    };

    this.adjustSpecialAmmo = function(amount) {
        if (amount === undefined) amount = -1;
        specialAmmo+=amount;
        refreshScoreBoard();
    };

    this.updateMe = function() {
        // move all background shapes
        for (var n=0; n<shapes.length; n++){
            var shape = shapes[n];
            shape.y = shape.y + shape.speed;
            // is shape off the bottom of the stage?
            if ((shape.y - 300) > stageHeight) {
                backgroundLayer.removeChild(shape);
                // remove shape sprite from array
                shapes.splice(n, 1);
            }
        }

        frameCounter++;
        // drop background shape every 100 ticks
        if ((frameCounter % 150) === 0) {
            dropShape();
            frameCounter = 0;
        }
    };

};