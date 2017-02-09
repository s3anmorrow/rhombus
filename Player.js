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

    // private game variables
    var fireCounter = 0;
    var weaponData = null;
    // get sprite for Player
    var sprite = assetManager.getSprite("assets","playerEntrance");
    sprite.stop();

    // open sprite to be public property for ease of access
    this.sprite = sprite;

    // other variables
    var _this = this;

    // --------------------------------------------------------- get/set methods
    this.setWeapon = function(type){
        // update bullet data
        weaponData = gameConstants.WEAPONS[type];
    }

    // --------------------------------------------------------- public methods
    this.startMe = function() {
        // initialization
        state = PlayerState.ENTERING;
        fireCounter = 0;
        sprite.gotoAndStop("playerEntrance");

        // center the player sprite
        sprite.x = stage.canvas.width / 2;
        sprite.y = stage.canvas.height + sprite.getBounds().height;

        // spot where player stops when animating up into game
        var stopY = stage.canvas.height - sprite.getBounds().height - 10;

        // animate player sprite coming onto stage
        createjs.Tween.get(sprite, {useTicks:true})
            .to({y:stopY}, 30, createjs.Ease.cubicOut)
            .call(function(){
                sprite.addEventListener("animationend", function(e){
                    e.remove();
                    sprite.stop();
                    state = PlayerState.READY;
                });
                sprite.play();
            });

        stage.addChild(sprite);
    }

    this.stopMe = function() {
        stage.removeChild(sprite);

    }

    /*
    this.resetMe = function() {
        sprite.gotoAndStop("playerEntrance");
        fireCounter = 0;
        state = PlayerState.ENTERING;


    }
    */

    this.goLeft = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        state = PlayerState.MOVING_LEFT;
        sprite.gotoAndStop("playerLeft");
    }

    this.goRight = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        state = PlayerState.MOVING_RIGHT;
        sprite.gotoAndStop("playerRight");
    }      

    this.goUp = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        state = PlayerState.MOVING_UP;
    }

    this.goDown = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        state = PlayerState.MOVING_DOWN;
    }

    this.goStraight = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.STOPPED) || (state == PlayerState.KILLED)) return;

        if (state == PlayerState.MOVING_LEFT) state = PlayerState.STOPPING_LEFT;
        else if (state == PlayerState.MOVING_RIGHT) state = PlayerState.STOPPING_RIGHT;
        else if (state == PlayerState.MOVING_UP) state = PlayerState.STOPPING_UP;
        else if (state == PlayerState.MOVING_DOWN) state = PlayerState.STOPPING_DOWN;

        sprite.gotoAndStop("playerStraight");
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
    }

    this.killMe = function() {
        state = PlayerState.KILLED;
        sprite.addEventListener("animationend",function(e){
            e.remove();
            _this.startMe();
        });
        sprite.gotoAndPlay("playerKilled");
    }

    this.updateMe = function() {
        if ((state == PlayerState.ENTERING) || (state == PlayerState.KILLED)) return;
        if ((state != PlayerState.STOPPED)) {
            // moving player in all directions including acceleration / decelerration
            if (state == PlayerState.MOVING_LEFT) {
                if (speedX < targetSpeedX) speedX++;
                sprite.x-=speedX;
            } else if (state == PlayerState.MOVING_RIGHT) {
                if (speedX < targetSpeedX) speedX++;
                sprite.x+=speedX;
            } else if (state == PlayerState.STOPPING_LEFT) {
                if (speedX > 0) speedX--;
                sprite.x-=speedX;
            } else if (state == PlayerState.STOPPING_RIGHT) {
                if (speedX > 0) speedX--;
                sprite.x+=speedX;
            } else if (state == PlayerState.MOVING_UP) {
                if (speedY < targetSpeedY) speedY++;
                sprite.y-=speedY;
            } else if (state == PlayerState.MOVING_DOWN) {
                if (speedY < targetSpeedY) speedY++;
                sprite.y+=speedY;
            } else if (state == PlayerState.STOPPING_UP) {
                if (speedY > 0) speedY--;
                sprite.y-=speedY;
            } else if (state == PlayerState.STOPPING_DOWN) {
                if (speedY > 0) speedY--;
                sprite.y+=speedY;
            }    
            // has the player stopped?
            if ((speedX == 0) && (speedY == 0)) state = PlayerState.STOPPED;
        }

    };

}

var PlayerState = {
    "ENTERING":-1,
    "READY":0,
    "MOVING_LEFT":1,
    "MOVING_RIGHT":2,
    "MOVING_UP":3,
    "MOVING_DOWN":4,
    "KILLED":5,
    "STOPPING_LEFT":6,
    "STOPPING_RIGHT":7,
    "STOPPING_UP":8,
    "STOPPING_DOWN":9,
    "STOPPED":10
};