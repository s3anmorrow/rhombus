var Shape = function(){
    // custom events
    var pointsEvent = new createjs.Event("gameEvent", true);
    pointsEvent.id = "pointsChange";
    pointsEvent.points = 0;

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var gameConstants = Globals.gameConstants;
    var randomMe = Globals.randomMe;

    // private property variables
    var type = "";
    
    // private game variables
    var _this = this;
    var state = ShapeState.ATTACKING;
    var points = 0;    
    var hitPoints = 0;
    var fullHitPoints = 0;
    var halfHitPoints = 0;
    var powerupType = "";
    // control frequency of firing if shape is a shooter
    var shooter = false;
    var shootFrequency = -1;
    var bulletType = "";
    var frameCounter = 0;
    var accuracy = 0;
    // reference to Player object (the target!)
    var player = objectPool.playerPool[0];
    // get shape's sprite
    var sprite = assetManager.getSprite("assets");
    // make sprite public for easy access
    this.sprite = sprite;
    this.radius = 0;
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
        accuracy = gameConstants.SHAPES[type].accuracy;
        this.radius = gameConstants.SHAPES[type].radius;
        pointsEvent.points = points;
        state = ShapeState.ATTACKING;
        fullHitPoints = gameConstants.SHAPES[type].hp;
        hitPoints = fullHitPoints;
        halfHitPoints = fullHitPoints/2;
        powerupType = myPowerupType;
        createjs.Tween.removeTweens(sprite);

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
        sprite.alpha = 1;
        // get reference to this shape's moveFunction
        moveFunction = MoveFunctions[myMovement.type];
        // add movement options object to sprite for setting up movement function
        if (myMovement !== undefined) {
            sprite.moveData = myMovement;
            // attach reference to player object - for kamikaze move function
            sprite.moveData.player = player;
            sprite.moveData.ready = false;
            // getBounds() is expensive - setBounds so it is cached all subsequent getBounds() calls
            var bounds = sprite.getBounds();
            sprite.moveData.width = bounds.width;
            sprite.moveData.height = bounds.height;
        }
        stage.addChild(sprite);
    };

    this.stopMe = function() {
        // remove Shape
		sprite.stop();
        createjs.Tween.removeTweens(sprite);
		stage.removeChild(sprite);    
		// return this object to the object pool
		objectPool.dispose(this);
    };

    this.killMe = function(damage, pointsAwarded) {
        // remove hitpoints according to bullet damage
        hitPoints-=damage;

        // show damage if not done already?
        if ((hitPoints <= halfHitPoints) && (sprite.currentAnimation.indexOf("Damage") === -1)) {
            type = type + "Damage";
            sprite.gotoAndStop(type);
        }

        if (hitPoints <= 0) {
            state = ShapeState.KILLED;
            // position explosion sprite
            if ((pointsAwarded === undefined) || (pointsAwarded === true)) {
                sprite.rotation = 0;
                sprite.gotoAndPlay("explosion" + points);
                createjs.Sound.play("explosion1");
                pointsEvent.target = null;
                stage.dispatchEvent(pointsEvent);
            } else {
                sprite.gotoAndPlay("explosionNoPoints");
                createjs.Sound.play("explosion1");
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
            // shape was destroyed
            return true;
        } else {
            // play damage explosion
            if (sprite.currentAnimation != (type + "Hit")) sprite.gotoAndPlay(type + "Hit");
            sprite.addEventListener("animationend", function(e) {
                e.remove();
                sprite.gotoAndStop(type);
            });
            createjs.Sound.play("enemyHit");
            // shape was not destroyed
            return false;
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
        var randomNum = randomMe(0,99);
        var targetX = player.sprite.x;
        var targetY = player.sprite.y;
        if (randomNum >= accuracy) {
            if (randomMe(1,2) == 1) targetX += randomMe(-60,-20);
            else targetX += randomMe(20,60);
        }

        // get targetAngle of target relative to shape's sprite
        var targetAngle = Math.floor(180 + (Math.atan2(sprite.y - targetY, sprite.x - targetX) * 57.2957795));
        // release the bullet!
        var bullet = objectPool.getBullet();
        var bulletSpeed = 6;
        var bulletDamage = 1;
        var bulletRadius = 5;
        if (bulletType === "bullet2") {
            bulletSpeed = 8;
            bulletDamage = 2;
            bulletRadius = 10;
        } else if (bulletType === "bullet3") {
            bulletSpeed = 10;
            bulletDamage = 3;
            bulletRadius = 15;
        }

        // myType, myOwner, spriteFrame, mySpeed, myDamage, myInvincible, x, y, r
        bullet.startMe(bulletType, this, bulletType, bulletSpeed, bulletDamage, false, sprite.x, sprite.y, targetAngle, bulletRadius);
        createjs.Sound.play("enemyShoot");
    };

    this.updateMe = function() {
        if (state === ShapeState.KILLED) return;

        // Step I : collision detection
        // has the shape collided with the player?
        if ((state !== ShapeState.KILLED) && (player.getState() !== PlayerState.KILLED) && (ndgmr.checkPixelCollision(sprite, player.sprite))) {
            player.hitMe(fullHitPoints);
            // kill shape with no points and no powerups
            powerupType = "";
            if (!player.getShieldEnabled()) this.killMe(hitPoints, false);
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
        if (!result) {
            // set to killed so user can't shoot points lost
            state = ShapeState.KILLED;
            // adjust sprite to display lost points
            sprite.alpha = 1;
            sprite.rotation = 0;
            sprite.gotoAndStop("lose" + points);
            // move sprite back on stage depending on where it currently is
            if (sprite.y > Globals.stage.canvas.height) {
                sprite.y = Globals.stage.canvas.width - (sprite.getBounds().height/2) - 5;
            } else if (sprite.y < 0) {
                sprite.y = (sprite.getBounds().height/2) + 5;
            } else if (sprite.x < 0) {
                sprite.x = (sprite.getBounds().width/2) + 5;
            } else if (sprite.x > Globals.stage.canvas.width) {
                sprite.x = Globals.stage.canvas.width - (sprite.getBounds().width/2) - 5;
            }
            // lose points for escaped shape
            pointsEvent.target = null;
            pointsEvent.points = -points;
            stage.dispatchEvent(pointsEvent);
            // tween out alpha of points            
            createjs.Tween.get(sprite,{useTicks:true})
            .to({alpha:0}, 15)
            .call(function(){
                _this.stopMe();
            });
            createjs.Sound.play("losePoints");
        }

        frameCounter++;
    };

};

var ShapeState = {
    "ATTACKING":0,
    "KILLED":1
};