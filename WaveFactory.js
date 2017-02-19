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
            var wave = activeWaves[n];
            if (wave !== null) {
                wave.frameCount++;
                if (wave.frameCount >= wave.spaced) {
                    var shape;
                    // make a copy of the movement object of this wave (each shape uses it to store its own data)
                    var movementData = Object.assign({}, wave.movement);
                    // shooting data for this shape
                    var shootData = null;
                    if (wave.type.indexOf("bigboss_") !== -1) {  
                        // drop bigboss into the game
                        shape = objectPool.getBigboss();
                        // add turrets to shape
                        //shape.setTurrets(wave.turrets);
                    } else {
                        // drop shape into the game
                        shape = objectPool.getShape();
                        // is this shape of this wave a shooter?
                        if (wave.shooters !== undefined) shootData = search(wave.shooters, "index", wave.dropped);
                    }
                    // start the shape and pass along required data
                    shape.startMe(wave.type, wave.x, wave.y, shootData, movementData);
                    
                    wave.dropped++;
                    // if wave is complete set value to null
                    if (wave.dropped >= wave.count) activeWaves[n] = null;
                    // reset frameCount for next drop
                    wave.frameCount = 0;
                    
                }
            }
        }

        frameCounter++;
    };

    // ------------------------------------------------------- event handlers
    function onAddWave(e) {
        activeWaves.push(levelManifest[level][waveIndex]);
        
        // initializing wave object before starting wave
        activeWaves[activeWaves.length - 1].frameCount = 0;
        activeWaves[activeWaves.length - 1].dropped = 0;

        waveIndex++;
        if (waveIndex > (levelManifest[level].length - 1)) {
            // wave is complete
            window.clearInterval(waveTimer);
        }

        //console.log(activeWaves);

    }



};