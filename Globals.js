var Globals = {
    
    gameConstants:{
		"FRAME_RATE":30,
		"STATE_SETUP":-1,
		"STATE_INTRO":0,
		"STATE_INSTRUCT":1,
		"STATE_CREDITS":2,
		"STATE_PLAYING":3,
		"STATE_GAMEOVER":4
	},
    stage:null,
    assetManager:null,
    objectPool:null,

	// converts degrees to radians for Trig calc
    radianMe:function(degrees) {
        return (degrees * (Math.PI / 180));
    },
	// generates random number within range
	randomMe:function(lower,upper) {
		// randomly selects returns a number between range
		var iRandomNum = 0;
		iRandomNum = Math.round(Math.random() * (upper - lower)) + lower;
		return iRandomNum;
	}
	
    




};