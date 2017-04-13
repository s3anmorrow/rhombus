var WaveFactory = function(){

    // custom events
    var levelEvent = new createjs.Event("gameEvent", true);
    levelEvent.id = "levelChange";
    levelEvent.level = 0;
    levelEvent.levelTitle = "";
    var godlikeEvent = new createjs.Event("gameEvent", true);
    godlikeEvent.id = "godLikeMode";

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var frameRate = Globals.gameConstants.FRAME_RATE;
    var halfFrameRate = Globals.gameConstants.FRAME_RATE/2;

    // private property variables
    var level = 0;
    var wave = 0;
    var enemyReleased = 0;
    var enemyTotal = 0;
    var levelTitle = "";
    var godlike = false;
    // current level metadata
    var activeLevel = null;
    // the current active waves on the stage
    var activeWaves = [];
    // keep track of frames passed for this level
    var frameCounter = 0;
    // keep track of seconds passed for this level
    var seconds = 0;

    // ----------------------------------------------------------- get/set methods
    this.getLevel = function() {
        return level;
    };

    // ------------------------------------------------------------- private methods
    function search(myArray, prop, nameKey){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i][prop] === nameKey) {
                return myArray[i];
            }
        }
        return null;
    }

    function addWave() {
        // go through all pending waves of current level to see if time to release
        for (var n=0; n<activeLevel.length; n++) {
            if (activeLevel[n].time === seconds) {
                //console.log("Adding wave at seconds: " + seconds);

                // release new wave
                // initializing next wave object before starting wave
                activeLevel[n].wave.frameCount = activeLevel[n].wave.spaced;
                activeLevel[n].wave.dropped = 0;
                activeWaves.push(activeLevel[n]);
            }
        }
    }    

    // ------------------------------------------------------------- public methods
    this.startMe = function() {
        level = 0;
        godlike = false;
        this.levelMe();
    };

    this.levelMe = function() {
        // initialization
        level++;
        frameCounter = 0;
        seconds = 0;
        wave = 0;

        // LEVEL TESTING
        //level = 11;
        //seconds = 29;

        var levelIndex = level - 1;
        if (level > 20) {
            // godlike mode!
            levelIndex = Globals.randomMe(0,levelManifest.length - 1);
            godlike = true;
        }
        if (level === 21) {
            // announce we are in godlike mode for player to adjust
            godlikeEvent.target = null;
            stage.dispatchEvent(godlikeEvent);
        }        

        activeLevel = levelManifest[levelIndex];        
        if (activeLevel[0].levelTitle === "undefined") levelTitle = "Untitled";
        else levelTitle = activeLevel[0].levelTitle;
        enemyReleased = 0;
        enemyTotal = 0;
        for (var n=0; n<activeLevel.length; n++) {
            enemyTotal += activeLevel[n].wave.count;
        }
        activeWaves = [];

        // announce level change
        levelEvent.target = null;
        levelEvent.level = level;
        levelEvent.levelTitle = levelTitle;
        stage.dispatchEvent(levelEvent);

        createjs.Sound.play("level");

        console.log("level title: " + levelTitle);
        console.log("level up: " + level);
    };

    this.updateMe = function() {
        // loop through all active waves
        for (var n=0; n<activeWaves.length; n++) {
            var activeWave = activeWaves[n];
            if (activeWave !== null) {
                activeWave.wave.frameCount++;
                if (activeWave.wave.frameCount >= activeWave.wave.spaced) {
                    // make a copy of the movement object of this wave (each shape uses it to store its own data)
                    var movementData = Object.assign({}, activeWave.movement);
                    // shooting data for this shape
                    if (activeWave.type.indexOf("boss") !== -1) {  
                        // drop bigboss into the game
                        var boss = objectPool.getBigboss();
                        var turretData = activeWave.settings.turrets;

                        if (godlike) {
                            // make all shooters high frequency
                            turretData.freq = 20;
                        }

                        // start the boss shape and pass along required data
                        boss.startMe(activeWave.type, activeWave.settings.x, activeWave.settings.y, activeWave.settings.points, turretData, movementData);
                        enemyReleased++;
                    } else {
                        var shootData = null;
                        // drop shape into the game
                        var shape = objectPool.getShape();
                        // is this shape of this wave a shooter?
                        if (activeWave.settings.shooters !== undefined) shootData = search(activeWave.settings.shooters, "index", activeWave.wave.dropped);
                        // does this shape drop a powerup?
                        var powerupType = "";
                        if ((activeWave.powerup !== undefined) && (activeWave.powerup !== null)) {
                            var powerupIndex = activeWave.powerup.index;
                            if (activeWave.wave.dropped === powerupIndex) powerupType = activeWave.powerup.type;
                        }

                        if (godlike) {
                            if (shootData !== null) {
                                // make all shooters high frequency
                                shootData.freq = 20;
                            }
                        }

                        // start the shape and pass along required data
                        shape.startMe(activeWave.type, 
                                      activeWave.settings.x, 
                                      activeWave.settings.y, 
                                      powerupType, 
                                      shootData, 
                                      movementData);
                        enemyReleased++;
                    }
                    
                    activeWave.wave.dropped++;
                    // if wave is complete set value to null
                    if (activeWave.wave.dropped >= activeWave.wave.count) activeWaves[n] = null;
                    // reset frameCount for next drop
                    activeWave.wave.frameCount = 0;
                    
                }
            }
        }

        frameCounter++;
        if ((frameCounter % frameRate) === 0) {
            seconds++;
            frameCounter = 0;
            // check if time to add a new wave to game
            addWave();
        }

        // play beat sound effect
        if (seconds >= 50) {
            if ((frameCounter % halfFrameRate) === 0) createjs.Sound.play("beat2");
        } else if (seconds >= 30) {
            if ((frameCounter % frameRate) === 0) createjs.Sound.play("beat2");
        } else {
            if ((frameCounter % frameRate) === 0) createjs.Sound.play("beat1");
        } 

        //console.log("r: " + enemyReleased +  " : t" + enemyTotal + " : u: " + objectPool.usageTest());
        // wave is complete only if all enemies released and there is only player left (enemies all killed)
        if ((enemyReleased === enemyTotal) && (!objectPool.usageTest())) this.levelMe();

    };

};