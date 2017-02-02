var WaveFactory = function(){

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;

    // private property variables
    //var wave = 0;
    //var waveIndex = 0;

    var activeWaves = [{x:300,y:0,type:"square",behaviour:"down",dropped:0,count:5,frameCount:0,spaced:10}];


    //var wavePlan = [{x:300,y:0,behaviour:"down",shapes:5,spaced:10}];




    var frameCounter = 0;

    // ----------------------------------------------------------- get/set methods
    this.setWave = function(myWave) {
        //wave = myWave;









    };

    this.levelMe = function() {
        // initialization
        activeWaves = [];


    }

    this.updateMe = function() {

        // loop through all active waves
        for (var n=0; n<activeWaves.length; n++) {
            var wave = activeWaves[n];
            if (wave != null) {
                wave.frameCount++;
                if (wave.frameCount >= wave.spaced) {

                    triangle = objectPool.getShape();
                    triangle.setupMe(wave.type, Behaviours.down, wave.x, wave.y, {speed:4, angle:115});
                    triangle.startMe();

                    wave.dropped++;
                    wave.frameCount = 0;

                    if (wave.dropped >= wave.count) {
                        // wave's shapes have all been dropped
                        console.log("wave done!");
                        // since wave is complete set value to null
                        activeWaves[n] = null;
                    }
                }
            }

        }



        frameCounter++;
    };



}