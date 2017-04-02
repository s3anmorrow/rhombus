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
        // position sprite
        sprite.x = startX;
        sprite.y = startY;
        sprite.alpha = 1;
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
        createjs.Tween.removeTweens(sprite);
        sprite.gotoAndPlay("powerupKill");
        sprite.addEventListener("animationend", function(e){
            _this.stopMe();
        });
    };

    this.updateMe = function() {
        // make powerup fade away
        sprite.alpha -= 0.005;
        // make powerup slowly drop
        //sprite.y+=2;

        if (sprite.alpha <= 0) {
            this.stopMe();
            return;
        }

        // has the player collided with the powerup?
        if ((state != ShapeState.KILLED) && (ndgmr.checkPixelCollision(sprite, player.sprite, 0, true))) {
            state = ShapeState.KILLED;
            sprite.alpha = 1;

            var powerupData = gameConstants.POWERUPS[type];
            if (powerupData.category == "weapon") {
                // change weapontype of player
                var weaponType = powerupData.data;
                player.setWeapon(weaponType);
            } else if (powerupData.category == "power") {
                // player power boost granted
                player.setPower(player.getPower() + powerupData.data);
            } else if (powerupData.category == "shield") {
                // player shields granted - eanble for certain amount of time
                player.shieldMe(powerupData.data);
            } else if (powerupData.category == "life") {
                // player gets extra life
                player.setLives(player.getLives() + powerupData.data);
            }

            createjs.Sound.play("powerupPickup");
            this.killMe();
        }
    };

};

var PowerupState = {
    "IDLE":0,
    "KILLED":1
};