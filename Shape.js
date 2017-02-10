var Shape = function(){
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;

    // private property variables
    var type = "";
    var shooter = false;
    
    // private game variables
    var _this = this;
    var state = ShapeState.ATTACKING;
    // control frequency of firing if shape is a shooter
    var fireFrequency = -1;
    var frameCounter = 0;
    // reference to Player object (the target!)
    var player = objectPool.playerPool[0];
    // get shape's sprite
    var sprite = assetManager.getSprite("assets");
    // make sprite public for easy access
    this.sprite = sprite;
    // the behaviour function that will be called in updateMe()
    var behaviour = null;

    // ----------------------------------------------- private methods

    // ----------------------------------------------- event handlers
    function onFiringFinished(e) {
        // firing animation is complete
        e.remove(); 
        sprite.gotoAndStop(type);
    }


    // ----------------------------------------------- public methods
    this.startMe = function(myType, myBehaviour, startX, startY, options) {
        type = myType;
        sprite.gotoAndStop(type);
        state = ShapeState.ATTACKING;
        behaviour = myBehaviour;
        frameCounter = 0;
        // random fire frequency
		fireFrequency = Globals.randomMe(1.5,3) * Globals.gameConstants.FRAME_RATE;
        // position sprite
        sprite.x = startX;
        sprite.y = startY;
        // add options object to sprite for setting up behaviour function
        if (options != undefined) {
            sprite.behaviour = options;
            sprite.behaviour.ready = false;
        }
        stage.addChild(sprite);
    }

    this.stopMe = function() {
        // remove Shape
		sprite.stop();
		sprite.y = -2000;
		// return this object to the object pool
		objectPool.dispose(_this);
		stage.removeChild(sprite);
    }

    this.resetMe = function() {
        group = [];
        behaviour = null;

        


    }

    this.fireMe = function() {
        // play firing animation
        sprite.addEventListener("animationend", onFiringFinished);
        sprite.gotoAndPlay(type + "Fire");

        // fire bullet!
        // get targetAngle of target relative to shape's sprite
        var targetAngle = Math.floor(180 + (Math.atan2(sprite.y - player.sprite.y, sprite.x - player.sprite.x) * 57.2957795));
        // release the bullet!
        var bullet = objectPool.getBullet();
        bullet.startMe(this, "bulletEnemy", 6, 2, sprite.x, sprite.y, targetAngle);
    }

    this.updateMe = function() {
        if (ShapeState.Killed) return;

        // Step I : collision detection
        // ???????????????

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
        
        // STEP II : Movement
        // run move behaviour function (result is whether behaviour should still active)
        var result = behaviour(sprite);
        // is shape off the stage?
        if (!result) this.stopMe();

        frameCounter++;
    };

};

var ShapeState = {
    "ATTACKING":0,
    "KILLED":1
};