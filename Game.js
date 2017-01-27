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

	// array of all game objects currently in use
	//var usedList;
	// game objects
	//var background, sky, gameScreen, scoreboard, redPlane, prison1, prison2, prison3, redFactory, blueFactory, redBunker, blueBunker, tower, balloon, landscape;
	// object to preload and handle all assets (spritesheet and sounds)
	var assetManager;
	// object to setup and dispatch key events for gamepad events
	var gamepadManager;
	// object pool for all game objects
	var objectPool;


	// current state of the game
	var state = -1;

	// !!!!! temporary object
	var rhombus = null;


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

		// construct/start game objects (have to be in this order due to object dependencies)
		rhombus = new Rhombus(stage, assetManager);
		rhombus.startMe();




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
		var length = usedList.length;
		var object = null;
		for (var n=0; n<length; n++) {
			object = usedList[n];
			// remove everything except the clouds
			if ((object !== null) && (!(object instanceof Cloud))) object.removeMe();
		}
		*/

		state = GameConstants.STATE_INTRO;
	}

	function randomMe(iLower,iUpper) {
		// randomly selects returns a number between range
		var iRandomNum = 0;
		iRandomNum = Math.round(Math.random() * (iUpper - iLower)) + iLower;
		return iRandomNum;
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

		// color the background of the game with a shape
		//background = new createjs.Shape();
		//background.graphics.beginFill("#6699CC").drawRect(0,0,800,500);
		//background.cache(0,0,800,500);
		//stage.addChild(background);
		//stage.update();

		// setup listener for when assetManager has loaded the gameScreen assets
		stage.addEventListener("onScreensLoaded", onPreloadAssets);
		// construct preloader object to load spritesheet and sound assets
		assetManager = new AssetManager(stage);
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
		stage.addEventListener("onAssetsLoaded", onSetup);
		// load the rest of the assets (minus gameScreen assets)
		assetManager.loadAssets(gameManifest);
	}

	function onSetup() {
		console.log(">> setup");
		// kill event listeners
		//stage.removeEventListener("onAssetLoaded", gameScreen.progressMe);
		stage.removeEventListener("onAssetsLoaded", onSetup);
		
		/*
		// construct object pool
		objectPool = new ObjectPool();
		objectPool.init();
		// get reference to usedList from objectPool object
		usedList = objectPool.getUsedList();
		*/

		startGame();

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

		/*
		// construct three clouds - but it requires the landscape object and that requires the redPlane (none are started)
		redPlane = objectPool.getPlane();
		redPlane.type = "RedPlane";
		*/

		// change state of game
		state = GameConstants.STATE_INTRO;
		console.log(">> intro gameScreen ready");
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

		/*
		// STEP II : UPDATING STEP
		// scroll through all used objects in game and update them all
		var length = usedList.length;
		var target = null;
		for (var n=0; n<length; n++) {
			target = usedList[n];
			if (target !== null) target.updateMe();
		}
		*/

		// STEP III : RENDERING
		// update the stage!
		stage.update();
	}

})();
