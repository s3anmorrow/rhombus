var GameScreen = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;

    // public properties
    var score = 0;
    var lives = 0;
    var highScore = 0;
    var power = 0;
    var ammo = 0;
    var weaponType = "";

    // setup game screen
    var screen = new createjs.Container();
    // add scoreboard sprites and bitmaptext
    var txtScore = new createjs.BitmapText("0",assetManager.getSpriteSheet("charset80"));
    txtScore.letterSpacing = 4;
    txtScore.x = 7;
    screen.addChild(txtScore);

    var txtHighScore = new createjs.BitmapText("0",assetManager.getSpriteSheet("charset30"));
    txtHighScore.letterSpacing = 2;
    txtHighScore.x = 15;
    txtHighScore.y = 94;
    screen.addChild(txtHighScore);

    var iconLives = assetManager.getSprite("ui","iconLives");
    iconLives.x = 20;
    iconLives.y = 139;
    screen.addChild(iconLives);

    var txtLives = new createjs.BitmapText("0",assetManager.getSpriteSheet("charset30"));
    txtLives.x = 70;
    txtLives.y = 131;
    screen.addChild(txtLives);

    var txtLevel = new createjs.BitmapText("A",assetManager.getSpriteSheet("charset30"));
    txtLevel.x = 15;
    txtLevel.y = 245;
    txtLevel.alpha = 0;
    screen.addChild(txtLevel);    

    var powerBlocks = [];
    for (var n=0; n<Globals.gameConstants.PLAYER_MAX_POWER; n++) {
        var block = assetManager.getSprite("ui","iconPower");
        block.x = 18 + (18 * n);
        block.y = 174;
        screen.addChild(block);
        powerBlocks.push(block);
    }

    var txtAmmo = new createjs.BitmapText("0",assetManager.getSpriteSheet("charset30"));
    txtAmmo.letterSpacing = 2;
    txtAmmo.x = 50;
    txtAmmo.y = 190;
    screen.addChild(txtAmmo);

    var weaponIcon = assetManager.getSprite("assets","iconSingle");
    weaponIcon.x = 18;
    weaponIcon.y = 196;
    screen.addChild(weaponIcon);

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

        // update weapon icon
        weaponIcon.gotoAndStop("iconWeapon_" + weaponType);
        // is there infinite ammo?
        if (ammo === -1) txtAmmo.text = "@";
        else txtAmmo.text = String(ammo);
    }

    // ------------------------------------------------- get/set methods
    this.getScore =  function() {
        return score;
    };

    this.setLevelName = function(levelName) {
        // update bitmapttext
        txtLevel.text = levelName;
        // tween fading in
        createjs.Tween.get(txtLevel, {useTicks:true}).to({alpha:1}, 20)
            .call(function(){
                createjs.Tween.get(txtLevel, {useTicks:true}).to({x:txtLevel.x}, 60)
                    .call(function(){
                        createjs.Tween.get(txtLevel, {useTicks:true}).to({alpha:0}, 20);
                    });
            });
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
        if (score < 0) score = 0;
        refreshScoreBoard();
    };

    this.setPower = function(amount) {
        power = amount;
        refreshScoreBoard();
    };

    this.setAmmo = function(amount, type) {
        ammo = amount;
        weaponType = type;
        refreshScoreBoard();
    };

};