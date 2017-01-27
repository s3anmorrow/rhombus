// AssetManager class
// Sean Morrow
// May 6 / 2014

var AssetManager = function(stage) {
	// keep track of assets
    var manifest = null;
	var counter = -1;
	var total = -1;
	// array of spritesheet objects
    var spriteSheets = [];
    // array of JSON for each spritesheet
    var spriteSheetsJSON = [];
	// preloader object
	preloader = new createjs.LoadQueue();

	// construct custom event object and initialize it
	var eventAllLoaded = new createjs.Event("onAllAssetsLoaded");
	var eventScreensLoaded = new createjs.Event("onScreensLoaded");

	// ------------------------------------------------------ event handlers
	function onLoaded(e) {

        console.log("asset loaded: " + e.item.src + " type: " + e.item.type);

        // what type of asset was loaded?
        switch(e.item.type) {
            case createjs.LoadQueue.IMAGE:
                // spritesheet loaded
                // get id and source from manifest of currently loaded spritesheet
                var id = e.item.id;
                // store a reference to the actual image that was preloaded
                var image = e.result;
                // get data object from JSON array (previously loaded)
                var data = spriteSheetsJSON[id];
                // add images property to data object and tack on loaded spritesheet image from LoadQueue
                // this is so that the SpriteSheet constructor doesn't preload the image again
                // it will do this if you feed it the string path of the spritesheet
                data.images = [image];
                // construct Spritesheet object from source
                var spriteSheet = new createjs.SpriteSheet(data);
                // store spritesheet object for later retrieval
                spriteSheets[id] = spriteSheet;
                break;

            case createjs.LoadQueue.JSON:
                // get spritesheet this JSON object belongs to and store for spritesheet construction later
                var spriteSheetID = e.item.forSpritesheet;
                spriteSheetsJSON[spriteSheetID] = e.result;
                break;
        }
		// increment asset counter
		counter++;
    }

	//called if there is an error loading the spriteSheet (usually due to a 404)
	function onError(e) {
		console.log("Preloader > Error Loading asset");
	}

	function onComplete(e) {
		if (counter >= total) {
			spriteSheetsJSON = null;
			// kill event listeners
        	preloader.removeAllEventListeners();
			// dispatch event that all assets are loaded
			stage.dispatchEvent(eventAllLoaded);
        }
	}

	function onScreensComplete(e) {
		if (counter >= total) {
			spriteSheetsJSON = null;
			// kill event listeners
        	preloader.removeAllEventListeners();
			// dispatch event that all assets are loaded
			stage.dispatchEvent(eventScreensLoaded);
        }
	}

	// ------------------------------------------------------ public methods
	this.getSprite = function(id, frame) {
		// construct sprite object to animate the frames (I call this a clip)
		var sprite = new createjs.Sprite(spriteSheets[id]);
		sprite.name = id;
		sprite.x = 0;
		sprite.y = 0;
		if (frame != undefined) sprite.gotoAndPlay(frame);
		else sprite.currentFrame = 0;
		return sprite;
	};

    this.getSpriteSheet = function(id) {
        return spriteSheets[id];
    };

	this.getProgress = function() {
		return (counter/total);
	};

    this.loadScreens = function(myScreenManifest) {
		// setup manifest
		manifest = myScreenManifest;
		counter = 0;
		total = 1;
		// setup event listeners
        preloader.addEventListener("fileload", onLoaded);
        preloader.addEventListener("error", onError);
        preloader.addEventListener("complete", onScreensComplete);
		// make it happen
		preloader.loadFile(manifest);
	};

	this.loadAssets = function(myManifest) {
		// setup manifest
        manifest = myManifest;
		counter = 0;
		total = manifest.length;
        // register different plugins for sound playback in browsers when available
        createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
        // if browser doesn't suppot the ogg it will attempt to look for an mp3
        createjs.Sound.alternateExtensions = ["mp3","wav"];
		// registers the PreloadJS object with SoundJS - will automatically have access to all sound assets
		preloader.installPlugin(createjs.Sound);
        preloader.addEventListener("fileload", onLoaded);
        preloader.addEventListener("error", onError);
        preloader.addEventListener("complete", onComplete);
		preloader.setMaxConnections(5);
		// load first spritesheet to start preloading process
		preloader.loadManifest(manifest);
	};
};
