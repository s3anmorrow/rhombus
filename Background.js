var Background = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;
    var objectPool = Globals.objectPool;

    // private variables
    var moving = false;
    var stageHeight = Globals.stage.canvas.height;
    var frameCounter = 0;
    var shapes = [];

    var backgroundLayer = new createjs.Container();

    // color the background of the game with a shape
    background = new createjs.Shape();
    background.graphics.beginFill("#000022").drawRect(0,0,800,800);
    background.cache(0,0,800,800);
    stage.addChild(background);
    stage.addChild(backgroundLayer);

    
    // --------------------------------------------------------- private methods
    function dropShape(dropY) {
        // randomly select properties
        var shape = assetManager.getSprite("assets","backgroundShape" + Globals.randomMe(1,3));
        shape.speed = Globals.randomMe(1,3);
        shape.rotation = Globals.randomMe(50,180);        
        shape.x = Globals.randomMe(200,700);
        if (dropY === undefined) shape.y = -shape.getBounds().height * 1.5;
        else shape.y = dropY;
        backgroundLayer.addChild(shape);

        // add to array for reference in updateMe
        shapes.push(shape);

        console.log(shapes);
    }


    // --------------------------------------------------------- public methods
    this.startMe = function() {        
        // initialization
        moving = true;
        frameCounter = 0;
        shapes = [];

        // drop default startup shapes
        dropShape(-200);
        dropShape(0);
        dropShape(200);
        dropShape(400);
        dropShape(600);
    };

    this.stopMe = function() {
        for (var n=0; n<shapes.length; n++){
            stage.removeChild(shapes[n]);
            shapes[n] = null;
        }
        shapes = [];
    };

    this.updateMe = function() {
        // move all background shapes
        for (var n=0; n<shapes.length; n++){
            var shape = shapes[n];
            shape.y = shape.y + shape.speed;
            // is shape off the bottom of the stage?
            if ((shape.y - shape.getBounds().height) > stageHeight) {
                stage.removeChild(shape);
                // remove shape sprite from array
                shapes.splice(n, 1);

                console.log(shapes);
            }
        }


        /*
        // move starfield sprites
        starsSprite1.y += 2;
        starsSprite2.y += 2;
        // time to swap sprite back to top?
        if (starsSprite1.y >= stageHeight) {
            starsSprite1.y = -stageHeight;
        } else if (starsSprite2.y >= stageHeight) {
            starsSprite2.y = -stageHeight;
        }
        */
        


        frameCounter++;
        if ((frameCounter % 150) === 0) {
            dropShape();
            frameCounter = 0;
        }

    };



};