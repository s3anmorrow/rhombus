var Triangle = function(stage, assetManager){
    
    // private game variables
    var sprite = assetManager.getSprite("assets","player");
    sprite.x = 50;
    sprite.y = 50;

    // the array of other shapes who are to behave together
    var group = [];
    // the behaviour function that will be called in updateMe()
    var behaviour = null;

    // ----------------------------------------------- get/set methods
    this.setGroup = function(myGroup){
        group = myGroup;
    }

    // ----------------------------------------------- public methods
    this.setupMe = function(type, myBehaviour) {
        sprite.gotoAndStop(type);
        behaviour = myBehaviour;

    }

    this.startMe = function() {
        stage.addChild(sprite);
    }

    this.stopMe = function() {

    }

    this.resetMe = function() {
        group = [];
        behaviour = null;


    }

    this.updateMe = function() {
        behaviour();


    };

};