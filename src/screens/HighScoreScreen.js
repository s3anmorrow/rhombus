var HighScoreScreen = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;

    // setup highscore screen
    var screen = new createjs.Container();
    var screenSprite = assetManager.getSprite("ui","highscoreScreen");
    screen.addChild(screenSprite);
    var selector = assetManager.getSprite("ui","selector");
    selector.x = 102;
    selector.y = 344;
    screen.addChild(selector);
    var txtCurrentScore = new createjs.BitmapText("",assetManager.getSpriteSheet("charset30"));
    txtCurrentScore.letterSpacing = 4;
    txtCurrentScore.y = 220;
    screen.addChild(txtCurrentScore);
    var txtInitials = new createjs.BitmapText("",assetManager.getSpriteSheet("charset80"));
    txtInitials.letterSpacing = 8;
    txtInitials.y = 585;
    screen.addChild(txtInitials);
    // 2D array of characters for entering initials for highscore
    var charList = [["A","B","C","D","E","F","G","H","I","J","K"],
                    ["L","M","N","O","P","Q","R","S","T","U","V"],
                    ["W","X","Y","Z","","","","","","-1","1"]];
    var rowIndex = 0;
    var charIndex = 0;

    // --------------------------------------------------------- private methods
    function centerMe(displayObj) {
        displayObj.x = (stage.canvas.width/2) - (displayObj.getBounds().width/2);
    }

    // ------------------------------------------------- public methods
    this.showMe = function(score) {
        rowIndex = 0;
        charIndex = 0;
        txtCurrentScore.text = String(score);
        centerMe(txtCurrentScore);
        stage.addChild(screen);
    };

    this.hideMe = function() {
        stage.removeChild(screen);
    };

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

};