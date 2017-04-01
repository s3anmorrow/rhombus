var ScreenManager = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;

    // private variables
    var moving = false;
    var stageHeight = Globals.stage.canvas.height;
    var frameCounter = 0;
    var shapes = [];
    var nextBackgroundShape = 1;
    var direction = 0;
    // separate layer to drop background shapes on
    var backgroundLayer = new createjs.Container();

    // color the background of the game with a shape
    var background = new createjs.Shape();
    background.graphics.beginFill("#000022").drawRect(0,0,800,800);
    background.cache(0,0,800,800);
    backgroundLayer.addChild(background);
    stage.addChild(backgroundLayer);

    // construct LoadScreen object and variables for others to be constructed later
    var loadScreen = new LoadScreen();
    this.load = loadScreen;
    loadScreen.showMe();
    var introScreen = null;
    var gameScreen = null;
    var highScoreScreen = null;

    // setup gameover screen
    var gameOverScreen = new createjs.Container();
    this.gameOver = gameOverScreen;
    var gameOverScreenSprite = assetManager.getSprite("ui","gameOverScreen");
    gameOverScreen.addChild(gameOverScreenSprite);
    var prompt = assetManager.getSprite("ui","spacebarContinue");
    prompt.x = 240;
    prompt.y = 420;
    gameOverScreen.addChild(prompt);
    
    // --------------------------------------------------------- private methods
    function dropShape(dropY) {
        // randomly select properties
        var shape = assetManager.getSprite("ui","backgroundShape" + nextBackgroundShape);
        shape.speed = Globals.randomMe(1,3);
        shape.rotation = Globals.randomMe(50,180);        
        shape.x = Globals.randomMe(200,600);
        if (dropY === undefined) {
            if (direction === 0) shape.y = -300;
            else shape.y = 1100;
        } else {
            shape.y = dropY;
        }
        backgroundLayer.addChild(shape);

        // add to array for reference in updateMe
        shapes.push(shape);

        nextBackgroundShape++;
        if (nextBackgroundShape > 4) nextBackgroundShape = 1;
    }

    // --------------------------------------------------------- public methods
    this.startMe = function() {
        // hide loadScreen (never to be shown again)
        loadScreen.hideMe();
        // construct screen objects and grant public access
        introScreen = new IntroScreen();
        this.intro = introScreen;
        highScoreScreen = new HighScoreScreen();
        this.highScore = highScoreScreen;
        gameScreen = new GameScreen();
        this.game = gameScreen;
    };

    this.startBackground = function() {        
        // initialization
        moving = true;
        frameCounter = 0;
        direction = 0;
        shapes = [];
        // drop default startup shapes
        dropShape(-300);
        dropShape(0);
        dropShape(300);
        dropShape(600);
    };

    this.setDirection = function(which) {
        direction = which;
    };

    this.setScreen = function(which) {
        introScreen.hideMe();
        if (which != "gameOverScreen") gameScreen.hideMe();
        highScoreScreen.hideMe();
        stage.removeChild(gameOverScreen);

        // add corresponding screen container and setup
        if (which == "introScreen") introScreen.showMe();
        else if (which == "gameScreen") gameScreen.showMe();
        else if (which == "highScoreScreen") highScoreScreen.showMe(gameScreen.getScore());
        else if (which == "gameOverScreen") {
            prompt.gotoAndStop("spacebarContinue");
            if (Globals.gamepadManager.connected) prompt.gotoAndStop("startButtonContinue");
            stage.addChild(gameOverScreen);
        }
    };

    this.stopBackground = function() {
        moving = false;
        for (var n=0; n<shapes.length; n++){
            backgroundLayer.removeChild(shapes[n]);
            shapes[n] = null;
        }
        shapes = [];
    };

    this.updateMe = function() {
        // move all background shapes
        for (var n=0; n<shapes.length; n++){
            var shape = shapes[n];
            if (direction === 0) {
                shape.y = shape.y + shape.speed;
                // is shape off the bottom of the stage?
                if ((shape.y - 300) > stageHeight) {
                    backgroundLayer.removeChild(shape);
                    // remove shape sprite from array
                    shapes.splice(n, 1);
                }
            } else {
                shape.y = shape.y - shape.speed;
                // is shape off the bottom of the stage?
                if ((shape.y + 300) < 0) {
                    backgroundLayer.removeChild(shape);
                    // remove shape sprite from array
                    shapes.splice(n, 1);
                }
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