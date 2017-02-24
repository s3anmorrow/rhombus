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
                console.log("release wave!");
                // release new wave

                // initializing next wave object before starting wave
                activeLevel[waveIndex].wave.frameCount = 0;
                activeLevel[waveIndex].wave.dropped = 0;
                activeWaves.push(activeLevel[waveIndex]);

                waveIndex++;
                if (waveIndex > (activeLevel.length - 1)) {
                    // wave is complete
                    //window.clearInterval(waveTimer);
                    console.log("wave all released!");
                }

                //console.log(activeWaves);
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
        activeLevel = levelManifest[level - 1];
        activeWaves = [];
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
                    } else {
                        var shootData = null;
                        // drop shape into the game
                        var shape = objectPool.getShape();
                        // is this shape of this wave a shooter?
                        if (activeWave.settings.shooters !== undefined) shootData = search(activeWave.settings.shooters, "index", activeWave.wave.dropped);
                        // start the shape and pass along required data
                        shape.startMe(activeWave.type, activeWave.settings.x, activeWave.settings.y, activeWave.settings.hp, shootData, movementData);
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

    };

};