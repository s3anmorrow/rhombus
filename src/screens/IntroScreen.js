var IntroScreen = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var gamepad = Globals.gamepad;

    var screen = new createjs.Container();
    var introScreenSprite = assetManager.getSprite("ui","introScreen");
    screen.addChild(introScreenSprite);
    var prompt = assetManager.getSprite("ui","spacebar");
    prompt.x = 200;
    prompt.y = 600;
    screen.addChild(prompt);
    
    var txtIntroScores = [];
    var txtIntroInitials = [];
    txtIntroScores[0] = new createjs.BitmapText("1234",assetManager.getSpriteSheet("charset30"));
    txtIntroScores[0].letterSpacing = 2;
    screen.addChild(txtIntroScores[0]);
    txtIntroInitials[0] = new createjs.BitmapText("SPM",assetManager.getSpriteSheet("charset30"));
    txtIntroInitials[0].letterSpacing = 2;
    screen.addChild(txtIntroInitials[0]);
    

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