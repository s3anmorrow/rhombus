var IntroScreen = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var gamepad = Globals.gamepad;
    var source = Globals.gameConstants.HIGHSCORE_SCRIPT2;

    var screen = new createjs.Container();
    var screenSprite = assetManager.getSprite("ui","introScreen");
    screen.addChild(screenSprite);
    var prompt = assetManager.getSprite("ui","spacebar");
    prompt.x = 245;
    prompt.y = 600;
    screen.addChild(prompt);

    var loadingScoresPanel = new createjs.Container();
    loadingScoresPanel.x = 255;
    loadingScoresPanel.y = 390;
    var loadingScoresPrompt = assetManager.getSprite("ui","loadingScores");
    loadingScoresPrompt.x = 70;
    loadingScoresPrompt.y = 28;
    loadingScoresPanel.addChild(loadingScoresPrompt);
    var loadingScoresSprite = assetManager.getSprite("assets","square");
    loadingScoresSprite.x = 40;
    loadingScoresSprite.y = 40;
    loadingScoresPanel.addChild(loadingScoresSprite);
    createjs.Tween.get(loadingScoresSprite,{useTicks:true, loop:true})
                    .to({rotation:359}, 90);

    var highScores = new createjs.Container();
    highScores.x = 248;
    highScores.y = 318;
    var icons = assetManager.getSprite("ui","icons");
    highScores.addChild(icons);
    
    var dropY = 0;
    var txtScores = [];
    var txtRank = [];
    var txtInitials = [];
    for (var n=0; n<5; n++) {
        txtRank[n] = new createjs.BitmapText("", assetManager.getSpriteSheet("charset30"));
        txtRank[n].letterSpacing = 2;
        txtRank[n].scaleX = 0.75;
        txtRank[n].scaleY = 0.75;
        txtRank[n].x = 60;
        txtRank[n].y = dropY;
        highScores.addChild(txtRank[n]);

        txtInitials[n] = new createjs.BitmapText("", assetManager.getSpriteSheet("charset30"));
        txtInitials[n].letterSpacing = 2;
        txtInitials[n].scaleX = 0.75;
        txtInitials[n].scaleY = 0.75;
        txtInitials[n].x = 110;
        txtInitials[n].y = dropY;
        highScores.addChild(txtInitials[n]);

        txtScores[n] = new createjs.BitmapText("", assetManager.getSpriteSheet("charset30"));
        txtScores[n].letterSpacing = 2;
        txtScores[n].scaleX = 0.75;
        txtScores[n].scaleY = 0.75;
        txtScores[n].x = 200;
        txtScores[n].y = dropY;
        highScores.addChild(txtScores[n]);

        dropY+=52;
    }

    // ------------------------------------------------- public methods
    this.showMe = function() {
        // get score data from server
        screen.removeChild(highScores);
        // display loading scores message
        screen.addChild(loadingScoresPanel);

        // send out AJAX request
        Globals.sendMe(source, onResponse);

        prompt.gotoAndStop("spacebar");
        if (Globals.gamepadManager.connected) prompt.gotoAndStop("startButton");
        stage.addChild(screen);
    };

    this.hideMe = function() {
        stage.removeChild(screen);
    };

    // ------------------------------------------------ event handlers
    function onResponse(xhr) {
        console.log("test: " + xhr.responseText);

        // update scoreboard
        var data = xhr.responseText.split(",");
        var i=0;
        for (var n=0; n<10; n+=2) {
            txtRank[i].text = String(i + 1);
            txtInitials[i].text =  data[n];
            txtScores[i].text = Globals.commaUpScore(data[n+1]);
            i++;
        }
        screen.removeChild(loadingScoresPanel);
        screen.addChild(highScores);
    }

};