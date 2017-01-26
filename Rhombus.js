var Rhombus = function(stage, assetManager){
    
    // private game variables
    var shape = new createjs.Shape();
    shape.graphics.beginStroke("#000000");
    shape.graphics.beginFill("#FF0000");
    shape.graphics.drawRect(0,0,100,100);
    shape.x = 100;
    shape.y = 100;

    this.setupMe = function() {

    }

    this.startMe = function() {
        stage.addChild(shape);
    }

    this.stopMe = function() {

    }

    this.resetMe = function() {

    }

    this.updateMe = function() {



    };

};