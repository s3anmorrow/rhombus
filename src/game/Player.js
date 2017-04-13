var Player = function(){
    // custom events
    var changeDirEvent = new createjs.Event("gameEvent", true);
    changeDirEvent.id = "playerChangeDir";
    changeDirEvent.dir = 1;
    var livesChangeEvent = new createjs.Event("gameEvent", true);
    livesChangeEvent.id = "playerLivesChange";
    livesChangeEvent.lives = 0;
    var powerChangeEvent = new createjs.Event("gameEvent", true);
    powerChangeEvent.id = "playerPowerChange";
    powerChangeEvent.power = 0;
    var ammoChangeEvent = new createjs.Event("gameEvent", true);
    ammoChangeEvent.id = "playerAmmoChange";
    ammoChangeEvent.ammo = ammo;
    var gameOverEvent = new createjs.Event("gameEvent", true);
    gameOverEvent.id = "gameOver";

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var gameConstants = Globals.gameConstants;

    // public property variables
    var power = gameConstants.PLAYER_START_POWER;
    var lives = gameConstants.PLAYER_START_LIVES;
    var state = 0;

    // other private game variables
    var firingGunIndex = 0;
    var ammo = 0;
    // which direction player is direction (0 is up : 1 is down)
    var direction = 0;
    // the current speeds of movement of player
    var speedX = 0;
    var targetSpeedX = gameConstants.PLAYER_SPEED;
    var speedY = 0;
    var targetSpeedY = gameConstants.PLAYER_SPEED;
    var minX = gameConstants.PLAYER_MIN_X; 
    var maxX = gameConstants.PLAYER_MAX_X;
    var minY = gameConstants.PLAYER_MIN_Y;
    var maxY = gameConstants.PLAYER_MAX_Y;
    var fireCounter = 0;
    var weaponType = "";
    var weaponData = null;
    // shield behaviour
    var shieldEnabled = false;
    var shieldCounter = 0;
    var shieldFadeTime = 0;
    var shieldKillTime = 0;
    // flip behaviour
    var baseRotation = 0;
    // is player godlike? > level 20
    var godLike = false;

    // get sprite for Player
    var sprite = assetManager.getSprite("assets","playerEntrance");
    sprite.stop();
    var shieldSprite = assetManager.getSprite("assets","playerShield");
    shieldSprite.stop();
    // open up sprite to be public property for ease of access
    this.sprite = sprite;
    // calculate spot where player stops when animating up into game
    var enteringStopY = stage.canvas.height - sprite.getBounds().height - 50;
    // calculating starting position of player sprite (center of stage)
    var startX = stage.canvas.width / 2;
    var startY = stage.canvas.height + sprite.getBounds().height;    

    // other variables
    var _this = this;

    // --------------------------------------------------------- get/set methods
    this.setWeapon = function(type){
        // update bullet data
        weaponType = type;
        weaponData = gameConstants.PLAYER_WEAPONS[type];
        ammo = weaponData.ammo;
        firingGunIndex = 0;
        // dispatch event so game screen can display new weapontype/ammo
        ammoChangeEvent.target = null;
        ammoChangeEvent.ammo = ammo;
        ammoChangeEvent.weaponType = weaponType;
        stage.dispatchEvent(ammoChangeEvent);
    };

    this.getState = function() {
        return state;
    };

    this.getPower = function() {
        return power;
    };

    this.getShieldEnabled = function() {
        return shieldEnabled;
    };

    this.setPower = function(myPower) {
        power = myPower;
        if (power > gameConstants.PLAYER_START_POWER) power = gameConstants.PLAYER_START_POWER;
        // dispatch event so game screen can display updated power bars
        powerChangeEvent.target = null;
        powerChangeEvent.power = power;
        stage.dispatchEvent(powerChangeEvent);
    };

    this.getLives = function() {
        return lives;
    };

    this.setLives = function(myLives) {
        lives = myLives;
        livesChangeEvent.target = null;
        livesChangeEvent.lives = lives;
        stage.dispatchEvent(livesChangeEvent);
    };

    // --------------------------------------------------------- public methods
    this.startMe = function(){
        // new game for player initialization
        godLike = false;
        lives =  Globals.gameConstants.PLAYER_START_LIVES;
        this.setWeapon("bounce");         
        this.spawnMe();
    };

    this.stopMe = function() {
        createjs.Tween.removeTweens(shieldSprite);
        createjs.Tween.removeTweens(sprite);
        stage.removeChild(shieldSprite);        
        stage.removeChild(sprite);
        sprite.stop();
        // return this object to the object pool
		objectPool.dispose(this);
    };

    this.spawnMe = function() {
        // initialization
        state = PlayerState.ENTERING;
        speedX = 0;
        speedY = 0;
        fireCounter = 0;
        firingGunIndex = 0;
        shieldCounter = 0;
        shieldFadeTime = 0;
        shieldKillTime = 100;
        shieldEnabled = true;
        // set direction to going up
        direction = 0;
        changeDirEvent.target = null;
        changeDirEvent.dir = direction;
        stage.dispatchEvent(changeDirEvent);
        
        baseRotation = 0;
        sprite.rotation = baseRotation;
        shieldSprite.rotation = baseRotation;
        this.setPower(Globals.gameConstants.PLAYER_START_POWER);
        createjs.Tween.removeTweens(shieldSprite);
        createjs.Tween.removeTweens(sprite);
        stage.removeChild(shieldSprite);                
        sprite.gotoAndStop("playerEntrance");

        // center the player sprite
        sprite.x = startX;
        sprite.y = startY;
        sprite.rotation = baseRotation;
        shieldSprite.rotation = baseRotation;

        // animate player sprite coming onto stage
        createjs.Tween.get(sprite, {useTicks:true})
            .to({y:enteringStopY}, 30, createjs.Ease.cubicOut)
            .call(function(){
                sprite.addEventListener("animationend", function(e){
                    e.remove();
                    sprite.stop();
                    state = PlayerState.IDLE;
                    sprite.gotoAndPlay("playerIdle");
                    _this.shieldMe(1.5,1);
                });
                sprite.play();
                createjs.Sound.play("flipIn");
            });

        stage.addChild(sprite);
        createjs.Sound.play("playerEnter");
    };

    this.goLeft = function() {
        // do nothing if in ENTERING or KILLED state
        if ((state === PlayerState.ENTERING) || (state === PlayerState.KILLED)) return;
        // don't change animation sequence if currently being hit
        if (sprite.currentAnimation != "playerLeft") {
            sprite.gotoAndPlay("playerLeft");
            createjs.Sound.play("playerMove");
        }
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShieldLeft");
        state = PlayerState.MOVING_LEFT;
    };

    this.goRight = function() {
        if ((state === PlayerState.ENTERING) || (state === PlayerState.KILLED)) return;
        if (sprite.currentAnimation != "playerRight") {
            sprite.gotoAndPlay("playerRight");
            createjs.Sound.play("playerMove");
        }
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShieldRight");
        state = PlayerState.MOVING_RIGHT;
    };     

    this.goUp = function() {
        if ((state === PlayerState.ENTERING) || (state === PlayerState.KILLED)) return;
        if (sprite.currentAnimation != "playerIdle") sprite.gotoAndPlay("playerIdle");
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShield");
        state = PlayerState.MOVING_UP;
    };

    this.goDown = function() {
        if ((state === PlayerState.ENTERING) || (state === PlayerState.KILLED)) return;
        if (sprite.currentAnimation != "playerIdle") sprite.gotoAndPlay("playerIdle");
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShield");
        state = PlayerState.MOVING_DOWN;
    };

    this.goIdle = function() {
        if ((state === PlayerState.ENTERING) || (state === PlayerState.KILLED)) return;
        if (sprite.currentAnimation != "playerIdle") sprite.gotoAndPlay("playerIdle");
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShield");
        state = PlayerState.IDLE;
    };

    this.flipMe = function() {
        if ((state === PlayerState.ENTERING) || (state === PlayerState.KILLED)) return;
        // animate player rotating to direction
        if (direction === 0) {
            createjs.Tween.get(sprite, {useTicks:true})
                .to({rotation:180}, 6);
            createjs.Tween.get(shieldSprite, {useTicks:true})
                .to({rotation:180}, 6);
            baseRotation = 180;
            direction = 1;
            createjs.Sound.play("flipIn");
        } else {
            createjs.Tween.get(sprite, {useTicks:true})
                .to({rotation:0}, 6);
            createjs.Tween.get(shieldSprite, {useTicks:true})
                .to({rotation:0}, 6);
            baseRotation = 0;
            direction = 0;
            createjs.Sound.play("flipOut");
        }
        
        changeDirEvent.target = null;
        changeDirEvent.dir = direction;
        stage.dispatchEvent(changeDirEvent);
    };

    this.fire = function() {
        if ((state === PlayerState.ENTERING) || (state === PlayerState.KILLED)) return;
        if (fireCounter === weaponData.freq) {
            var gunPoints = weaponData.gunPoints[direction];
            // loop through all gunPoints and add bullet
            for (var n=0; n<gunPoints.length; n++) {
                if (((weaponData.alternateFire) && (firingGunIndex === n)) || (!weaponData.alternateFire)) {
                    // pluck bullet out of object pool and release
                    var bullet = objectPool.getBullet();
                    bullet.startMe(weaponType, this, 
                                weaponData.frame, 
                                weaponData.speed, 
                                weaponData.damage,
                                weaponData.invincible,
                                sprite.x + gunPoints[n].x, 
                                sprite.y + gunPoints[n].y, 
                                gunPoints[n].r,
                                weaponData.radius);
                    
                    // play sound effect
                    createjs.Sound.play(weaponType);

                    // only track ammo used if not infinite ammo
                    if (ammo != -1) {
                        ammo--;
                        // player just fired a bullet - dispatch event
                        ammoChangeEvent.target = null;
                        ammoChangeEvent.ammo = ammo;
                        ammoChangeEvent.weaponType = weaponType;
                        stage.dispatchEvent(ammoChangeEvent);
                        // out of ammo?
                        if (ammo <= 0) {
                            if (godLike) this.setWeapon("double");
                            else this.setWeapon("single");
                            break;
                        }
                    }
                } 
            }

            // increment index of firing gun of next shot
            firingGunIndex++;
            if (firingGunIndex === gunPoints.length) firingGunIndex = 0;

            // reset fire frame counter
            fireCounter = 0;
            // if not set to auto set fireCounter one past frequency so it never happens again
            if (!weaponData.auto) fireCounter = weaponData.freq + 1;
        }
        if (weaponData.auto) fireCounter++;
    };

    this.cease = function() {
        fireCounter = weaponData.freq;
    };

    this.hitMe = function(powerLoss) {
        // if shield enabled no damage taken
        if (shieldEnabled) {
            createjs.Sound.play("hitWithShield");
            return;
        }

        this.setPower(power - powerLoss);
        createjs.Sound.play("playerHit");

        if (power <= 0) {
            this.killMe();
        } else {
            sprite.rotation = baseRotation;
            // tween rocking of sprite when hit by bullet
            createjs.Tween.get(sprite, {useTicks:true})
                .to({rotation:sprite.rotation+10}, 3)
                .to({rotation:sprite.rotation-10}, 3)
                .to({rotation:sprite.rotation}, 3);
        }
    };

    this.shieldMe = function(duration, fadeout) {
        shieldEnabled = true;
        shieldCounter = 0;
        if (fadeout === undefined) fadeout = 1;

        // determine fadeout and kill times
        shieldFadeTime = (duration - fadeout) * gameConstants.FRAME_RATE;
        shieldKillTime = duration * gameConstants.FRAME_RATE;

        shieldSprite.x = sprite.x;
        shieldSprite.y = sprite.y;
        stage.addChild(shieldSprite);
    };

    this.killMe = function() {
        // can't be killed if shieldEnabled
        if ((shieldEnabled) && (power > 0)) return;

        state = PlayerState.KILLED;
        createjs.Tween.removeTweens(shieldSprite);
        stage.removeChild(shieldSprite); 
        sprite.gotoAndPlay("playerKilled");
        createjs.Sound.play("explosion4");
        sprite.addEventListener("animationend",function(e){
            e.remove();
            _this.setPower(0);
            _this.setLives(lives - 1);
            if (lives <= 0) {
                // game over!
                sprite.stop();
                sprite.y = -2000;
                gameOverEvent.target = null;
                stage.dispatchEvent(gameOverEvent);
                 _this.stopMe();
            } else {
                _this.spawnMe();
            }
        });
    };

    this.enableGodLike = function() {
        godLike = true;
        // upgrade to superDouble as default weapon
        if (weaponType === "single") this.setWeapon("double");
    };

    this.updateMe = function() {
        if ((state === PlayerState.KILLED) || (state === PlayerState.ENTERING)) return;

        // which direction is player moving?
        if (state === PlayerState.MOVING_LEFT) {
            speedY = 0;
            if (speedX > -targetSpeedX) speedX-=2;
        } else if (state === PlayerState.MOVING_RIGHT) {
            speedY = 0;
            if (speedX < targetSpeedX) speedX+=2;
        } else if (state === PlayerState.MOVING_UP) {
            speedX = 0;
            if (speedY > -targetSpeedY) speedY-=2;
        } else if (state === PlayerState.MOVING_DOWN) {
            speedX = 0;
            if (speedY < targetSpeedY) speedY+=2;
        } else if (state === PlayerState.IDLE) {
            // do I need to decelerate the player anymore?
            if ((speedX !== 0) || (speedY !== 0)) {

                // decelerate player
                if (speedX < 0) {
                    speedX+=2;
                    if (speedX > 0) speedX = 0;
                } else if (speedX > 0) {
                    speedX-=2;
                    if (speedX < 0) speedX = 0;
                } else if (speedY < 0) {
                    speedY+=2;
                    if (speedY > 0) speedY = 0;
                } else if (speedY > 0) {
                    speedY-=2;
                    if (speedY < 0) speedY = 0;
                }

                // has the player finished decelerration?
                if ((speedX === 0) && (speedY === 0)) sprite.gotoAndPlay("playerIdle");
            }
        }

        // move the player!
        sprite.x+=speedX;
        sprite.y+=speedY;

        // regardless of state - player never allowed to move out of bounds on stage
        if (sprite.y < minY) {
            sprite.y = minY;
            speedY = 0;
        } else if (sprite.y > maxY) {
            sprite.y = maxY;
            speedY = 0;
        } else if (sprite.x < minX) {
            sprite.x = minX;
            speedX = 0;
        } else if (sprite.x > maxX) {
            sprite.x = maxX;
            speedX = 0;
        }

        // are shields active on player?
        if (shieldEnabled) {
            if (shieldCounter < shieldKillTime) {
                // move shields with player
                shieldSprite.x = sprite.x;
                shieldSprite.y = sprite.y;
                shieldCounter++;
                if (shieldCounter >= shieldFadeTime) {
                    // start flash effect to warn player
                    createjs.Tween.get(shieldSprite, {useTicks:true, loop:true})
                        .to({alpha:0}, 8)
                        .to({alpha:1}, 8);
                }
            } else {
                // times up - remove shields
                createjs.Tween.removeTweens(shieldSprite);
                stage.removeChild(shieldSprite);        
                shieldEnabled = false;
            }
        }

    };
};

var PlayerState = {
    "ENTERING":-1,
    "IDLE":0,
    "MOVING_LEFT":2,
    "MOVING_RIGHT":3,
    "MOVING_UP":4,
    "MOVING_DOWN":5,
    "KILLED":6
};