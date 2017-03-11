var Player = function(){

    // TODO: add invicibilty to player when first appears

    // custom events
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
    var shieldFadeTime = 0
    var shieldKillTime = 0;

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
        // dispatch event so game screen can display new weapontype/ammo
        ammoChangeEvent.target = null;
        ammoChangeEvent.ammo = ammo;
        ammoChangeEvent.weaponType = weaponType;
        sprite.dispatchEvent(ammoChangeEvent);
    };

    this.getState = function() {
        return state;
    };

    this.getPower = function() {
        return power;
    };

    this.getLives = function() {
        return lives;
    };

    this.setPower = function(myPower) {
        power = myPower;
        if (power > gameConstants.PLAYER_START_POWER) power = gameConstants.PLAYER_START_POWER;
        // dispatch event so game screen can display updated power bars
        powerChangeEvent.target = null;
        powerChangeEvent.power = power;
        sprite.dispatchEvent(powerChangeEvent);
    };

    this.setLives = function(myLives) {
        lives = myLives;
        livesChangeEvent.target = null;
        livesChangeEvent.lives = lives;
        sprite.dispatchEvent(livesChangeEvent);
    };

    // --------------------------------------------------------- public methods
    this.startMe = function() {
        // initialization
        state = PlayerState.ENTERING;
        fireCounter = 0;
        shieldCounter = 0;
        shieldFadeTime = 0;
        shieldKillTime = 0;
        shieldEnabled = false;
        this.setPower(Globals.gameConstants.PLAYER_START_POWER);
        sprite.gotoAndStop("playerEntrance");

        // center the player sprite
        sprite.x = startX;
        sprite.y = startY;

        // animate player sprite coming onto stage
        createjs.Tween.get(sprite, {useTicks:true})
            .to({y:enteringStopY}, 30, createjs.Ease.cubicOut)
            .call(function(){
                sprite.addEventListener("animationend", function(e){
                    e.remove();
                    sprite.stop();
                    state = PlayerState.IDLE;
                    sprite.gotoAndPlay("playerIdle");
                });
                sprite.play();
            });

        stage.addChild(sprite);
        // have to do this here since it dispatched event from sprite and needs to be on stage
        this.setWeapon("single");
    };

    this.stopMe = function() {
        stage.removeChild(sprite);
        sprite.stop();
        // return this object to the object pool
		objectPool.dispose(this);
    };

    this.resetMe = function() {
        sprite.gotoAndStop("playerEntrance");
        fireCounter = 0;
        state = PlayerState.ENTERING;
        lives =  Globals.gameConstants.PLAYER_START_LIVES;
        sprite.x = startX;
        sprite.y = startY;
    };

    this.goLeft = function() {
        // do nothing if in ENTERING or KILLED state
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        // don't change animation sequence if currently being hit
        if (state != PlayerState.HIT) sprite.gotoAndStop("playerLeft");
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShieldLeft");
        state = PlayerState.MOVING_LEFT;
    };

    this.goRight = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if (state != PlayerState.HIT) sprite.gotoAndStop("playerRight");
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShieldRight");
        state = PlayerState.MOVING_RIGHT;
    };     

    this.goUp = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if ((sprite.currentAnimation != "playerIdle") && (state != PlayerState.HIT)) sprite.gotoAndPlay("playerIdle");
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShield");
        state = PlayerState.MOVING_UP;
    };

    this.goDown = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if ((sprite.currentAnimation != "playerIdle") && (state != PlayerState.HIT)) sprite.gotoAndPlay("playerIdle");
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShield");
        state = PlayerState.MOVING_DOWN;
    };

    this.goIdle = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if ((sprite.currentAnimation != "playerIdle") && (state != PlayerState.HIT)) sprite.gotoAndPlay("playerIdle");
        if (shieldEnabled) shieldSprite.gotoAndStop("playerShield");
        state = PlayerState.IDLE;
    };

    this.fire = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if (fireCounter == weaponData.freq) {
            var gunPoints = weaponData.gunPoints;
            // loop through all gunPoints and add bullet
            for (var n=0; n<gunPoints.length; n++) {

                if (((weaponData.alternateFire) && (firingGunIndex == n)) || (!weaponData.alternateFire)) {
                    // pluck bullet out of object pool and release
                    var bullet = objectPool.getBullet();
                    bullet.startMe(weaponType, this, 
                                weaponData.frame, 
                                weaponData.speed, 
                                weaponData.damage,
                                weaponData.invincible,
                                sprite.x + gunPoints[n].x, 
                                sprite.y + gunPoints[n].y, 
                                gunPoints[n].r);
                    
                    // only track ammo used if not infinite ammo
                    if (ammo != -1) {
                        ammo--;
                        // player just fired a bullet - dispatch event
                        ammoChangeEvent.target = null;
                        ammoChangeEvent.ammo = ammo;
                        ammoChangeEvent.weaponType = weaponType;
                        sprite.dispatchEvent(ammoChangeEvent);
                        // out of ammo?
                        if (ammo <= 0) this.setWeapon("single");
                    }
                } 
            }

            // increment index of firing gun of next shot
            firingGunIndex++;
            if (firingGunIndex == gunPoints.length) firingGunIndex = 0;

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
            // TODO: play cool sound effect for shield deflection
            return;
        }

        state = PlayerState.HIT;
        if (powerLoss === undefined) powerLoss = 1;
        this.setPower(power - powerLoss);
        if (power <= 0) {
            this.killMe();
        } else {
            sprite.gotoAndPlay("playerHit");
            // update event object
            sprite.addEventListener("animationend",function(e){
                e.remove();
                state = PlayerState.IDLE;
                sprite.gotoAndPlay("playerIdle");
            });
        }
    };

    this.shieldMe = function(duration) {
        shieldEnabled = true;
        shieldCounter = 0;

        // determine fadeout and kill times
        shieldFadeTime = (duration - 2) * gameConstants.FRAME_RATE;
        shieldKillTime = duration * gameConstants.FRAME_RATE;

        shieldSprite.x = sprite.x;
        shieldSprite.y = sprite.y;
        stage.addChild(shieldSprite);
    };

    this.killMe = function() {
        state = PlayerState.KILLED;
        sprite.gotoAndPlay("playerKilled");
        sprite.addEventListener("animationend",function(e){
            e.remove();
            _this.setPower(0);
            _this.setLives(lives - 1);
            if (lives <= 0) {
                // game over!
                sprite.stop();
                sprite.y = -2000;
                gameOverEvent.target = null;
                sprite.dispatchEvent(gameOverEvent);
            } else {
                _this.startMe();
            }
        });
    };

    this.updateMe = function() {
        // which direction is player moving?
        if (state == PlayerState.MOVING_LEFT) {
            speedY = 0;
            if (speedX > -targetSpeedX) speedX--;
        } else if (state == PlayerState.MOVING_RIGHT) {
            speedY = 0;
            if (speedX < targetSpeedX) speedX++;
        } else if (state == PlayerState.MOVING_UP) {
            speedX = 0;
            if (speedY > -targetSpeedY) speedY--;
        } else if (state == PlayerState.MOVING_DOWN) {
            speedX = 0;
            if (speedY < targetSpeedY) speedY++;
        } else if (state == PlayerState.IDLE) {
            // do I need to decelerate the player anymore?
            if ((speedX !== 0) || (speedY !== 0)) {

                // decelerate player
                if (speedX < 0) {
                    speedX+=1;
                    if (speedX > 0) speedX = 0;
                } else if (speedX > 0) {
                    speedX-=1;
                    if (speedX < 0) speedX = 0;
                } else if (speedY < 0) {
                    speedY+=1;
                    if (speedY > 0) speedY = 0;
                } else if (speedY > 0) {
                    speedY-=1;
                    if (speedY < 0) speedY = 0;
                }

                // has the player finished decelerration?
                if ((speedX === 0) && (speedY === 0) && (state != PlayerState.HIT)) sprite.gotoAndPlay("playerIdle");
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
                if (shieldCounter == shieldFadeTime) {
                    // start flash effect to warn player
                    createjs.Tween.get(shieldSprite, {useTicks:true, loop:true})
                        .to({alpha:0}, 8)
                        .to({alpha:1}, 8);
                }
            } else {
                // times up - remove shields
                shieldEnabled = false;
                stage.removeChild(shieldSprite);        
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
    "KILLED":6,
    "HIT":7
};