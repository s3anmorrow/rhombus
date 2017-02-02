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
    }  
	
    




};