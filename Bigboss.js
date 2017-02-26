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
    var turretsActive = 0;
    var turretsTotal = 0;
    var frameCounter = 0;

    // the moveFunction that will be called in updateMe()
    var moveFunction = null;
    
    // reference to Player object (the target!)
    var player = objectPool.playerPool[0];

    // get shape's sprite
    var sprite = new createjs.Container();
    var bodySprite = assetManager.getSprite("assets");
    var explosionSprite = assetManager.getSprite("assets");

    // make sprite public for easy access
    this.sprite = sprite;

    // ----------------------------------------------- get/set methods
    this.getState = function() {
        return state;
    };

    // ----------------------------------------------- public methods
    this.startMe = function(myType, startX, startY, myPoints, myTurretData, myMovement) {
        // shape initialization
        frameCounter = 0;
        points = myPoints;
        state = ShapeState.ATTACKING;
        // get explosion sprite ready to play
        explosionSprite.gotoAndStop("bossExplosion" + points);

        // store type of Shape and jump to frame
        type = myType;
        bodySprite.gotoAndPlay(type);
        sprite.addChild(bodySprite);

        // position sprite
        sprite.x = startX;
        sprite.y = startY;
        sprite.rotation = 0;

        // add all turrets to big boss' body
        turrets = [];
        turretsTotal = myTurretData.length;
        turretsActive = turretsTotal;
        for (var n=0; n<turretsTotal; n++) {
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
        // clear out all turrets
        for (var n=0; n<turrets.length; n++) turrets[n].stopMe();
        turrets = null;

        // remove Shape
		bodySprite.stop();
        explosionSprite.stop();
        sprite.removeChild(explosionSprite);
        stage.removeChild(sprite);

		// return this object to the object pool
		objectPool.dispose(this);
    };

    this.resetMe = function() {
        moveFunction = null;

        


    };

    this.turretKilled = function(){
        turretsActive--;
        if (turretsActive <= 0) {
            this.killMe();
        }
    }

    this.killMe = function() {
        state = ShapeState.KILLED;

        // position explosion sprite overtop of bigboss
        explosionSprite.x = bodySprite.x;
        explosionSprite.y = bodySprite.y;
        // adjust rotation so explosion points text is not rotated
        explosionSprite.rotation = 360 - sprite.rotation;
        
        //sprite.removeChild(bodySprite);
        bodySprite.gotoAndPlay(type + "Kill");
        bodySprite.addEventListener("animationend",function(e){
            e.remove();
            bodySprite.stop();
        });

        // add explosion to sprite
        sprite.addChild(explosionSprite);
        explosionSprite.play();
        explosionSprite.addEventListener("animationend",function(e){
            e.remove();
            // dispatch custom event that big boss is killed
            killedEvent.target = null;
            killedEvent.points = points;
            sprite.dispatchEvent(killedEvent);
            // shut down this game object
            _this.stopMe();
        });
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