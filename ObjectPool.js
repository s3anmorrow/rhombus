// ObjectPool class
// Sean Morrow
// Mar 22 / 2013

var ObjectPool = function(stage, assetManager) {
	// private property variables
	// list of all game objects to be rendered onto the canvas
	var updateList = [];

	// starting constant maximums of the game elements (virusMax can be extended by Object pool if needed)
	var TRIANGLE_MAX = 20;

	// object pool arrays
	var trianglePool = [];

	// direct public access to pools
	this.trianglePool = trianglePool;

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
			pool[i] = new Class(stage, assetManager);
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
		constructObjects(trianglePool, TRIANGLE_MAX, Triangle);

		console.log(">> object pools filled");
	};

	this.getTriangle = function() {
		return getObject(trianglePool, TRIANGLE_MAX);
    };

    this.dispose = function(o) {
		// which type of game object are we disposing?
		if (o.type == "Triangle") {
			trianglePool[o.poolIndex].used = false;
			updateList[o.usedIndex] = null;
		} 

		//console.log("dispose " + o.type + " @ pool index " + o.poolIndex);
	};

};
