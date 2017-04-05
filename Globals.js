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
		HIGHSCORE_SCRIPT:"",
		PLAYER_SPEED:14,
		PLAYER_MIN_X:20,
		PLAYER_MAX_X:780,
		PLAYER_MIN_Y:40,
		PLAYER_MAX_Y:750,
		PLAYER_START_POWER:4,
		PLAYER_MAX_POWER:4,
		PLAYER_START_LIVES:1,
		POWERUP_DURATION:8,
		TURRET_BONUS_ACCURACY:30,
		SHAPES:{
			"circle": {hp:1,points:50,accuracy:30},
			"square": {hp:1,points:50,accuracy:80},
			"triangle": {hp:2,points:100,accuracy:40},
			"ellipse": {hp:2,points:100,accuracy:60},
			"star": {hp:3,points:200,accuracy:50},
			"nonagon": {hp:3,points:300,accuracy:70},
			"rectangle": {hp:4,points:400,accuracy:80},
			"hexagon": {hp:4,points:400,accuracy:70},
			"rhombus": {hp:5,points:500,accuracy:100},
			"pentagon": {hp:5,points:500,accuracy:100}
		},
		POWERUPS:{
			"powerupDouble": {category:"weapon",data:"double"},
			"powerupSuperDouble": {category:"weapon",data:"superDouble"},
			"powerupSpread": {category:"weapon",data:"spread"},
			"powerupSuperSpread": {category:"weapon",data:"superSpread"},
			"powerupHeavy": {category:"weapon",data:"heavy"},
			"powerupRapid": {category:"weapon",data:"rapid"},
			"powerupLaser": {category:"weapon",data:"laser"},
			"powerupBounce": {category:"weapon",data:"bounce"},
			"powerupSuperBounce": {category:"weapon",data:"superBounce"},
			"powerupShield": {category:"shield",data:10}, // duration of shield in seconds
			"powerupPower": {category:"power",data:1}, // number of power cubes
			"powerupHalfPower": {category:"power",data:3},
			"powerupFullPower": {category:"power",data:6},
			"powerupLife": {category:"life",data:1} // the number of lives
		},
		PLAYER_WEAPONS:{
			"single":{
				freq:8,
				gunPoints:[[{x:0,y:-20,r:270}],[{x:0,y:20,r:90}]],
				alternateFire:false,
				auto:false,
				speed:14,
				damage:1,
				invincible:false,
				ammo:-1,
				frame:"bullet"
			},
			"double":{
				freq:6,
				gunPoints:[[{x:-10,y:-5,r:270},{x:10,y:-5,r:270}],[{x:-10,y:5,r:90},{x:10,y:5,r:90}]],
				alternateFire:true,
				auto:true,
				speed:20,
				damage:1,
				ammo:200,
				invincible:false,
				frame:"bullet"				
			},
			"superDouble":{
				freq:6,
				gunPoints:[[{x:-10,y:-5,r:270},{x:10,y:-5,r:270}],[{x:-10,y:5,r:90},{x:10,y:5,r:90}]],
				alternateFire:false,
				auto:true,
				speed:20,
				damage:1,
				ammo:200,
				invincible:false,
				frame:"bullet"				
			},
			"spread":{
				freq:4,
				gunPoints:[[{x:0,y:-20,r:270},{x:-20,y:-5,r:250},{x:20,y:-5,r:290}],[{x:0,y:20,r:90},{x:-20,y:5,r:110},{x:20,y:5,r:70}]],
				alternateFire:false,
				auto:false,
				speed:20,
				damage:0.5,
				ammo:300,
				invincible:false,
				frame:"spreadBullet"				
			},
			"superSpread":{
				freq:8,
				gunPoints:[[{x:0,y:-20,r:270},{x:-20,y:-5,r:225},{x:20,y:-5,r:315},{x:24,y:5,r:0},{x:-24,y:5,r:180},{x:24,y:15,r:45},{x:-24,y:15,r:135}],[{x:0,y:20,r:90},{x:-20,y:5,r:135},{x:20,y:5,r:45},{x:24,y:-5,r:0},{x:-24,y:-5,r:180},{x:24,y:-15,r:315},{x:-24,y:-15,r:225}]],
				alternateFire:false,
				auto:true,
				speed:20,
				damage:1,
				ammo:500,
				invincible:false,
				frame:"spreadBullet"				
			},
			"heavy":{
				freq:8,
				gunPoints:[[{x:0,y:-30,r:270}],[{x:0,y:30,r:90}]],
				alternateFire:false,
				auto:false,
				speed:10,
				damage:5,
				ammo:25,
				invincible:true,
				frame:"bullet2"
			},
			"rapid":{
				freq:1,
				gunPoints:[[{x:0,y:-20,r:270}],[{x:0,y:20,r:90}]],
				alternateFire:false,
				auto:true,
				speed:10,
				damage:0.4,
				ammo:600,
				invincible:false,
				frame:"rapidBullet"				
			},
			"laser":{
				freq:0,
				gunPoints:[[{x:0,y:-28,r:270}],[{x:0,y:28,r:90}]],
				alternateFire:false,
				auto:false,
				speed:0,
				damage:0.2,
				ammo:100,
				invincible:true,
				frame:"laserBullet"				
			},
			"bounce":{
				freq:0,
				gunPoints:[[{x:0,y:-20,r:270},{x:-20,y:-5,r:260},{x:20,y:-5,r:280}],[{x:0,y:20,r:90},{x:-20,y:5,r:100},{x:20,y:5,r:80}]],
				alternateFire:false,
				auto:false,
				speed:6,
				damage:0.3,
				ammo:100,
				invincible:true,
				frame:"bounceBullet"				
			},
			"superBounce":{
				freq:0,
				gunPoints:[[{x:0,y:-20,r:270},{x:-20,y:-5,r:260},{x:20,y:-5,r:280}],[{x:0,y:20,r:90},{x:-20,y:5,r:100},{x:20,y:5,r:80}]],
				alternateFire:false,
				auto:false,
				speed:6,
				damage:0.6,
				ammo:200,
				invincible:true,
				frame:"bounceBullet"				
			}
		}
	},
	
	// frequent access methods
	// adds commas to any number (for scores)
	commaUpScore:function(score) {
		// take score and add commas
		var scoreString = String(score);
		return scoreString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
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
