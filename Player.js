var Player = function(){

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;
    var gameConstants = Globals.gameConstants;

    // public property variables
	var state = 0;

    // the current speeds of movement of player
    var speedX = 0;
    var targetSpeedX = gameConstants.PLAYER_SPEED;
    var speedY = 0;
    var targetSpeedY = gameConstants.PLAYER_SPEED;
    var minX = gameConstants.PLAYER_MIN_X; 
    var maxX = gameConstants.PLAYER_MAX_X;
    var minY = gameConstants.PLAYER_MIN_Y;
    var maxY = gameConstants.PLAYER_MAX_Y;

    // private game variables
    var fireCounter = 0;
    var weaponData = null;
    // get sprite for Player
    var sprite = assetManager.getSprite("assets","playerEntrance");
    sprite.stop();
    // calculate spot where player stops when animating up into game
    var enteringStopY = stage.canvas.height - sprite.getBounds().height - 50;
    // calculating starting position of player sprite (center of stage)
    var startX = stage.canvas.width / 2;
    var startY = stage.canvas.height + sprite.getBounds().height;    

    // open up sprite to be public property for ease of access
    this.sprite = sprite;

    // other variables
    var _this = this;

    // --------------------------------------------------------- get/set methods
    this.setWeapon = function(type){
        // update bullet data
        weaponData = gameConstants.WEAPONS[type];
    }

    this.getState = function() {
        return state;
    }

    // --------------------------------------------------------- public methods
    this.startMe = function() {
        // initialization
        state = PlayerState.ENTERING;
        fireCounter = 0;
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
    }

    this.stopMe = function() {
        stage.removeChild(sprite);

    }

    this.resetMe = function() {
        sprite.gotoAndStop("playerEntrance");
        fireCounter = 0;
        state = PlayerState.ENTERING;
        sprite.x = startX;
        sprite.y = startY;
    }

    this.goLeft = function() {
        // exit if in entering or killed state
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if (state != PlayerState.MOVING_LEFT) {
            sprite.gotoAndStop("playerLeft");
            state = PlayerState.MOVING_LEFT;
        }
        // no vertical movement now
        speedY = 0;
        // acceleration to targetSpeed
        if (speedX < targetSpeedX) speedX++;
        // move sprite to the left
        sprite.x-=speedX;
        // have I hit the movement boundary?
        if (sprite.x < minX) {
            sprite.x = minX;
            speedX = 0;
        }
    }

    this.goRight = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if (state != PlayerState.MOVING_RIGHT) {
            sprite.gotoAndStop("playerRight");
            state = PlayerState.MOVING_RIGHT;
        }
        speedY = 0;
        if (speedX < targetSpeedX) speedX++;
        sprite.x+=speedX;
        if (sprite.x > maxX) {
            sprite.x = maxX;
            speedX = 0;
        }
    }      

    this.goUp = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if (state != PlayerState.MOVING_UP) {
            if (sprite.currentAnimation != "playerIdle") sprite.gotoAndPlay("playerIdle");
            state = PlayerState.MOVING_UP;
        }
        speedX = 0;
        if (speedY < targetSpeedY) speedY++;
        sprite.y-=speedY;
        if (sprite.y < minY) {
            sprite.y = minY;
            speedY = 0;
        }
    }

    this.goDown = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if (state != PlayerState.MOVING_DOWN) {
            if (sprite.currentAnimation != "playerIdle") sprite.gotoAndPlay("playerIdle");
            state = PlayerState.MOVING_DOWN;
        }
        speedX = 0;
        if (speedY < targetSpeedY) speedY++;
        sprite.y+=speedY;
        if (sprite.y > maxY) {
            sprite.y = maxY;
            speedY = 0;
        }
    }

    this.goIdle = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED) || (state == PlayerState.IDLE)) return;

        if (state == PlayerState.MOVING_LEFT) {
            if (speedX > 0) speedX--;
            sprite.x-=speedX;
        } else if (state == PlayerState.MOVING_RIGHT) {
            if (speedX > 0) speedX--;
            sprite.x+=speedX;
        } else if (state == PlayerState.MOVING_UP) {
            if (speedY > 0) speedY--;
            sprite.y-=speedY;
        } else if (state == PlayerState.MOVING_DOWN) {
            if (speedY > 0) speedY--;
            sprite.y+=speedY;
        }    

        // has the player finished decelerration?
        if ((speedX == 0) && (speedY == 0)) {
            state = PlayerState.IDLE;
            sprite.gotoAndPlay("playerIdle");
        }
    } 


    this.fire = function() {
        if (fireCounter == weaponData.freq) {
            var firePoints = weaponData.firePoints;
            // loop through all firePoints and add bullet
            for (var n=0; n<firePoints.length; n++) {
                // pluck bullet out of object pool and release
                var bullet = objectPool.getBullet();
                bullet.startMe(this, 
                               weaponData.frame, 
                               weaponData.speed, 
                               weaponData.damage,
                               sprite.x + firePoints[n].x, 
                               sprite.y + firePoints[n].y, 
                               firePoints[n].r);
            }

            // reset fire frame counter
            fireCounter = 0;
        }
        fireCounter++;
    };

    this.cease = function() {
        fireCounter = weaponData.freq;
    };

    this.killMe = function() {
        state = PlayerState.KILLED;
        sprite.addEventListener("animationend",function(e){
            e.remove();
            _this.startMe();
        });
        sprite.gotoAndPlay("playerKilled");
    }

    this.updateMe = function() {




    };

}

var PlayerState = {
    "ENTERING":-1,
    "IDLE":0,
    "MOVING_LEFT":1,
    "MOVING_RIGHT":2,
    "MOVING_UP":3,
    "MOVING_DOWN":4,
    "KILLED":5,
};