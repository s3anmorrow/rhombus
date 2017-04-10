var Powerup = function(){
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var gameConstants = Globals.gameConstants;

    // private game variables
    var _this = this;
    var state = ShapeState.IDLE;
    var type = "";
    var frameCounter = 0;
    var frameRate = gameConstants.FRAME_RATE;
    var seconds = 0;
    // reference to Player object (the target!)
    var player = objectPool.playerPool[0];
    // get pickup's sprite
    var sprite = assetManager.getSprite("assets");
    // make sprite public for easy access
    this.sprite = sprite;	

    // ----------------------------------------------- private methods


    // ----------------------------------------------- public methods
    this.startMe = function(myType, startX, startY) {
        // powerup initialization
        type = myType;
        state = ShapeState.IDLE;
        sprite.gotoAndStop(type);
        frameCounter = 0;
        seconds = 0;
        // position sprite
        sprite.x = startX;
        sprite.y = startY;
        sprite.scaleX = 0.1;
        sprite.scaleY = 0.1;

        // tween powerup appearing
        createjs.Tween.get(sprite,{useTicks:true})
            .to({scaleX:1,scaleY:1}, 10)
            .call(function(){
                createjs.Sound.play("powerupAppear");
                // tween powerup wiggling back and forth
                createjs.Tween.get(sprite,{useTicks:true, loop:true})
                    .to({x:startX-5}, 8)
                    .to({x:startX}, 8);
            });
            
        stage.addChild(sprite);
    };

    this.stopMe = function() {
        createjs.Tween.removeTweens(sprite);
        // remove Shape
		sprite.stop();
		stage.removeChild(sprite);
		// return this object to the object pool
		objectPool.dispose(this);
    };

    this.resetMe = function() {

    };

    this.killMe = function() {
        state = ShapeState.KILLED;
        createjs.Tween.removeTweens(sprite);
        sprite.gotoAndPlay("powerupKill");
        sprite.addEventListener("animationend", function(e){
            _this.stopMe();
        });
    };

    this.updateMe = function() {
        if (state === ShapeState.KILLED) return;

        if ((frameCounter % frameRate) === 0) {
            seconds++;
            // if time is up then kill powerup (no collection!)
            if (seconds >= gameConstants.POWERUP_DURATION) {
                createjs.Sound.play("powerupRemove");
                this.killMe();
                return;
            } 
        }

        // kill powerup if player is killed
        if (player.getState() === PlayerState.KILLED) {
            this.killMe();
            return;
        }

        // has the player collided with the powerup?
        if (ndgmr.checkPixelCollision(sprite, player.sprite)) {
            var powerupData = gameConstants.POWERUPS[type];
            if (powerupData.category === "weapon") {
                // change weapontype of player
                var weaponType = powerupData.data;
                player.setWeapon(weaponType);
            } else if (powerupData.category === "power") {
                // player power boost granted
                player.setPower(player.getPower() + powerupData.data);
            } else if (powerupData.category === "shield") {
                // player shields granted - eanble for certain amount of time
                player.shieldMe(powerupData.data);
            } else if (powerupData.category === "life") {
                // player gets extra life
                player.setLives(player.getLives() + powerupData.data);
            }

            createjs.Sound.play("powerupPickup");
            this.killMe();
        }

        frameCounter++;
    };

};

var PowerupState = {
    "IDLE":0,
    "KILLED":1
};