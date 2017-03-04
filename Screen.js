var Screen = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var gameStates = Globals.gameStates;

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
    var nextBackgroundShape = 1;
    // separate layer to drop background shapes on
    var backgroundLayer = new createjs.Container();

    // color the background of the game with a shape
    var background = new createjs.Shape();
    background.graphics.beginFill("#000022").drawRect(0,0,800,800);
    background.cache(0,0,800,800);
    backgroundLayer.addChild(background);
    stage.addChild(backgroundLayer);

    // setup loading screen
    var loadingScreen = new createjs.Container();
    var loadingScreenSprite = assetManager.getSprite("ui","loadScreen");
    loadingScreen.addChild(loadingScreenSprite);
    // add progress bar to loading screen
    var progressBarBack = new createjs.Shape();
    progressBarBack.alpha = 0.3;
    progressBarBack.graphics.beginFill("#FFFFFF").drawRect(315,425,178,10);
    loadingScreen.addChild(progressBarBack);
    progressBar = new createjs.Shape();
    progressBar.graphics.beginFill("#FFFFFF").drawRect(315,425,0,10);
    loadingScreen.addChild(progressBar);

    // setup intro screen
    var introScreen = new createjs.Container();
    var introScreenSprite = assetManager.getSprite("ui","introScreen");
    introScreen.addChild(introScreenSprite);

    // setup game screen
    var gameScreen = new createjs.Container();
    // add scoreboard sprites and bitmaptext
    var txtScore = new createjs.BitmapText("!",assetManager.getSpriteSheet("ui"));
    txtScore.letterSpacing = 4;
    txtScore.x = 10;
    gameScreen.addChild(txtScore);

    var txtHighScore = new createjs.BitmapText("0",assetManager.getSpriteSheet("ui"));
    txtHighScore.letterSpacing = 2;
    txtHighScore.x = 15;
    txtHighScore.y = 90;
    gameScreen.addChild(txtHighScore);

    var iconLives = assetManager.getSprite("ui","iconLives");
    iconLives.x = 20;
    iconLives.y = 135;
    gameScreen.addChild(iconLives);

    var txtLives = new createjs.BitmapText("0",assetManager.getSpriteSheet("ui"));
    txtLives.x = 70;
    txtLives.y = 125;
    gameScreen.addChild(txtLives);

    var powerBlocks = [];
    for (var n=0; n<Globals.gameConstants.PLAYER_MAX_POWER; n++) {
        var block = assetManager.getSprite("ui","iconPower");
        block.x = 18 + (18 * n);
        block.y = 170;
        gameScreen.addChild(block);
        powerBlocks.push(block);
    }

    var txtSpecialAmmo = new createjs.BitmapText("0",assetManager.getSpriteSheet("assets"));
    txtSpecialAmmo.scaleX = 0.5;
    txtSpecialAmmo.scaleY = 0.5;
    txtSpecialAmmo.x = 18;
    txtSpecialAmmo.y = 150;


    //gameScreen.x = 10;
    //gameScreen.y = 0;
    
    // --------------------------------------------------------- private methods
    function dropShape(dropY) {
        // randomly select properties
        var shape = assetManager.getSprite("ui","backgroundShape" + nextBackgroundShape);
        shape.speed = Globals.randomMe(1,3);
        shape.rotation = Globals.randomMe(50,180);        
        shape.x = Globals.randomMe(200,600);
        if (dropY === undefined) shape.y = -300;
        else shape.y = dropY;
        backgroundLayer.addChild(shape);

        // add to array for reference in updateMe
        shapes.push(shape);

        nextBackgroundShape++;
        if (nextBackgroundShape > 4) nextBackgroundShape = 1;
    }

    function refreshScoreBoard() {
        // update scoreboard
        var encodedScore = String(score);
        encodedScore = encodedScore.replace(/[0-9]/g, function(match, offset, string) {
            switch (match) {
                case "0": return ")";
                case "1": return "!";
                case "2": return "@";
                case "3": return "#";
                case "4": return "$";
                case "5": return "%";
                case "6": return "^";
                case "7": return "&";
                case "8": return "*";
                case "9": return "(";
            }
        });
        txtScore.text = encodedScore;

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
        dropShape(-300);
        dropShape(0);
        dropShape(300);
        dropShape(600);
    };

    this.setScreen = function(which) {
        stage.removeChild(loadingScreen);
        stage.removeChild(introScreen);
        stage.removeChild(gameScreen);

        if (which == "loadScreen") stage.addChild(loadingScreen);
        else if (which == "introScreen") stage.addChild(introScreen);
        else if (which == "gameScreen") stage.addChild(gameScreen);

    };

    this.stopMe = function() {
        for (var n=0; n<shapes.length; n++){
            backgroundLayer.removeChild(shapes[n]);
            shapes[n] = null;
        }
        shapes = [];
    };

    this.updateProgress = function(){
        // update progress bar
		progressBar.graphics.clear();
		progressBar.graphics.beginFill("#FFFFFF").drawRect(315,425,(178 * assetManager.getProgress()),10);
		stage.update();
    };

    this.setLives = function(amount){
        lives=amount;
        refreshScoreBoard();
    };

    this.adjustPoints = function(amount) {
        score+=amount;
        refreshScoreBoard();
    };

    this.setPower = function(amount) {
        power=amount;
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