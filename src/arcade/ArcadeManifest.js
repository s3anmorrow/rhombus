/*
Porting HTML5 Games over to the Arcade Machine
----------------------------------------------
Construct ArcadeManager and call monitorMe(state) on every tick (see notes below on state)

The following are the buttons id's to be used below in the manifest.
A = 10
B = 12
C = 11
D = 13
START = 18
SELECT = 19

Buttons invoke a keypress event which are picked up by standard listeners.
Typical entry in manifest:
{
    // start button to start game
    id:[id of button],
    keyCode:[keycode to invoke - match this up with your keyboard controls of your game],
    keydown:[false unless clipping:true],
    keyup:[true - typically use this one],
    clipping:[true|false],
    gameState:[state as integer (see note below)]
}
keydown does nothing unless clipping:true. Use keyup typically.
gameState is an integer that is few into the ArcadeManager's monitorMe(state) method called on every tick. This can be defaulted to 0 or set. Basically exists so that the same button can do different things at different times in the game (i.e. the fire button starts the game AND fires the gun in the game)

Notes:
Machine will automatically boot var/www/html/index.htm (menu system)
Games are copied into var/www/html/games/[game folder name]/
All games must have their entry HTML file named index.html
ArcadeManager is wired up to go back to the main menu app (ArcadeMachineMenu) when START + SELECT are pressed
*/

var arcadeManifest = {
    buttons:[
        {
            // start button to start game
            id:18,
            keyCode:32,
            keydown:false,
            keyup:true,
            gameState:0
        },
        {
            // fire button
            id:10,
            keyCode:32,
            keydown:true,
            keyup:true,
            gameState:1
        },
        {
            // flip button
            id:12,
            keyCode:16,
            keydown:true,
            keyup:true,
            gameState:1
        },
        {
            // select initial in highscore board
            id:10,
            keyCode:32,
            keydown:true,
            keyup:true,            
            gameState:2
        },
        {
            // start button to go back to main on game over
            id:18,
            keyCode:32,
            keydown:false,            
            keyup:true,
            gameState:3
        }
    ],
    joystick:[
        {
            keyCode:40,
            clipping:true,
            axis:1,
            range:[0.7,1.0],
            gameState:1
        },
        {
            keyCode:38,
            clipping:true,
            axis:1,
            range:[-1.0,-0.7],
            gameState:1
        },
        {
            keyCode:37,
            clipping:true,
            axis:0,
            range:[-1.0,-0.7],
            gameState:1
        },
        {
            keyCode:39,
            clipping:true,
            axis:0,
            range:[0.7,1.0],
            gameState:1
        },
        {
            keyCode:40,
            clipping:false,
            axis:1,
            range:[0.7,1.0],
            gameState:2
        },
        {
            keyCode:38,
            clipping:false,
            axis:1,
            range:[-1.0,-0.7],
            gameState:2
        },
        {
            keyCode:37,
            clipping:false,
            axis:0,
            range:[-1.0,-0.7],
            gameState:2
        },
        {
            keyCode:39,
            clipping:false,
            axis:0,
            range:[0.7,1.0],
            gameState:2
        }
    ]
};