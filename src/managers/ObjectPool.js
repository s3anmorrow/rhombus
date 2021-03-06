// ObjectPool class
// Sean Morrow
// Mar 22 / 2013

var ObjectPool = function() {
	// private property variables
	// list of all game objects to be rendered onto the canvas
	var updateList = [];

	// starting constant maximums of the game elements (virusMax can be extended by Object pool if needed)
	var SHAPE_MAX = 200;
	var PLAYER_MAX = 1;
	var BULLET_MAX = 500;
	var BIGBOSS_MAX = 30;
	var TURRET_MAX = 50;
	var POWERUP_MAX = 5;

	// object pool arrays
	var shapePool = [];
	var playerPool = [];
	var bulletPool = [];
	var bigbossPool = [];
	var turretPool = [];
	var powerupPool = [];

	// direct public access to pools
	this.shapePool = shapePool;
	this.playerPool = playerPool;
	this.bulletPool = bulletPool;
	this.bigbossPool = bigbossPool;
	this.turretPool = turretPool;
	this.powerupPool = powerupPool;

	// other
	var index = 0;

	// ------------------------------------------------------ private methods
	function getObject(pool,max){
		// go through existing pool and grab target object that is not in use and return it
		var i;
		for (i = 0; i < max; i++) {
			if (!pool[i].used) {
				var object = pool[i];
				object.used = true;
				updateList[object.usedIndex] = object;
				return object;
			}
		}
		return null;
	}

	function constructObjects(pool,max,Class,name) {
		// adding new object to a pool
		for (var i = 0; i < max; i++) {
			pool[i] = new Class();
			pool[i].name = name;
			pool[i].poolIndex = i;
			pool[i].usedIndex = index;
			updateList[index] = null;
			index++;
		}
	}

	// ------------------------------------------------------ public methods
	this.getUpdateList = function() {
		return updateList;
	};

	this.usageTest = function() {
		// scan pools for any objects currently in use
		for (var i = 0; i < shapePool.length; i++) {
			if (shapePool[i].used) return true; 
		}
		for (var i = 0; i < turretPool.length; i++) {
			if (turretPool[i].used) return true; 
		}
		for (var i = 0; i < bigbossPool.length; i++) {
			if (bigbossPool[i].used) return true; 
		}
		return false;
	}

	this.init = function() {
		// pool object construction
		// populate arrays to create pool of game objects
		constructObjects(playerPool, PLAYER_MAX, Player, "Player");
		constructObjects(shapePool, SHAPE_MAX, Shape, "Shape");
		constructObjects(bulletPool, BULLET_MAX, Bullet, "Bullet");
		constructObjects(bigbossPool, BIGBOSS_MAX, Bigboss, "Bigboss");
		constructObjects(turretPool, TURRET_MAX, Turret, "Turret");
		constructObjects(powerupPool, POWERUP_MAX, Powerup, "Powerup");

		console.log(">> object pools filled");
	};

	this.getShape = function() {
		return getObject(shapePool, SHAPE_MAX);
    };

	this.getPlayer = function() {
		return getObject(playerPool, PLAYER_MAX);
	};

	this.getBullet = function() {
		return getObject(bulletPool, BULLET_MAX);
	};

	this.getBigboss = function() {
		return getObject(bigbossPool, BIGBOSS_MAX);
	};

	this.getTurret = function() {
		return getObject(turretPool, TURRET_MAX);
	};

	this.getPowerup = function() {
		return getObject(powerupPool, POWERUP_MAX);
	};

    this.dispose = function(o) {
		// which type of game object are we disposing?
		if (o.name === "Shape") {
			shapePool[o.poolIndex].used = false;			
		} else if (o.name === "Player") {
			playerPool[o.poolIndex].used = false;
		} else if (o.name === "Bullet") {
			bulletPool[o.poolIndex].used = false;	
		} else if (o.name === "Bigboss") {
			bigbossPool[o.poolIndex].used = false;	
		} else if (o.name === "Turret") {
			turretPool[o.poolIndex].used = false;	
		} else if (o.name === "Powerup") {
			powerupPool[o.poolIndex].used = false;	
		}
		updateList[o.usedIndex] = null;

		//console.log("dispose " + o.name + " @ pool index " + o.poolIndex);
	};

};
