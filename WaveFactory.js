var WaveFactory = function(){

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;

    // private property variables
    var level = -1;
    //var wave = 0;
    var waveIndex = 0;

    // timer to control dispatchment of waves
    var waveTimer;
    var waveDelay = 0;
    // the current active waves on the stage
    var activeWaves = [];

    // keep track of frames for spacing shapes out
    var frameCounter = 0;

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

    // ------------------------------------------------------------- public methods
    this.levelMe = function() {
        // initialization
        level++;

        // TODO add ticker/time delay between waves into level manifest
        // ?????????????????????? needs fixing
        waveDelay = 2000;

        waveIndex = 0;
        activeWaves = [];
        // start timer to start dropping waves
        waveTimer = window.setInterval(onAddWave, waveDelay);
    };

    this.resetMe = function() {
        // various resets
        level = -1;
        activeWaves = [];
        frameCounter = 0;
        waveIndex = 0;
        window.clearInterval(waveTimer);


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
                    if (activeWave.type.indexOf("bigboss_") !== -1) {  
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
    };

    // ------------------------------------------------------- event handlers
    function onAddWave(e) {
        activeWaves.push(levelManifest[level][waveIndex]);
        
        // initializing wave object before starting wave
        activeWaves[activeWaves.length - 1].wave.frameCount = 0;
        activeWaves[activeWaves.length - 1].wave.dropped = 0;

        waveIndex++;
        if (waveIndex > (levelManifest[level].length - 1)) {
            // wave is complete
            window.clearInterval(waveTimer);
        }

        //console.log(activeWaves);

    }



};