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
    var gameoverScreen = new createjs.Container();
    var gameoverScreenSprite = assetManager.getSprite("ui","gameoverScreen");
    gameoverScreen.addChild(gameoverScreenSprite);
    
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
        shapes = [];
        // drop default startup shapes
        dropShape(-300);
        dropShape(0);
        dropShape(300);
        dropShape(600);
    };

    this.setScreen = function(which) {
        loadScreen.hideMe();
        introScreen.hideMe();
        gameScreen.hideMe();
        highScoreScreen.hideMe();
        stage.removeChild(gameoverScreen);

        // add corresponding screen container and setup
        if (which == "loadScreen") loadScreen.showMe();
        else if (which == "introScreen") introScreen.showMe();
        else if (which == "gameScreen") gameScreen.showMe();
        else if (which == "highScoreScreen") highScoreScreen.showMe(gameScreen.getScore());
        else if (which == "gameoverScreen") stage.addChild(gameoverScreen);
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