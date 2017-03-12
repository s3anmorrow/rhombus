var Shape = function(){
    // custom events
    var killedEvent = new createjs.Event("gameEvent", true);
    killedEvent.id = "shapeKilled";
    killedEvent.points = 0;

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var gameConstants = Globals.gameConstants;

    // private property variables
    var type = "";
    
    // private game variables
    var _this = this;
    var state = ShapeState.ATTACKING;
    var points = 0;    
    var hitPoints = 0;
    var halfHitPoints = 0;
    var powerupType = "";
    // control frequency of firing if shape is a shooter
    var shooter = false;
    var shootFrequency = -1;
    var bulletType = "";
    var frameCounter = 0;
    // reference to Player object (the target!)
    var player = objectPool.playerPool[0];
    // get shape's sprite
    var sprite = assetManager.getSprite("assets");
    // make sprite public for easy access
    this.sprite = sprite;
    // the moveFunction that will be called in updateMe()
    var moveFunction = null;

    // ----------------------------------------------- private methods
    this.getState = function() {
        return state;
    };

    // ----------------------------------------------- public methods
    this.startMe = function(myType, startX, startY, myPowerupType, myShootData, myMovement) {
        // shape initialization
        frameCounter = 0;
        type = myType;
        points = gameConstants.SHAPES[type].points;
        killedEvent.points = points;
        state = ShapeState.ATTACKING;
        hitPoints = gameConstants.SHAPES[type].hp;
        halfHitPoints = hitPoints/2;
        powerupType = myPowerupType;

        // setup shape to be a shooter or not
        shooter = false;
        if (myShootData !== null) {
            shooter = true;
            shootFrequency = myShootData.freq;
            if (myShootData.bulletType !== undefined) bulletType = myShootData.bulletType;
            else bulletType = "bullet1";
        }

        // jump to frame
        sprite.gotoAndStop(type);

        // position sprite
        sprite.x = startX;
        sprite.y = startY;
        sprite.rotation = 0;
        // get reference to this shape's moveFunction
        moveFunction = MoveFunctions[myMovement.type];
        // add movement options object to sprite for setting up movement function
        if (myMovement !== undefined) {
            sprite.moveData = myMovement;
            // attach reference to player object - for kamikaze move function
            sprite.moveData.player = player;
            sprite.moveData.ready = false;
        }
        stage.addChild(sprite);
    };

    this.stopMe = function() {
        // remove Shape
		sprite.stop();
		stage.removeChild(sprite);    
		// return this object to the object pool
		objectPool.dispose(this);
    };

    this.resetMe = function() {
        moveFunction = null;

        


    };

    this.killMe = function(damage, pointsAwarded) {
        // remove hitpoints according to bullet damage
        hitPoints-=damage;

        // show damage if not done already?
        if ((hitPoints <= halfHitPoints) && (sprite.currentAnimation.indexOf("Damage") == -1)) {
            type = type + "Damage";
            sprite.gotoAndStop(type);
        }

        if (hitPoints <= 0) {
            state = ShapeState.KILLED;
            sprite.rotation = 0;
            // position explosion sprite
            if ((pointsAwarded === undefined) || (pointsAwarded === true)) {
                sprite.gotoAndPlay("explosion" + points);
                killedEvent.target = null;
                sprite.dispatchEvent(killedEvent);
            } else {
                sprite.gotoAndPlay("explosionNoPoints");
            }
            sprite.addEventListener("animationend",function(e){
                e.remove();
                if (powerupType !== "") {
                    // release the powerup
                    var powerup = objectPool.getPowerup();
                    powerup.startMe(powerupType, sprite.x, sprite.y);
                }
                _this.stopMe();
            });
        } else {
            // play damage explosion
            if (sprite.currentAnimation != (type + "Hit")) sprite.gotoAndPlay(type + "Hit");
            sprite.addEventListener("animationend", function(e) {
                e.remove();
                sprite.gotoAndStop(type);
            });
        }
    };

    this.fireMe = function() {
        // play firing animation
        sprite.gotoAndPlay(type + "Fire");
        sprite.addEventListener("animationend", function(e){
            // firing animation is complete
            e.remove(); 
            sprite.gotoAndStop(type);
        });

        // fire bullet!
        // get targetAngle of target relative to shape's sprite
        var targetAngle = Math.floor(180 + (Math.atan2(sprite.y - player.sprite.y, sprite.x - player.sprite.x) * 57.2957795));
        // release the bullet!
        var bullet = objectPool.getBullet();
        bullet.startMe(bulletType, this, bulletType, 6, 2, false, sprite.x, sprite.y, targetAngle);
    };

    this.updateMe = function() {
        if (state == ShapeState.KILLED) return;

        // Step I : collision detection
        // has the shape collided with the player?
        if ((state != ShapeState.KILLED) && (player.getState() !== PlayerState.KILLED) && (ndgmr.checkPixelCollision(sprite, player.sprite, 0, true))) {
            player.hitMe(hitPoints);
            // kill shape with no points and no powerups
            powerupType = "";
            this.killMe(hitPoints, false);
        }

        // Step II : Attacking
        // should the shape take a shot?
        if (shooter) {  
			if (frameCounter >= shootFrequency) {              
                if (player.getState() != PlayerState.KILLED) {
                    this.fireMe();
                    frameCounter = 0;
                }
            }
        }
        
        // STEP II : Movement
        // run move movement function (result is whether movement should still be active)
        var result = moveFunction(sprite);
        // is shape off the stage?
        if (!result) this.stopMe();

        frameCounter++;
    };

};

var ShapeState = {
    "ATTACKING":0,
    "KILLED":1
};