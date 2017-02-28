// Rhombus!
// Sean Morrow
// Jan 2017
(function() {
	"use strict";

	// TODO: powerups and new guns (invisible)
	// TODO: add aircraft carrier release boss
	// TODO: add invicibility to player
	// TODO: add shield feature
	// TODO: implement lookup tables for Trig

	// CURRENT BRANCH WORK
	// TODO: different bullet types for shapes	
	// TODO: player and big boss collision detection	

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

	// !!!!!!!! TESTING
	var rhombus = null;
	var triangle = null;
	var triangle2 = null;
	var triangle3 = null;
	var player = null;
	var bullet = null;

	// !!!!!!!!!!!!!!!!!!!!!


	// entry point
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

		// start the waves
		waveFactory.startMe();

		player = objectPool.getPlayer();
		player.startMe();
		player.setWeapon("double");


		// game event listener for all events that control gameplay
		stage.addEventListener("gameEvent", onGameEvent, true);
		// change stage of game
		state = Globals.gameStates.STATE_PLAYING;

		console.log(">> game started");
	}

	function stopGame(win) {
		// kill game event listener
		stage.removeEventListener("gameEvent", onGameEvent, true);

		state = Globals.gameStates.STATE_GAMEOVER;
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

		state = Globals.gameStates.STATE_INTRO;
	}

	// ------------------------------------------------------------ event handlers
	function onInit() {
		console.log(">> initializing");
		state = Globals.gameStates.STATE_SETUP;

		// get reference to canvas
		canvas = document.getElementById("stage");
		// set canvas to as wide/high as the browser window
		canvas.width = 800;
		canvas.height = 800;
		// create stage object
		stage = new createjs.Stage(canvas);
		// grant global access to stage object
		Globals.stage = stage;

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
		// grant global access to object pool
		Globals.objectPool = objectPool;
		objectPool.init();

		// get reference to updateList from objectPool object
		updateList = objectPool.getUpdateList();

		// construct background object
		background = new Background();
		background.startMe();

		// construct WaveFactory to control enemy waves
		waveFactory = new WaveFactory();

		/*
		// construct gamepadManager
		gamepadManager = new GamepadManager();
		gamepadManager.setup(gamepadManifest);
		*/

		// setup event listeners for keyboard keys
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

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
		state = Globals.gameStates.STATE_INTRO;
		//console.log(">> intro gameScreen ready");

		// listen for loss of focus on browser and pause game
		window.addEventListener("blur", onPause);
        window.addEventListener("focus", onResume);

		// setup listener for ticker to actually update the stage
		createjs.Ticker.useRAF = true;
		// set framerate
		createjs.Ticker.setFPS(Globals.gameConstants.FRAME_RATE);
		createjs.Ticker.addEventListener("tick", onTick);

		// ???????????????? temporary start
		startGame();

	}

	function onKeyDown(e) {
		if (e.keyCode == 40) downKey = true;
		else if (e.keyCode == 38) upKey = true;
		else if (e.keyCode == 37) leftKey = true;
		else if (e.keyCode == 39) rightKey = true;
		else if (e.keyCode == 32) fireKey = true;
		e.preventDefault();
	}

	function onKeyUp(e) {
		if (e.keyCode == 40) downKey = false;
		else if (e.keyCode == 38) upKey = false;
		else if (e.keyCode == 37) leftKey = false;
		else if (e.keyCode == 39) rightKey = false;
		else if (e.keyCode == 32) fireKey = false;
		e.preventDefault();
	}

	function onGameEvent(e) {
		console.log("gameEvent: " + e.id);

		// what type of event has occurred?
		switch (e.id){
			case "shapeKilled":
				background.adjustPoints(e.points);
				break;
			case "playerHit":
				background.setPower(e.power);
				break;
			case "playerKilled":
				background.setLives(e.lives);
				break;
			case "bigbossKilled":
				background.adjustPoints(e.points);
				break;
			


		}
	}

	function onPause(e) {
		createjs.Ticker.setPaused(true);
		createjs.Ticker.removeEventListener("tick", onTick);
	}

	function onResume(e) {
		createjs.Ticker.setPaused(false);
		createjs.Ticker.addEventListener("tick", onTick);
	}

	// game loop method
	function onTick() {

		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TESTING
		document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		// STEP I : KEYBOARD / GAMEPAD MONITORING
		if (leftKey) player.goLeft();
		else if (rightKey) player.goRight();
		else if (upKey) player.goUp();
		else if (downKey) player.goDown();
		else player.goIdle();

		if (fireKey) player.fire();
		else player.cease();

		// monitor gamepadManager for any buttons / joystick changes
		//gamepadManager.monitorMe(state);

		// STEP II : UPDATING STEP
		// scroll through all used objects in game and update them all
		var length = updateList.length;
		var target = null;
		for (var n=0; n<length; n++) {
			target = updateList[n];
			if (target !== null) target.updateMe();
		}
		// required routine updates
		waveFactory.updateMe();
		player.updateMe();
		background.updateMe();		

		// STEP III : RENDERING
		// update the stage!
		stage.update();
	}

})();
