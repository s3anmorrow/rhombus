var Player = function(){

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;

    // public property variables
	var state = 0;

    // the current speeds of movement of player
    var speedX = 0;
    var targetSpeedX = 8;
    var speedY = 0;
    var targetSpeedY = 8;

    // maximum moving speed
    //var maxSpeed = 6;


    // private game variables
    var sprite = assetManager.getSprite("assets","playerEntrance");
    sprite.stop();

    // --------------------------------------------------------- public methods
    this.startMe = function() {
        // center the player sprite
        sprite.x = (Globals.stage.canvas.width / 2);
        sprite.y = Globals.stage.canvas.height + sprite.getBounds().height;

        // spot where player stops when animating up into game
        var stopY = Globals.stage.canvas.height - sprite.getBounds().height - 10;
        // player is currently entering the game
        state = PlayerState.ENTERING;

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

    this.resetMe = function() {
        sprite.gotoAndStop("playerEntrance");


    }

    this.goLeft = function() {
        state = PlayerState.MOVING_LEFT;
        sprite.gotoAndStop("playerLeft");
    }

    this.goRight = function() {
        state = PlayerState.MOVING_RIGHT;
        sprite.gotoAndStop("playerRight");
    }      

    this.goUp = function() {
        state = PlayerState.MOVING_UP;
    }

    this.goDown = function() {
        state = PlayerState.MOVING_DOWN;
    }

    this.goStraight = function() {
        if (state == PlayerState.ENTERING) return;
        // save the last state player was in

        if (state == PlayerState.MOVING_LEFT) state = PlayerState.STOPPING_LEFT;
        else if (state == PlayerState.MOVING_RIGHT) state = PlayerState.STOPPING_RIGHT;
        else if (state == PlayerState.MOVING_UP) state = PlayerState.STOPPING_UP;
        else if (state == PlayerState.MOVING_DOWN) state = PlayerState.STOPPING_DOWN;

        sprite.gotoAndStop("playerAlive");
    }      

    this.updateMe = function() {
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
    "STOPPING_DOWN":9
};
