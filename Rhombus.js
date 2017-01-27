var Rhombus = function(stage, assetManager){
    
    // private game variables
    var shape = new createjs.Shape();
    shape.graphics.beginFill("#FF0000");

    //shape.graphics.beginStroke("black");
    shape.graphics.moveTo(40, 0).lineTo(80, 0).lineTo(50, 30).lineTo(10, 30).lineTo(40,0);
    shape.x = 100;
    shape.y = 700;
    shape.rotation = 22;

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