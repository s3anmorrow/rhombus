// Rhombus!
// Sean Morrow
// Jan 2017
(function() {
	"use strict";

	// TODO: powerups and new guns (invisible)
	// TODO: add invicibility to player
	// TODO: add shield feature	
	
	// TODO: add aircraft carrier release boss (Turret that releases shapes instead of bullets!)
	// TODO: implement lookup tables for Trig
	// TODO: check all getBounds() references - processor heavy (MoveFunctions)
	// TODO: add loading screen while all the JS loads before preload kicks in

	// game variables
	var stage = null;
	var canvas = null;
	var downKey = false;
	var upKey = false;
	var leftKey = false;
	var rightKey = false;
	var fireKey = false;

	// array of all game objects currently in use and thus need update() called in ticker
	var updateList = null;
	// game objects
	var screenManager = null;
	var assetManager = null;
	var gamepadManager = null;
	var objectPool = null;
	var waveFactory = null;
	var player = null;

	// entry point
	window.addEventListener("load", onInit);

	// ------------------------------------------------------------ private methods
	function startGame() {
		// game event listener for all events that control gameplay
		stage.addEventListener("gameEvent", onGameEvent, true);
		// initialization
		screenManager.setScreen("gameScreen");



		// start the waves
		waveFactory.startMe();

		if (player == null) player = objectPool.getPlayer();
		player.resetMe();
		player.startMe();

		// !!!!!!!!!! TESTING
		player.setWeapon("spread");
		//screenManager.game.setAmmo(10);
		// !!!!!!!!!!!!!!!!!!

		
		// change stage of game
		Globals.gameState = GameStates.PLAYING;

		console.log(">> game started");
	}

	function stopGame(win) {
		// kill game event listener
		stage.removeEventListener("gameEvent", onGameEvent, true);

		Globals.gameState = GameStates.GAMEOVER;
	}

	function resetGame() {
		// scroll through all used elements and return them to the objectPool (with exceptions)
		var length = updateList.length;
		var object = null;
		for (var n=0; n<length; n++) {
			object = updateList[n];
			// remove everything except the clouds
			if (object !== null) object.stopMe();
		}

		Globals.gameState = GameStates.INTRO;
	}

	// ------------------------------------------------------------ event handlers
	function onInit() {
		console.log(">> initializing");
		Globals.gameState = GameStates.INITIALIZE;

		// get reference to canvas
		canvas = document.getElementById("stage");
		// set canvas to as wide/high as the browser window
		canvas.width = 800;
		canvas.height = 800;
		// create stage object
		stage = new createjs.Stage(canvas);
		// grant global access to stage object
		Globals.stage = stage;

		// construct assetManager and load assets
		assetManager = new AssetManager(stage);
		Globals.assetManager = assetManager;
		assetManager.loadAssets(gameManifest);
		stage.addEventListener("onAssetLoaded", onAssetLoaded);
		stage.addEventListener("onAllAssetsLoaded", onSetup);

		// construct gamepadManager
		gamepadManager = new GamepadManager();
		gamepadManager.setup(gamepadManifest);
		Globals.gamepadManager = gamepadManager;

		// listen for loss of focus on browser and pause game
		window.addEventListener("blur", onPause);
        window.addEventListener("focus", onResume);

		// setup listener for ticker to actually update the stage
		createjs.Ticker.useRAF = true;
		// set framerate
		createjs.Ticker.setFPS(Globals.gameConstants.FRAME_RATE);
		createjs.Ticker.addEventListener("tick", onTick);
	}

	function onAssetLoaded(e) {
		//console.log("test: " + e.id + " : " + assetManager.getProgress());
		// check if UI spritesheet has loaded completely - if so display loading screen
		if (e.id === "ui") {
			// display preloading message
			screenManager = new ScreenManager();
			screenManager.startBackground();
			Globals.gameState = GameStates.SETUP;
		}

		if (screenManager !== null) screenManager.load.updateProgress();
	}

	function onSetup() {
		console.log(">> setup");
		// kill event listeners
		stage.removeEventListener("onAssetLoaded", onAssetLoaded);
		stage.removeEventListener("onAllAssetsLoaded", onSetup);
		
		// construct object pool
		objectPool = new ObjectPool(stage, assetManager);
		// grant global access to object pool
		Globals.objectPool = objectPool;
		objectPool.init();
		// get reference to updateList from objectPool object
		updateList = objectPool.getUpdateList();
		
		// construct WaveFactory to control enemy waves
		waveFactory = new WaveFactory();

		// setup event listeners for keyboard keys
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		// now that all assets are loaded - start screenManager
		screenManager.startMe();

		//Globals.gameState = GameStates.HIGHSCORE;
		//screenManager.setScreen("highScoreScreen");

		// set screen to introduction
		screenManager.setScreen("introScreen");
		Globals.gameState = GameStates.INTRO;
		console.log(">> intro gameScreen ready");

		// ???????????????? temporary start
		startGame();

	}

	function onKeyDown(e) {
		if (Globals.gameState == GameStates.PLAYING) {
			if (e.keyCode == 40) downKey = true;
			else if (e.keyCode == 38) upKey = true;
			else if (e.keyCode == 37) leftKey = true;
			else if (e.keyCode == 39) rightKey = true;
			else if (e.keyCode == 32) fireKey = true;
		}
		e.preventDefault();
	}

	function onKeyUp(e) {
		if (Globals.gameState == GameStates.INTRO) {
			if (e.keyCode == 32) startGame();
		} else if (Globals.gameState == GameStates.PLAYING) {
			if (e.keyCode == 40) downKey = false;
			else if (e.keyCode == 38) upKey = false;
			else if (e.keyCode == 37) leftKey = false;
			else if (e.keyCode == 39) rightKey = false;
			else if (e.keyCode == 32) fireKey = false;
		} else if (Globals.gameState == GameStates.HIGHSCORE) {			
			if (e.keyCode == 40) screenManager.highScore.moveSelector("down");
			else if (e.keyCode == 38) screenManager.highScore.moveSelector("up");
			else if (e.keyCode == 37) screenManager.highScore.moveSelector("left");
			else if (e.keyCode == 39) screenManager.highScore.moveSelector("right");
			else if (e.keyCode == 32) screenManager.highScore.selectInitial();
		} else if (Globals.gameState == GameStates.GAMEOVER) {
			// !!!!!!!!!!!!!!! check if highscore
			resetGame();
			if (e.keyCode == 32) screenManager.setScreen("introScreen");
		}
		e.preventDefault();
	}

	function onGameEvent(e) {
		console.log("gameEvent: " + e.id);

		// what type of event has occurred?
		switch (e.id){
			case "shapeKilled":
				screenManager.game.adjustPoints(e.points);
				break;
			case "playerHit":
				screenManager.game.setPower(e.power);
				break;
			case "playerKilled":
				screenManager.game.setLives(e.lives);
				break;
			case "playerFired":
				screenManager.game.setAmmo(e.ammo, e.weaponType);
				break;				
			case "bigbossKilled":
				screenManager.game.adjustPoints(e.points);
				break;
			case "gameOver":
				Globals.gameState = GameStates.GAMEOVER;
				screenManager.setScreen("gameOverScreen");
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

		if (Globals.gameState === GameStates.PLAYING) {
			// STEP I : KEYBOARD / GAMEPAD MONITORING
			if (leftKey) player.goLeft();
			else if (rightKey) player.goRight();
			else if (upKey) player.goUp();
			else if (downKey) player.goDown();
			else player.goIdle();

			if (fireKey) player.fire();
			else player.cease();

			// monitor gamepadManager for any buttons / joystick changes
			//gamepadManager.monitorMe(Globals.gameState);

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
		}
		// screenManager needs updating for all gameGameStates except initalization
		if (Globals.gameState !== GameStates.INITIALIZE) screenManager.updateMe();		

		// STEP III : RENDERING
		// update the stage!
		stage.update();
	}

})();

var GameStates = {
	INITIALIZE:-2,
	SETUP:-1,
	INTRO:0,
	PLAYING:1,
	HIGHSCORE:2,
	GAMEOVER:3
};
