var WaveFactory = function(){

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var frameRate = Globals.gameConstants.FRAME_RATE;

    // private property variables
    var level = 0;
    var wave = 0;
    var waveIndex = 0;
    var enemyReleased = 0;
    var enemyTotal = 0;
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
        return (level + 1);
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
            if (activeLevel[n].time == seconds) {

                console.log("Adding wave");

                // release new wave
                // initializing next wave object before starting wave
                activeLevel[waveIndex].wave.frameCount = activeLevel[waveIndex].wave.spaced;
                activeLevel[waveIndex].wave.dropped = 0;
                activeWaves.push(activeLevel[waveIndex]);
                waveIndex++;
            }
        }
    }    

    // ------------------------------------------------------------- public methods
    this.startMe = function() {
        level = 0;
        this.levelMe();
    };

    this.levelMe = function() {
        // initialization
        level++;
        frameCounter = 0;
        seconds = 0;
        wave = 0;
        waveIndex = 0;


        // LEVEL TESTING
        level = 2;
        waveIndex = 13;


        activeLevel = levelManifest[level - 1];
        enemyReleased = 0;
        enemyTotal = 0;
        for (var n=0; n<activeLevel.length; n++) {
            enemyTotal += activeLevel[n].wave.count;
        }
        activeWaves = [];

        console.log("level up: " + level);
    };

    this.resetMe = function() {
        // various resets
        level = 0;

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
                        if (activeWave.powerup !== null) {
                            var powerupIndex = activeWave.powerup.index;
                            if (activeWave.wave.dropped == powerupIndex) powerupType = activeWave.powerup.type;
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
        
        // wave is complete only if all enemies released and there is only player left (enemies all killed)
        if ((enemyReleased == enemyTotal) && (objectPool.getUsedCount() == 1)) this.levelMe();

    };

};