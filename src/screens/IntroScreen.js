var IntroScreen = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var gamepad = Globals.gamepad;

    var screen = new createjs.Container();
    var screenSprite = assetManager.getSprite("ui","introScreen");
    screen.addChild(screenSprite);
    var prompt = assetManager.getSprite("ui","spacebar");
    prompt.x = 190;
    prompt.y = 600;
    screen.addChild(prompt);

    // !!!!!!!!!!!!!!!!!! TESTING DATA
    var testing = [22222922,2999,8999,4999,1348];
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    var highScores = new createjs.Container();
    var icons = assetManager.getSprite("ui","icons");
    highScores.addChild(icons);

    var txtScores = [];
    var dropY = 0;
    var largest = 0;
    for (var n=0; n<5; n++) {
        txtScores[n] = new createjs.BitmapText("SPM " + Globals.commaUpScore(testing[n]),assetManager.getSpriteSheet("charset30"));
        txtScores[n].letterSpacing = 2;
        txtScores[n].scaleX = 0.75;
        txtScores[n].scaleY = 0.75;
        txtScores[n].x = 50;
        txtScores[n].y = dropY;
        highScores.addChild(txtScores[n]);

        dropY+=52;
    }
    highScores.x = 190;
    highScores.y = 318;
    screen.addChild(highScores);

    // ------------------------------------------------- public methods
    this.showMe = function() {
        prompt.gotoAndStop("spacebar");
        if (Globals.gamepadManager.connected) prompt.gotoAndStop("startButton");
        stage.addChild(screen);
    };

    this.hideMe = function() {
        stage.removeChild(screen);
    };

};