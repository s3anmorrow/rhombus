// Rhombus!
// Sean Morrow
// Jan 2017
(function() {
	"use strict";

	// game variables
	var stage = null;
	var canvas = null;
	var downKey = false;
	var upKey = false;
	var leftKey = false;
	var rightKey = false;
	var fireKey = false;

	// array of all game objects currently in use and thus need update() called in ticker
	var updateList;
	// game objects
	var background;
	//var background, sky, gameScreen, scoreboard, redPlane, prison1, prison2, prison3, redFactory, blueFactory, redBunker, blueBunker, tower, balloon, landscape;
	// object to preload and handle all assets (spritesheet and sounds)
	var assetManager;
	// object to setup and dispatch key events for gamepad events
	var gamepadManager;
	// object pool for all game objects
	var objectPool;
	// object to handle waves of enemies
	var waveFactory;


	// current state of the game
	var state = -1;

	// !!!!! temporary object
	var rhombus = null;
	var triangle = null;
	var triangle2 = null;
	var triangle3 = null;


	var GameConstants = {
		"FRAME_RATE":30,
		"STATE_SETUP":-1,
		"STATE_INTRO":0,
		"STATE_INSTRUCT":1,
		"STATE_CREDITS":2,
		"STATE_PLAYING":3,
		"STATE_GAMEOVER":4
	};

	window.addEventListener("load", onInit);

	// ------------------------------------------------------------ private methods
	function startGame() {
		// initialization

		/*
		// construct/start game objects (have to be in this order due to object dependencies)
		triangle = objectPool.getShape();
		triangle.setupMe("player", Behaviours.looping, 600, 300, {r:100, cx:300, cy:300, dir:"left", loops:2, speed:6});
		triangle.startMe();

		triangle2 = objectPool.getShape();
		triangle2.setupMe("player", Behaviours.looping, 0, 300, {r:100, cx:300, cy:300, dir:"right", loops:3, speed:2});
		triangle2.startMe();

		triangle3 = objectPool.getShape();
		triangle3.setupMe("player", Behaviours.looping, 300, 0, {r:100, cx:300, cy:300, dir:"down", loops:2, speed:4});
		triangle3.startMe();

		triangle = objectPool.getShape();
		triangle.setupMe("player", Behaviours.down, 300, 0, {speed:6});
		triangle.startMe();

		triangle = objectPool.getShape();
		triangle.setupMe("player", Behaviours.up, 300, 800, {speed:6});
		triangle.startMe();
		
		triangle = objectPool.getShape();
		triangle.setupMe("player", Behaviours.switch, 300, 0, {speed:6, y:300});
		triangle.startMe();

		triangle = objectPool.getShape();
		triangle.setupMe("player", Behaviours.left, 600, 300, {speed:6});
		triangle.startMe();

		triangle = objectPool.getShape();
		triangle.setupMe("player", Behaviours.right, 0, 300, {speed:6});
		triangle.startMe();
		*/
		

		/*
		triangle = objectPool.getShape();
		triangle.setupMe("rhombus", Behaviours.diagonal, 300, 0, {speed:4, angle:115});
		triangle.startMe();
		
		triangle2 = objectPool.getShape();
		triangle2.setupMe("rhombus", Behaviours.switch, 575, 0, {speed:4, y:450});
		triangle2.startMe();		
		*/


		waveFactory.levelMe();



		// game event listener for all events that control gameplay
		stage.addEventListener("onGameEvent", onGameEvent);
		// change stage of game
		state = GameConstants.STATE_PLAYING;
		
		// start up level one
		//levelMe();

		console.log(">> game started");
	}

	function stopGame(win) {
		// kill game event listener
		stage.removeEventListener("onGameEvent", onGameEvent);

		state = GameConstants.STATE_GAMEOVER;
	}

	function resetGame() {
		/*
		// scroll through all used elements and return them to the objectPool (with exceptions)
		var length = updateList.length;
		var object = null;
		for (var n=0; n<length; n++) {
			object = updateList[n];
			// remove everything except the clouds
			if ((object !== null) && (!(object instanceof Cloud))) object.removeMe();
		}
		*/

		state = GameConstants.STATE_INTRO;
	}

	// ------------------------------------------------------------ event handlers
	function onInit() {
		console.log(">> initializing");
		state = GameConstants.STATE_SETUP;

		// get reference to canvas
		canvas = document.getElementById("stage");
		// set canvas to as wide/high as the browser window
		canvas.width = 600;
		canvas.height = 800;
		// create stage object
		stage = new createjs.Stage(canvas);
		Globals.stage = stage;

		// color the background of the game with a shape
		background = new createjs.Shape();
		background.graphics.beginFill("#C0C0C0").drawRect(0,0,600,800);
		background.cache(0,0,600,800);
		stage.addChild(background);
		stage.update();

		// setup listener for when assetManager has loaded the gameScreen assets
		stage.addEventListener("onScreensLoaded", onPreloadAssets);
		// construct preloader object to load spritesheet and sound assets
		assetManager = new AssetManager(stage);
		Globals.assetManager = assetManager;
		// load screens first so I can display the preload gameScreen
		//assetManager.loadScreens(screenManifest);
		onPreloadAssets();
	}

	function onPreloadAssets() {
		console.log(">> preloading assets");
		// kill eventlistener
		stage.removeEventListener("onScreensLoaded", onPreloadAssets);
		// construct gameScreen object
		//gameScreen = new Screen();
		//gameScreen.showMe("Preload");
		// setup listeners for when assetManager has loaded each asset and all assets
		//stage.addEventListener("onAssetLoaded", gameScreen.progressMe);
		stage.addEventListener("onAllAssetsLoaded", onSetup);
		// load the rest of the assets (minus gameScreen assets)
		assetManager.loadAssets(gameManifest);
	}

	function onSetup() {
		console.log(">> setup");
		// kill event listeners
		//stage.removeEventListener("onAssetLoaded", gameScreen.progressMe);
		stage.removeEventListener("onAllAssetsLoaded", onSetup);
		
		// construct object pool
		objectPool = new ObjectPool(stage, assetManager);
		Globals.objectPool = objectPool;
		objectPool.init();
		// get reference to updateList from objectPool object
		updateList = objectPool.getUpdateList();

		// construct WaveFactory to control enemy waves
		waveFactory = new WaveFactory();


		// setup listener for ticker to actually update the stage
		createjs.Ticker.useRAF = true;
		// set framerate
		createjs.Ticker.setFPS(GameConstants.FRAME_RATE);
		createjs.Ticker.addEventListener("tick", onTick);

		/*
		// construct gamepadManager
		gamepadManager =  new GamepadManager();
		gamepadManager.setup(gamepadManifest);
		*/

		/*
		// setup event listeners for keyboard keys
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);
		*/

		/*
		// game ready - show intro gameScreen
		gameScreen.showMe("Intro");
		*/

		/*
		// construct sky object for adding clouds to
		sky = new createjs.Container();
		stage.addChild(sky);
		*/


		// change state of game
		state = GameConstants.STATE_INTRO;
		//console.log(">> intro gameScreen ready");

		// ???????????????? temporary start
		startGame();

	}

	function onKeyDown(e) {

		e.preventDefault();
	}

	function onKeyUp(e) {
		
		e.preventDefault();
	}

	function onGameEvent(e) {
		console.log("gameEvent: " + e.id);

		// what type of event has occurred?
		switch (e.id){

		}
	}

	// game loop method
	function onTick() {

		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TESTING
		document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		// STEP I : KEYBOARD / GAMEPAD MONITORING
		//if (upKey) redPlane.rotateUp();
		//else if (downKey) redPlane.rotateDown();
		// monitor gamepadManager for any buttons / joystick changes
		//gamepadManager.monitorMe(state);


		waveFactory.updateMe();


		// STEP II : UPDATING STEP
		// scroll through all used objects in game and update them all
		var length = updateList.length;
		var target = null;
		for (var n=0; n<length; n++) {
			target = updateList[n];
			if (target !== null) target.updateMe();
		}

		// STEP III : RENDERING
		// update the stage!
		stage.update();
	}

})();
