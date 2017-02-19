var Bigboss = function(){
    // custom events
    var killedEvent = new createjs.Event("gameEvent", true);
    killedEvent.id = "bigBossKilled";
    killedEvent.points = 0;

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var gameConstants = Globals.gameConstants;

    // property variables
    var type = "";
    var points = 0;
    var turrets = null;
    var state = BossState.ATTACKING;

    // private game variables
    var _this = this;
    // the moveFunction that will be called in updateMe()
    var moveFunction = null;
    var frameCounter = 0;
    // reference to Player object (the target!)
    var player = objectPool.playerPool[0];

    // get shape's sprite
    var sprite = assetManager.getSprite("assets");

    stage.addChild(sprite);

    // make sprite public for easy access
    this.sprite = sprite;

    // ----------------------------------------------- private methods
    this.getState = function() {
        return state;
    };

    // ----------------------------------------------- event handlers
    /*
    function onFiringFinished(e) {
        // firing animation is complete
        e.remove(); 
        sprite.gotoAndStop(type);
    }
    */


    // ----------------------------------------------- public methods
    this.startMe = function(myType, startX, startY, myShootData, myMovement) {
        // shape initialization
        frameCounter = 0;
        //points = gameConstants.SHAPE_POINTS[myType];
        //killedEvent.points = points;
        state = BossState.ATTACKING;

        /*
        // setup shape to be a shooter or not
        shooter = false;
        if (myShootData !== null) {
            shooter = true;
            shootFrequency = myShootData.freq;
        }
        */

        // store type of Shape and jump to frame
        type = myType;
        sprite.gotoAndStop(type);

        // position sprite
        sprite.x = startX;
        sprite.y = startY;
        sprite.rotation = 0;

        /*
        var turrentPositions = value;

        // add all turrets to big boss
        for (var n=0; n<turrentPositions.length; n++) {
            var position = turrentPositions[n];

            console.log(moveFunction);

            var turret = objectPool.getShape();
            turret.startMe("circle", moveFunction, position.x, position.y);
            turret.setShooter(true);
        }
        */

        // get reference to this shape's moveFunction
        moveFunction = MoveFunctions[myMovement.type];
        // add movement options object to sprite for setting up movement function
        if (myMovement !== undefined) {
            sprite.moveData = myMovement;
            sprite.moveData.ready = false;
        }
        stage.addChild(sprite);
    };

    this.stopMe = function() {
        // remove Shape
		sprite.stop();
		sprite.y = -2000;
		stage.removeChild(sprite);    
		// return this object to the object pool
		objectPool.dispose(this);
    };

    this.resetMe = function() {
        //group = [];
        moveFunction = null;

        


    };

    this.killMe = function(earnPoints) {
        state = BossState.KILLED;
        
        /*
        sprite.rotation = 0;
        // position sprite and bitmaptext
        if ((earnPoints === undefined) || (earnPoints === true)) {
            sprite.gotoAndPlay("explosion" + points);
            killedEvent.target = null;
            sprite.dispatchEvent(killedEvent);
        } else {
            sprite.gotoAndPlay("explosionNoPoints");
        }
        sprite.addEventListener("animationend",function(e){
            e.remove();
            _this.stopMe();
        });
        */

        //stage.removeChild(sprite); 
    };

    this.fireMe = function() {
        /*
        // play firing animation
        sprite.addEventListener("animationend", onFiringFinished);
        sprite.gotoAndPlay(type + "Fire");

        // fire bullet!
        // get targetAngle of target relative to shape's sprite
        var targetAngle = Math.floor(180 + (Math.atan2(sprite.y - player.sprite.y, sprite.x - player.sprite.x) * 57.2957795));
        // release the bullet!
        var bullet = objectPool.getBullet();
        bullet.startMe(this, "bulletEnemy", 6, 2, sprite.x, sprite.y, targetAngle);
        */
    };

    this.updateMe = function() {
        if (state == BossState.KILLED) return;

        // Step I : collision detection
        // has the shape collided with the player?
        if ((state != BossState.KILLED) && (player.getState() !== PlayerState.KILLED) && (player.getState() !== PlayerState.HIT) && (ndgmr.checkPixelCollision(sprite, player.sprite, 0, true))) {
            player.hitMe();
            // kill shape with no points
            //this.killMe(false);
        }

        /*
        // Step II : Attacking
        // should the shape take a shot?
        if ((shooter) && (sprite.y > 300)) {  
            // can I fire on target now?
			if (frameCounter >= fireFrequency) {              
                if (player.getState() != PlayerState.KILLED) {
                    this.fireMe();
                    frameCounter = 0;
                }
            }
        }
        */
        
        // STEP II : Movement
        // run move movement function (result is whether movement should still be active)
        var result = moveFunction(sprite);
        // is shape off the stage?
        if (!result) this.stopMe();

        frameCounter++;
    };

};

var BossState = {
    "ATTACKING":0,
    "KILLED":1
};