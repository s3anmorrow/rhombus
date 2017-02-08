// ObjectPool class
// Sean Morrow
// Mar 22 / 2013

var ObjectPool = function() {
	// private property variables
	// list of all game objects to be rendered onto the canvas
	var updateList = [];

	// starting constant maximums of the game elements (virusMax can be extended by Object pool if needed)
	var SHAPE_MAX = 100;
	var PLAYER_MAX = 1;
	var BULLET_MAX = 50;

	// object pool arrays
	var shapePool = [];
	var playerPool = [];
	var bulletPool = [];

	// direct public access to pools
	this.shapePool = shapePool;
	this.playerPool = playerPool;
	this.bulletPool = bulletPool;

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

	function constructObjects(pool,max,Class) {
		// adding new object to a pool
		for (var i = 0; i < max; i++) {
			pool[i] = new Class();
			pool[i].poolIndex = i;
			pool[i].usedIndex = index;
			updateList[index] = null;
			index++;
		}
	}

	// ------------------------------------------------------ public methods
	this.getUpdateList = function() {return updateList;};

	this.init = function() {
		// pool object construction
		// populate arrays to create pool of game objects
		constructObjects(shapePool, SHAPE_MAX, Shape);
		constructObjects(playerPool, PLAYER_MAX, Player);
		constructObjects(bulletPool, BULLET_MAX, Bullet);

		console.log(">> object pools filled");
	};

	this.getShape = function() {
		return getObject(shapePool, SHAPE_MAX);
    };

	this.getPlayer = function() {
		return getObject(playerPool, PLAYER_MAX);
	}

	this.getBullet = function() {
		return getObject(bulletPool, BULLET_MAX);
	}

    this.dispose = function(o) {
		// which type of game object are we disposing?
		if (o.constructor.name == "Shape") {
			shapePool[o.poolIndex].used = false;			
		} else if (o.constructor.name == "Player") {
			playerPool[o.poolIndex].used = false;
		} else if (o.constructor.name == "Bullet") {
			bulletPool[o.poolIndex].used = false;	
		}
		updateList[o.usedIndex] = null;

		//console.log("dispose " + o.type + " @ pool index " + o.poolIndex);
	};

};
