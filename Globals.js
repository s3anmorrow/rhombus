var Globals = {
	// frequent access global variables
	stage:null,
    assetManager:null,
    objectPool:null,
	gamepadManager:null,
	// lookup tables for trig in Globals object for global access
	sinTable:[],
	cosTable:[],
	gameState:0,
	// game constants used throughout
    gameConstants:{
		FRAME_RATE:30,
		PLAYER_SPEED:12,
		PLAYER_MIN_X:20,
		PLAYER_MAX_X:780,
		PLAYER_MIN_Y:400,
		PLAYER_MAX_Y:750,
		PLAYER_START_POWER:6,
		PLAYER_MAX_POWER:6,
		PLAYER_START_LIVES:3,
		PLAYER_WEAPONS:{
			"single":{
				freq:8,
				gunPoints:[{x:0,y:-20,r:270}],
				alternateFire:false,
				auto:false,
				speed:14,
				damage:1,
				invincible:false,
				frame:"bullet"
			},
			"double":{
				freq:6,
				gunPoints:[{x:-20,y:-5,r:270},{x:20,y:-5,r:270}],
				alternateFire:true,
				auto:true,
				speed:20,
				damage:1,
				invincible:false,
				frame:"bullet"				
			},
			"spread":{
				freq:4,
				gunPoints:[{x:0,y:-20,r:270},{x:-20,y:-5,r:260},{x:20,y:-5,r:280}],
				alternateFire:false,
				auto:false,
				speed:20,
				damage:0.5,
				invincible:false,
				frame:"spread"				
			},
			"heavy":{
				freq:8,
				gunPoints:[{x:0,y:-30,r:270}],
				alternateFire:false,
				auto:false,
				speed:10,
				damage:5,
				invincible:false,
				frame:"bullet2"
			},
			"rapid":{
				freq:1,
				gunPoints:[{x:0,y:-20,r:270}],
				alternateFire:false,
				auto:true,
				speed:10,
				damage:0.3,
				invincible:false,
				frame:"rapidBullet"				
			},
			"laser":{
				freq:0,
				gunPoints:[{x:0,y:-28,r:270}],
				alternateFire:false,
				auto:false,
				speed:0,
				damage:0.2,
				invincible:true,
				frame:"laserBullet"				
			},
			"bounce":{
				freq:0,
				gunPoints:[{x:0,y:-20,r:270},{x:-20,y:-5,r:260},{x:20,y:-5,r:280}],
				alternateFire:false,
				auto:false,
				speed:6,
				damage:0.5,
				invincible:true,
				frame:"bounceBullet"				
			}
		}
	},

	commaUpScore:function(score) {
		// take score and add commas
		var scoreString = String(score);
		return scoreString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	// ??????????????????/ possibly not used
	/*
	centerMe:function(displayObj) {
		// centers a display object on stage horizontally
        displayObj.x = 400 - (displayObj.getBounds().width/2);
    },
	*/

	// frequent access methods
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
