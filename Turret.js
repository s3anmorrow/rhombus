var Turret = function(){
    // custom events
    var killedEvent = new createjs.Event("gameEvent", true);
    killedEvent.id = "turretKilled";
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
    var hitPoints = 0;
    var halfHitPoints = 0;
    var owner = null;
    var shootFreq = 0;
    var bulletType = "";
    var frameCounter = 0;
    // reference to Player object (the target!)
    var player = objectPool.playerPool[0];    
    // get shape's sprite
    var sprite = assetManager.getSprite("assets");

    // make sprite public for easy access
    this.sprite = sprite;

    // ----------------------------------------------- get/set methods
    this.getState = function() {
        return state;
    };

    // ----------------------------------------------- event handlers

    // ----------------------------------------------- public methods
    this.startMe = function(myType, startX, startY, freq, myBulletType, myOwner) {
        // shape initialization
        frameCounter = 0;
        type = myType;
        state = ShapeState.ATTACKING;
        owner = myOwner;
        shootFreq = freq;
        hitPoints = gameConstants.SHAPES[type].hp;
        halfHitPoints = hitPoints/2;
        bulletType = myBulletType;

        // jump to frame
        sprite.gotoAndStop(type);

        // position sprite
        sprite.x = startX;
        sprite.y = startY;
        sprite.rotation = 0;

        // add turret to big boss' body
        owner.sprite.addChild(sprite);
    };

    this.stopMe = function() {
        // remove Shape
		sprite.stop();
		owner.sprite.removeChild(sprite);    
		// return this object to the object pool
		objectPool.dispose(this);
    };

    this.resetMe = function() {

    };

    this.killMe = function(damage) {
        // remove hitpoints according to bullet damage
        hitPoints-=damage;

        // show damage if not done already?
        if ((hitPoints <= halfHitPoints) && (sprite.currentAnimation.indexOf("Damage") == -1)) {
            type = type + "Damage";
            sprite.gotoAndStop(type);
        }

        if (hitPoints <= 0) {
            state = ShapeState.KILLED;
            sprite.gotoAndPlay("explosionNoPoints");
            sprite.addEventListener("animationend",function(e){
                e.remove();
                _this.stopMe();
                // a turret has been destroyed - notify its owner
                owner.turretKilled();
            });
        } else {
            // play damage explosion
            if (sprite.currentAnimation != (type + "Hit")) sprite.gotoAndPlay(type + "Hit");
            sprite.addEventListener("animationend", function(e) {
                e.remove();
                sprite.gotoAndStop(type);
            });
        }
    }

    this.fireMe = function() {
        // play firing animation
        sprite.gotoAndPlay(type + "Fire");
        sprite.addEventListener("animationend",function(e){
            e.remove();
            sprite.gotoAndStop(type);
        });

        // switch coords to stage from container of bigboss
        var turretPoint = owner.sprite.localToGlobal(sprite.x,sprite.y);
        if (bulletType.indexOf("bullet") == -1) {
            // release a shape instead of a bullet
            var shootData = null;
            // drop shape into the game
            var shape = objectPool.getShape();
            // start the shape and pass along required data
            shape.startMe(bulletType, 
                          turretPoint.x,turretPoint.y,"", 
                          {index:0, freq:100, bulletType:"bullet1"}, 
                          {type:"kamikaze", speed:2});


        } else {
            // fire regular bullet!
            // get targetAngle of target relative to shape's sprite
            var targetAngle = Math.floor(180 + (Math.atan2(turretPoint.y - player.sprite.y, turretPoint.x - player.sprite.x) * 57.2957795));

            // release the bullet!
            var bullet = objectPool.getBullet();
            bullet.startMe(bulletType, owner, bulletType, 6, 2, false, turretPoint.x, turretPoint.y, targetAngle);
        }
    };

    this.updateMe = function() {
        if (state == ShapeState.KILLED) return;

        /*
        // Step I : collision detection
        // has the shape collided with the player?
        if ((state != ShapeState.KILLED) && (player.getState() !== PlayerState.KILLED) && (player.getState() !== PlayerState.HIT) && (ndgmr.checkPixelCollision(sprite, player.sprite, 0, true))) {
            player.hitMe();
            // kill shape with no points
            //this.killMe(false);
        }
        */

        // Step II : Attacking
        if (frameCounter >= shootFreq) {
            if (player.getState() != PlayerState.KILLED) {    
                this.fireMe();
                frameCounter = 0;
            }
        }

        frameCounter++;
    };

};