var GameScreen = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;

    // public properties
    var score = 0;
    var lives = 0;
    var highScore = 0;
    var power = 0;
    var specialAmmo = 0;

    // setup game screen
    var screen = new createjs.Container();
    // add scoreboard sprites and bitmaptext
    var txtScore = new createjs.BitmapText("0",assetManager.getSpriteSheet("charset80"));
    txtScore.letterSpacing = 4;
    txtScore.x = 8;
    screen.addChild(txtScore);

    var txtHighScore = new createjs.BitmapText("0",assetManager.getSpriteSheet("charset30"));
    txtHighScore.letterSpacing = 2;
    txtHighScore.x = 15;
    txtHighScore.y = 90;
    screen.addChild(txtHighScore);

    var iconLives = assetManager.getSprite("ui","iconLives");
    iconLives.x = 20;
    iconLives.y = 135;
    screen.addChild(iconLives);

    var txtLives = new createjs.BitmapText("0",assetManager.getSpriteSheet("charset30"));
    txtLives.x = 70;
    txtLives.y = 125;
    screen.addChild(txtLives);

    var powerBlocks = [];
    for (var n=0; n<Globals.gameConstants.PLAYER_MAX_POWER; n++) {
        var block = assetManager.getSprite("ui","iconPower");
        block.x = 18 + (18 * n);
        block.y = 170;
        screen.addChild(block);
        powerBlocks.push(block);
    }

    var txtSpecialAmmo = new createjs.BitmapText("0",assetManager.getSpriteSheet("charset30"));
    txtSpecialAmmo.scaleX = 0.5;
    txtSpecialAmmo.scaleY = 0.5;
    txtSpecialAmmo.x = 18;
    txtSpecialAmmo.y = 150;

    // --------------------------------------------------------- private methods
    function refreshScoreBoard() {
        // update scoreboard
        txtScore.text = Globals.commaUpScore(score);
        txtLives.text = String(lives);
        txtHighScore.text = Globals.commaUpScore(highScore);
        for (var n=1; n<=powerBlocks.length; n++) { 
            if (n <= power) powerBlocks[n-1].alpha = 1;
            else powerBlocks[n-1].alpha = 0.3;
        }
        txtSpecialAmmo.text = String(specialAmmo);
    }

    // ------------------------------------------------- get/set methods
    this.getScore =  function() {
        return score;
    };

    // ------------------------------------------------- public methods
    this.showMe = function() {
        score = 0;
        highScore = 126628;
        lives = Globals.gameConstants.PLAYER_START_LIVES;
        power = Globals.gameConstants.PLAYER_START_POWER;
        refreshScoreBoard();

        stage.addChild(screen);
    };

    this.hideMe = function() {
        stage.removeChild(screen);
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

};