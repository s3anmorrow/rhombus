var Player = function(){

    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;


    // private game variables
    var sprite = assetManager.getSprite("assets","playerEntrance");
    sprite.stop();


    // --------------------------------------------------------- public methods
    this.setupMe = function() {

    }

    this.startMe = function() {
        // center the player sprite
        sprite.x = (Globals.stage.canvas.width / 2) - (sprite.getBounds().width / 2);
        sprite.y = Globals.stage.canvas.height + sprite.getBounds().height;

        var stopY = Globals.stage.canvas.height - sprite.getBounds().height - 10;


        createjs.Tween.get(sprite, {useTicks:true}).to({y:stopY}, 30, createjs.Ease.cubicOut).call(onSpin);


        stage.addChild(sprite);
    }

    this.stopMe = function() {
        stage.removeChild(sprite);

    }

    this.resetMe = function() {

    }

    this.updateMe = function() {


    };

    function onSpin(e) {
        sprite.addEventListener("animationend", function(e){
            e.remove();
            sprite.stop();
        });
        sprite.play();
    }


}