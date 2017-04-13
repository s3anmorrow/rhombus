var HighScoreScreen = function() {
    // custom events
    var completeEvent = new createjs.Event("gameEvent", true);
    completeEvent.id = "highScoreComplete";

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
    var txtCurrentScore = new createjs.BitmapText("",assetManager.getSpriteSheet("charset80"));
    txtCurrentScore.letterSpacing = 4;
    txtCurrentScore.y = 200;
    screen.addChild(txtCurrentScore);
    var txtInitials = new createjs.BitmapText("",assetManager.getSpriteSheet("charset80"));
    txtInitials.letterSpacing = 8;
    txtInitials.y = 585;
    screen.addChild(txtInitials);

    // setup recording score screen
    var recordingScreen = assetManager.getSprite("ui","recordingScore");

    // setup checking score screen
    var checkingScreen = assetManager.getSprite("ui","checkingScore");

    // 2D array of characters for entering initials for highscore
    var charList = [["A","B","C","D","E","F","G","H","I","J","K"],
                    ["L","M","N","O","P","Q","R","S","T","U","V"],
                    ["W","X","Y","Z","","","","","","-1","1"]];
    var rowIndex = 0;
    var charIndex = 0;

    // the high score
    var score = 0;

    // --------------------------------------------------------- private methods
    function centerMe(displayObj) {
        displayObj.x = (stage.canvas.width/2) - (displayObj.getBounds().width/2);
    }

    function reverse(str) {
        // Step 1. Use the split() method to return a new array
        var splitString = str.split(""); // var splitString = "hello".split("");
        // Step 2. Use the reverse() method to reverse the new created array
        var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
        // Step 3. Use the join() method to join all elements of the array into a string
        var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
        //Step 4. Return the reversed string
        return joinArray; // "olleh"
    }

    // ------------------------------------------------- public methods
    this.showMe = function(myScore) {
        score = myScore;
        // testing
        //score = 100000;

        rowIndex = 0;
        charIndex = 0;
        selector.x = 102;
        selector.y = 344;
        txtInitials.text = "";
        txtCurrentScore.text = Globals.commaUpScore(String(score));
        centerMe(txtCurrentScore);

        // check if score qualifies for high score
        stage.addChild(checkingScreen);
        // send score results to the server sided script
        var source = Globals.gameConstants.HIGHSCORE_SCRIPT3 + "?v=" + btoa(reverse(String(score)));
        Globals.sendMe(source, onCheckResponse);
    };

    this.hideMe = function() {
        stage.removeChild(recordingScreen);
        stage.removeChild(checkingScreen);
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
        createjs.Sound.play("interface1");
    };

    this.selectInitial = function(){
        // get selected initial character
        var char = charList[rowIndex][charIndex];
        var initials = txtInitials.text;

        // must have entered something
        if ((char == "1") && (initials.length < 3)) {
            createjs.Sound.play("interface2");
            return;
        }

        if (char === "1") {
            // display recording screen
            stage.addChild(recordingScreen);
            stage.removeChild(screen);

            var hash = CryptoJS.MD5(initials + score + "2f6d0f62dbedda976330f88add53a7e7").toString();
            // assemble the URL to send data
            var source = Globals.gameConstants.HIGHSCORE_SCRIPT1 + "?z=" + btoa(reverse(initials)) + "&a=" + btoa(reverse(String(score))) + "&s=" + hash;
            //console.log("initials: " + btoa(reverse(initials)));
            //console.log("score: " + btoa(reverse(String(score))));
            //console.log("HASH: " + hash);

            // send score results to the server sided script
            //Globals.sendMe(source, onAddResponse);

            createjs.Sound.play("powerupPickup");
        } else if ((char === "-1") && (initials.length > 0)) {
            txtInitials.text = initials.substring(0, initials.length - 1);
            // center initials on stage
            if (txtInitials.text !== "") centerMe(txtInitials);
            createjs.Sound.play("interface2");
        } else if ((char !== "-1") && (initials.length < 3)) {
            txtInitials.text += char;
            centerMe(txtInitials);
            createjs.Sound.play("interface3");
        }
    };

    // ----------------------------------------------------------- event handlers
    function onAddResponse(xhr) {  
        // score recorded
        completeEvent.target = null;
        stage.dispatchEvent(completeEvent);
    }

    function onCheckResponse(xhr) {  
        //console.log(xhr.responseText);
        if (xhr.responseText === "t") {
            stage.removeChild(checkingScreen);
            stage.addChild(screen);
            createjs.Sound.play("powerupAppear");
        } else {
            // back to intro screen
            completeEvent.target = null;
            stage.dispatchEvent(completeEvent);
        }
    }

};