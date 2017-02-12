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
    }


    // ------------------------------------------------------------- public methods
    this.levelMe = function() {
        // initialization
        level++;
        waveDelay = 2000;
        waveIndex = 0;
        activeWaves = [];
        // start timer to start dropping waves
        waveTimer = window.setInterval(onAddWave, waveDelay);
    }

    this.resetMe = function() {
        // various resets
        level = -1;
        activeWaves = [];
        frameCounter = 0;
        waveIndex = 0;
        window.clearInterval(waveTimer);


    }

    this.updateMe = function() {
        // loop through all active waves
        for (var n=0; n<activeWaves.length; n++) {
            var wave = activeWaves[n];
            if (wave != null) {
                wave.frameCount++;
                if (wave.frameCount >= wave.spaced) {
                    // prepare options
                    var options = Object.assign({}, wave.options);
                    // drop shape into the game
                    var shape = objectPool.getShape();
                    shape.startMe(wave.type, Behaviours[wave.behaviour], wave.x, wave.y, options);
                    // is this shape of this wave a shooter?
                    if ((wave.shooters != undefined) && (wave.shooters.indexOf(wave.dropped) != -1)) shape.setShooter(true);
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
        waveIndex++;
        if (waveIndex > (levelManifest[level].length - 1)) {
            // wave is complete
            window.clearInterval(waveTimer);
        }

        //console.log(activeWaves);



    }



}