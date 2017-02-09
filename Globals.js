var Globals = {
	stage:null,
    assetManager:null,
    objectPool:null,
	gameStates:{
		STATE_SETUP:-1,
		STATE_INTRO:0,
		STATE_INSTRUCT:1,
		STATE_CREDITS:2,
		STATE_PLAYING:3,
		STATE_GAMEOVER:4
	},    
    gameConstants:{
		FRAME_RATE:30,
		PLAYER_SPEED:10,
		WEAPONS:{
			"single":{
				freq:8,
				firePoints:[{x:0,y:-20,r:270}],
				speed:14,
				damage:2,
				frame:"bullet"
			},
			"double":{
				freq:2,
				firePoints:[{x:-20,y:-5,r:270},{x:20,y:-5,r:270}],
				speed:20,
				damage:2,
				frame:"bullet"				
			},
			"spread":{
				freq:4,
				firePoints:[{x:0,y:-20,r:270},{x:-20,y:-5,r:260},{x:20,y:-5,r:280}],
				speed:20,
				damage:1,
				frame:"spread"				
			},
			"laser":{
				freq:1,
				firePoints:[{x:0,y:-20,r:270}],
				speed:10,
				damage:0.5,
				frame:"laser"				
			}

		}
	},

	// lookup tables for trig in Globals object for global access
	sinTable:[],
	cosTable:[],

	// ??????????????????/ possibly not need this below with lookup tables
	// converts degrees to radians for Trig calc
    radianMe:function(degrees) {
        return (degrees * (Math.PI / 180));
    },
	// ????????????????????????????????????????????????

	// generates random number within range
	randomMe:function(lower,upper) {
		// randomly selects returns a number between range
		var iRandomNum = 0;
		iRandomNum = Math.round(Math.random() * (upper - lower)) + lower;
		return iRandomNum;
	},
	
	// ------------------------------------------ private methods
	// initialization of Globals object
	init:function() {
		var rads;
		var piOver180 = Math.PI/180;
		for (var n=0; n<=360; n++) {
			rads = n * piOver180;
			Globals.sinTable[n] = Math.sin(rads);
			Globals.cosTable[n] = Math.cos(rads);
		}
	}

};

// initialization globals
Globals.init();
