var Bigboss = function(){
    // custom events
    var killedEvent = new createjs.Event("gameEvent", true);
    killedEvent.id = "bigbossKilled";
    killedEvent.points = 0;

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var gameConstants = Globals.gameConstants;

    // property variables
    var state = ShapeState.ATTACKING;

    // private game variables
    var _this = this;
    var type = "";
    var points = 0;
    var turrets = [];
    var frameCounter = 0;

    // the moveFunction that will be called in updateMe()
    var moveFunction = null;
    
    // reference to Player object (the target!)
    var player = objectPool.playerPool[0];

    // get shape's sprite
    var sprite = new createjs.Container();
    var bodySprite = assetManager.getSprite("assets");

    // make sprite public for easy access
    this.sprite = sprite;

    // ----------------------------------------------- get/set methods
    this.getState = function() {
        return state;
    };

    // ----------------------------------------------- event handlers


    // ----------------------------------------------- public methods
    this.startMe = function(myType, startX, startY, myTurretData, myMovement) {
        // shape initialization
        frameCounter = 0;
        //points = gameConstants.SHAPE_POINTS[myType];
        //killedEvent.points = points;
        state = ShapeState.ATTACKING;

        // store type of Shape and jump to frame
        type = myType;
        bodySprite.gotoAndStop(type);
        sprite.addChild(bodySprite);

        // position sprite
        sprite.x = startX;
        sprite.y = startY;
        sprite.rotation = 0;

        // add all turrets to big boss' body
        turrets = [];
        for (var n=0; n<myTurretData.length; n++) {
            var turretData = myTurretData[n];
            // get turret sprite and setup
            var turret = objectPool.getTurret();
            turret.startMe(turretData.type, turretData.x, turretData.y, turretData.hp, turretData.freq, this);
            // push turret into array
            turrets.push(turret);
        }

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
        // TODO: clear out all turrets
        // ???????????
        // remove event listener of turret!


        // remove Shape
		sprite.stop();
		stage.removeChild(sprite);    
		// return this object to the object pool
		objectPool.dispose(this);
    };

    this.resetMe = function() {
        moveFunction = null;

        


    };

    this.killMe = function(earnPoints) {
        //state = ShapeState.KILLED;
        
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

    this.updateMe = function() {
        if (state == ShapeState.KILLED) return;

        // TODO: add bounce back when player collides with shape

        /*
        // Step I : collision detection
        // has the shape collided with the player?
        if ((state != ShapeState.KILLED) && (player.getState() !== PlayerState.KILLED) && (player.getState() !== PlayerState.HIT) && (ndgmr.checkPixelCollision(bodySprite, player.sprite, 0, true))) {
            player.hitMe();
            // kill shape with no points
            //this.killMe(false);
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