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
    var gamePad = false;

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
    var loadScreen = new createjs.Container();
    var loadScreenSprite = assetManager.getSprite("ui","loadScreen");
    loadScreen.addChild(loadScreenSprite);
    // add progress bar to loading screen
    var progressBarBack = new createjs.Shape();
    progressBarBack.alpha = 0.3;
    progressBarBack.graphics.beginFill("#FFFFFF").drawRect(315,425,178,10);
    loadScreen.addChild(progressBarBack);
    progressBar = new createjs.Shape();
    progressBar.graphics.beginFill("#FFFFFF").drawRect(315,425,0,10);
    loadScreen.addChild(progressBar);

    // setup intro screen
    var introScreen = new createjs.Container();
    var introScreenSprite = assetManager.getSprite("ui","introScreen");
    introScreen.addChild(introScreenSprite);
    var prompt = assetManager.getSprite("ui","spacebar");
    prompt.x = 200;
    prompt.y = 600;
    introScreen.addChild(prompt);

    // setup gameover screen
    var gameoverScreen = new createjs.Container();
    var gameoverScreenSprite = assetManager.getSprite("ui","gameoverScreen");
    gameoverScreen.addChild(gameoverScreenSprite);

    // setup highscore screen
    var highscoreScreen = new createjs.Container();
    var highscoreScreenSprite = assetManager.getSprite("ui","highscoreScreen");
    highscoreScreen.addChild(highscoreScreenSprite);
    var selector = assetManager.getSprite("ui","selector");
    selector.x = 102;
    selector.y = 344;
    highscoreScreen.addChild(selector);
    var txtCurrentScore = new createjs.BitmapText("",assetManager.getSpriteSheet("ui"));
    txtCurrentScore.letterSpacing = 4;
    txtCurrentScore.y = 220;
    highscoreScreen.addChild(txtCurrentScore);
    var txtInitials = new createjs.BitmapText("",assetManager.getSpriteSheet("ui"));
    txtInitials.letterSpacing = 8;
    txtInitials.y = 585;
    highscoreScreen.addChild(txtInitials);
    // 2D array of characters for entering initials for highscore
    var charList = [["A","B","C","D","E","F","G","H","I","J","K"],
                    ["L","M","N","O","P","Q","R","S","T","U","V"],
                    ["W","X","Y","Z","","","","","","-1","1"]];
    var rowIndex = 0;
    var charIndex = 0;

    // setup game screen
    var gameScreen = new createjs.Container();
    // add scoreboard sprites and bitmaptext
    var txtScore = new createjs.BitmapText("!",assetManager.getSpriteSheet("ui"));
    txtScore.letterSpacing = 4;
    txtScore.x = 8;
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

    function centerMe(displayObj) {
        displayObj.x = (stage.canvas.width/2) - (displayObj.getBounds().width/2);
    }

    // --------------------------------------------------------- public methods
    this.startMe = function(gamePadPresent) {        
        // initialization
        moving = true;
        frameCounter = 0;
        shapes = [];
        score = 0;
        highScore = 126628;
        lives = Globals.gameConstants.PLAYER_START_LIVES;
        power = Globals.gameConstants.PLAYER_START_POWER;
        gamePad = gamePadPresent;
        refreshScoreBoard();

        // drop default startup shapes
        dropShape(-300);
        dropShape(0);
        dropShape(300);
        dropShape(600);
    };

    this.setScreen = function(which) {
        stage.removeChild(loadScreen);
        stage.removeChild(introScreen);
        stage.removeChild(gameScreen);
        stage.removeChild(gameoverScreen);
        stage.removeChild(highscoreScreen);

        // add corresponding screen container and setup
        if (which == "loadScreen") stage.addChild(loadScreen);
        else if (which == "introScreen") {
            prompt.gotoAndStop("spacebar");
            if (gamePad) prompt.gotoAndStop("startButton");
            stage.addChild(introScreen);
        } else if (which == "gameScreen") stage.addChild(gameScreen);
        else if (which == "gameoverScreen") stage.addChild(gameoverScreen);
        else if (which == "highscoreScreen") {
            rowIndex = 0;
            charIndex = 0;
            txtCurrentScore.text = String(score);
            centerMe(txtCurrentScore);
            stage.addChild(highscoreScreen);
        }
    };

    this.stopMe = function() {
        for (var n=0; n<shapes.length; n++){
            backgroundLayer.removeChild(shapes[n]);
            shapes[n] = null;
        }
        shapes = [];
    };

    // loading methods
    this.updateProgress = function(){
        // update progress bar
		progressBar.graphics.clear();
		progressBar.graphics.beginFill("#FFFFFF").drawRect(315,425,(178 * assetManager.getProgress()),10);
		stage.update();
    };

    // highscore methods
    this.moveSelector = function(which) {
        switch(which) {
            case "right":
                selector.x+=60;
                charIndex++;
                if (charIndex > 10) {
                    selector.x = 102;
                    charIndex = 0;
                }
                if (charList[rowIndex][charIndex] === "") {
                    selector.x+=300;
                    charIndex+=5;
                }
                break;
            case "left":
                selector.x-=60;
                charIndex--;
                if (charIndex < 0) {
                    selector.x = 702;
                    charIndex = 10;
                }
                if (charList[rowIndex][charIndex] === "") {
                    selector.x-=300;
                    charIndex-=5;
                }
                break;
            case "up":
                selector.y-=70;
                rowIndex--;
                // off top - move back to bottom
                if (rowIndex < 0) {
                    selector.y = 484;
                    rowIndex = 2;
                }
                if (charList[rowIndex][charIndex] === "") {
                    selector.y-=70;
                    rowIndex = 1;
                }
                break;
            case "down":
                selector.y+=70;
                rowIndex++;
                // off bottom - scroll back to top
                if ((rowIndex > 2) || (charList[rowIndex][charIndex] === "")) {
                    selector.y = 344;
                    rowIndex = 0;
                }
                break;
        }
    };

    this.selectInitial = function(){
        // get selected initial character
        var char = charList[rowIndex][charIndex];
        var initials = txtInitials.text;

        if (char == "1") {
            console.log("!!! submit initials !!!");

        } else if ((char == "-1") && (initials.length > 0)) {
            txtInitials.text = initials.substring(0, initials.length - 1);
            // center initials on stage
            if (txtInitials.text != "") centerMe(txtInitials);
        } else if (initials.length < 3) {
            txtInitials.text += char;
            centerMe(txtInitials);
        }
    };

    // game methods
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