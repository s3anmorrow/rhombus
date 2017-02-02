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
        sprite.x = (Globals.stage.canvas.width / 2) - (sprite.getBounds().width / 2);
        stage.addChild(sprite);
    }

    this.stopMe = function() {
        stage.removeChild(sprite);

    }

    this.resetMe = function() {

    }

    this.updateMe = function() {


    };


}