var LoadScreen = function() {
    // set references to globals
    var stage = Globals.stage;
    var assetManager = Globals.assetManager;

    // setup loading screen
    var screen = new createjs.Container();
    var loadScreenSprite = assetManager.getSprite("ui","loadScreen");
    screen.addChild(loadScreenSprite);
    // add progress bar to loading screen
    var progressBarBack = new createjs.Shape();
    progressBarBack.alpha = 0.3;
    progressBarBack.graphics.beginFill("#FFFFFF").drawRect(315,425,178,10);
    screen.addChild(progressBarBack);
    progressBar = new createjs.Shape();
    progressBar.graphics.beginFill("#FFFFFF").drawRect(315,425,0,10);
    screen.addChild(progressBar);

    // ------------------------------------------------- public methods
    this.showMe = function() {
        stage.addChild(screen);
    };

    this.hideMe = function() {
        stage.removeChild(screen);
    };

    this.updateProgress = function(){
        // update progress bar
		progressBar.graphics.clear();
		progressBar.graphics.beginFill("#FFFFFF").drawRect(315,425,(178 * assetManager.getProgress()),10);
		stage.update();
    };
}