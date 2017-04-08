// Rhombus!
// Sean Morrow
// Jan 2017
(function() {
	"use strict";
	
	// TODO: way for game to finish with rhombus big boss
	// TODO: level design 18, 19, 20
	// TODO: collision detection not always working (solid shapes?)
	// TODO: bug with cloaking shape and collision

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
		// initialization
		downKey = false;
		upKey = false;
		leftKey = false;
		rightKey = false;
		fireKey = false;
		// game event listener for all events that control gameplay
		stage.addEventListener("gameEvent", onGameEvent);
		// initialization
		screenManager.setScreen("gameScreen");
		// start the waves
		waveFactory.startMe();

		// get player and start
		player = objectPool.getPlayer();
		player.startMe();
		
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
		// scroll through all used elements and stop (return to objectPool)
		var length = updateList.length;
		var object = null;
		for (var n=0; n<length; n++) {
			object = updateList[n];
			if (object !== null) object.stopMe();
		}
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

		// set screen to introduction
		screenManager.setScreen("introScreen");
		Globals.gameState = GameStates.INTRO;
		console.log(">> intro gameScreen ready");

		//createjs.Sound.play("music","none",0,0,-1);

		// ???????????????? temporary start
		//startGame();
		/*
		stage.addEventListener("gameEvent", onGameEvent);
		Globals.gameState = GameStates.HIGHSCORE;
		screenManager.setScreen("highScoreScreen");
		*/
	}

	function onKeyDown(e) {
		if (Globals.gameState === GameStates.PLAYING) {
			if ((e.keyCode === 40) || (e.keyCode === 83)) downKey = true;
			else if ((e.keyCode === 38) || (e.keyCode === 87)) upKey = true;
			else if ((e.keyCode === 37) || (e.keyCode === 65)) leftKey = true;
			else if ((e.keyCode === 39) || (e.keyCode === 68)) rightKey = true;
			else if (e.keyCode === 32) fireKey = true;
		}
		e.preventDefault();
	}

	function onKeyUp(e) {
		if (Globals.gameState === GameStates.INTRO) {
			if (e.keyCode === 32) startGame();
		} else if (Globals.gameState === GameStates.PLAYING) {
			if ((e.keyCode === 40) || (e.keyCode === 83)) downKey = false;
			else if ((e.keyCode === 38) || (e.keyCode === 87)) upKey = false;
			else if ((e.keyCode === 37) || (e.keyCode === 65)) leftKey = false;
			else if ((e.keyCode === 39) || (e.keyCode === 68)) rightKey = false;
			else if (e.keyCode === 32) fireKey = false;
			else if (e.keyCode === 16) player.flipMe();
		} else if (Globals.gameState === GameStates.HIGHSCORE) {			
			if (e.keyCode === 40) screenManager.highScore.moveSelector("down");
			else if (e.keyCode === 38) screenManager.highScore.moveSelector("up");
			else if (e.keyCode === 37) screenManager.highScore.moveSelector("left");
			else if (e.keyCode === 39) screenManager.highScore.moveSelector("right");
			else if (e.keyCode === 32) screenManager.highScore.selectInitial();
		} else if (Globals.gameState === GameStates.GAMEOVER) {
			if (e.keyCode === 32) {
				// show highScoreScreen to check for high score
				Globals.gameState = GameStates.HIGHSCORE;
				screenManager.setScreen("highScoreScreen");
				resetGame();
			}
		}
		e.preventDefault();
	}

	function onGameEvent(e) {
		//console.log("gameEvent: " + e.id);

		// what type of event has occurred?
		switch (e.id){
			case "pointsChange":
				screenManager.game.adjustPoints(e.points);
				break;
			case "playerChangeDir":
				screenManager.setDirection(e.dir);
				break;
			case "playerPowerChange":
				screenManager.game.setPower(e.power);
				break;
			case "playerLivesChange":
				screenManager.game.setLives(e.lives);
				break;
			case "playerAmmoChange":
				screenManager.game.setAmmo(e.ammo, e.weaponType);
				break;				
			case "bigbossKilled":
				screenManager.game.adjustPoints(e.points);
				break;
			case "levelChange":
				screenManager.game.setLevelName(e.levelTitle);
				break;
			case "gameOver":
				//Globals.gameState = GameStates.GAMEOVER;
				screenManager.setScreen("gameOverScreen");
				break;
			case "highScoreComplete":
				Globals.gameState = GameStates.INTRO;
				screenManager.setScreen("introScreen");
				break;	
			case "newHighScore":
				screenManager.game.setHighScore(e.score);
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

			// STEP II : UPDATING STEP
			// scroll through all used objects in game and update them all
			var length = updateList.length;
			var target = null;
			for (var n=0; n<length; n++) {
				target = updateList[n];
				if (target !== null) {
					target.updateMe();
				}
			}
			// required routine updates
			waveFactory.updateMe();
		}
		// screenManager needs updating for all gameGameStates except initalization (background shapes)
		if (Globals.gameState !== GameStates.INITIALIZE) screenManager.updateMe();		

		// monitor gamepadManager for any buttons / joystick changes
		gamepadManager.monitorMe(Globals.gameState);

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
