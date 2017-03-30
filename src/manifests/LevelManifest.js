/*
"circle": {hp:1,points:50},
"square": {hp:1,points:50},
"triangle": {hp:2,points:100},
"ellipse": {hp:2,points:100},
"pentagon": {hp:3,points:200},
"star": {hp:3,points:200},
"nonagon": {hp:3,points:400},
"rectangle": {hp:4,points:400},
"rhombus": {hp:5,points:500},
"hexagon": {hp:4,points:400}
*/

// level 1 - up down left right rightAndStop leftAndStop downAndStop / circle square ellipse triangle / bullet1
// level 2 - looping diagonal downAndStop (with overlap) / circle square ellipse star / bullet1
// level 3 - wall of circles with four mini bosses coming down / massive looping number with higher hp
// level 4 - 


// to add:
// pentagon cloaking
// looping and stopping
// powerup powerupShield
// large loop radius of 400 (suicidal shapes)
// shape spawn turret



var levelManifest = [
    [
        // LEVEL 1
        {levelTitle:"Bunny Run",
            type:"circle", 
            wave:{count:5, spaced:20},
            settings:{x:400, y:-50}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:2
        },
        {type:"square", 
            wave:{count:5, spaced:20},
            settings:{x:-50, y:250, shooters:[{index:4, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"right",speed:4},
            powerup:null,
            time:5
        },
        {type:"circle", 
            wave:{count:5, spaced:20},
            settings:{x:830, y:500, shooters:[{index:0, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"left",speed:4},
            powerup:{type:"powerupDouble",index:4},
            time:10
        },
        {type:"square", 
            wave:{count:5, spaced:30},
            settings:{x:-30, y:100, shooters:[{index:0, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"right",speed:4},
            powerup:null,
            time:15
        },
        {type:"circle", 
            wave:{count:5, spaced:25},
            settings:{x:550, y:830, shooters:[{index:0, freq:48}]}, 
            movement:{type:"up", speed:2},
            powerup:null,
            time:22
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-50, y:400, points:200,
                turrets:[   
                    {type:"triangle",x:0,y:0,freq:25,bulletType:"bullet1"},
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:500, rotate:true},
            time:30
        },
        {type:"square", 
            wave:{count:8, spaced:20},
            settings:{x:830, y:450, shooters:[{index:0, freq:48},{index:1, freq:48}]}, 
            movement:{type:"leftAndStop", rotate:true, speed:4, stopAt:200},
            powerup:null,
            time:34
        },
        {type:"circle", 
            wave:{count:6, spaced:25},
            settings:{x:150, y:-30, shooters:[{index:2, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:40
        },
        {type:"circle", 
            wave:{count:5, spaced:20},
            settings:{x:400, y:-50, shooters:[{index:0, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"downAndStop",speed:4,stopAt:300},
            powerup:null,
            time:43
        },
        {type:"ellipse", 
            wave:{count:1, spaced:30},
            settings:{x:650, y:830, shooters:[{index:0, freq:20, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4,stopAt:200},
            powerup:null,
            time:46
        },
        {type:"square", 
            wave:{count:5, spaced:20},
            settings:{x:400, y:-50}, 
            movement:{type:"down",speed:2},
            powerup:null,
            time:50
        },
        {type:"bossHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:250, points:1000,
                turrets:[   
                    {type:"star",x:0,y:0,freq:100,bulletType:"bullet1"},
                    {type:"square",x:100,y:100,freq:150,bulletType:"bullet1"},
                    {type:"square",x:-100,y:100,freq:50,bulletType:"bullet1"},
                    {type:"square",x:100,y:-100,freq:200,bulletType:"bullet1"},
                    {type:"square",x:-100,y:-100,freq:125,bulletType:"bullet1"}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:400, rotate:true},
            time:58
        }

        /*
        {type:"triangle", 
            wave:{count:3, spaced:30},
            settings:{x:400, y:800, shooters:[{index:0, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"up",speed:2},
            powerup:{type:"powerupShield",index:2},
            time:5
        }/*,
        {type:"pentagon", 
            wave:{count:10, spaced:20},
            settings:{x:300, y:0, shooters:[{index:0, freq:48},{index:1, freq:48}]},
            movement:{type:"looping", r:225, cx:300, cy:300, dir:"down", loops:3, speed:4},
            time:10
        },
        */
        
        /*
        {type:"bossHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:250, points:1000,
                turrets:[   
                    {type:"circle",x:0,y:0,hp:4,freq:100},
                    {type:"square",x:100,y:100,hp:4,freq:150,bulletType:"bullet2},
                    {type:"square",x:-100,y:100,hp:4,freq:50,bulletType:"bullet2},
                    {type:"square",x:100,y:-100,hp:4,freq:200,bulletType:"bullet2"},
                    {type:"circle",x:-100,y:-100,hp:4,freq:125}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:400, rotate:true},
            time:1
        }
        */
        

        /*
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:400, y:-100, points:200,
                turrets:[   
                    {type:"circle",x:0,y:0,hp:4,freq:25},
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:1
        }
        */

        /*
        {type:"bossHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:250, points:1000,
                turrets:[   
                    {type:"hexagon",x:0,y:0,freq:100,bulletType:"triangle"},
                    {type:"square",x:100,y:100,freq:150,bulletType:"bullet1"},
                    {type:"square",x:-100,y:100,freq:50,bulletType:"bullet2"},
                    {type:"square",x:100,y:-100,freq:200,bulletType:"bullet3"},
                    {type:"circle",x:-100,y:-100,freq:125}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:400, rotate:true},
            time:1
        }
        */


    ],
    [
        // LEVEL 2
        {levelTitle:"Criss Cross Crunch",
            type:"square", 
            wave:{count:6, spaced:25},
            settings:{x:-30, y:300, shooters:[{index:0, freq:50, bulletType:"bullet1"},{index:5, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"looping", r:150, cx:500, cy:300, dir:"right", loops:2, speed:3},
            powerup:{type:"powerupSpread",index:2},
            time:2
        },
        {type:"circle", 
            wave:{count:6, spaced:25},
            settings:{x:250, y:-50, shooters:[{index:1, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:12
        },
        {type:"circle", 
            wave:{count:6, spaced:25},
            settings:{x:550, y:-50, shooters:[{index:1, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:12
        },
        {type:"square", 
            wave:{count:3, spaced:20},
            settings:{x:100, y:-30, shooters:[{index:0, freq:50},{index:1, freq:50},{index:2, freq:50}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:null,
            time:20
        },
        {type:"square", 
            wave:{count:3, spaced:20},
            settings:{x:700, y:-30, shooters:[{index:0, freq:50},{index:1, freq:50},{index:2, freq:50}]}, 
            movement:{type:"diagonal",speed:4,angle:135},
            powerup:null,
            time:20
        },
        {type:"ellipse", 
            wave:{count:1, spaced:30},
            settings:{x:-30, y:300, shooters:[{index:0, freq:75}]}, 
            movement:{type:"rightAndStop",speed:4,stopAt:200,rotate:true},
            powerup:null,
            time:24
        },
        {type:"ellipse", 
            wave:{count:1, spaced:30},
            settings:{x:830, y:300, shooters:[{index:0, freq:75}]}, 
            movement:{type:"leftAndStop",speed:4,stopAt:600,rotate:true},
            powerup:null,
            time:24
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:400, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:250, rotate:true},
            time:26
        },
        {type:"square", 
            wave:{count:12, spaced:20},
            settings:{x:400, y:0, shooters:[{index:0, freq:48},{index:1, freq:48},{index:2, freq:48},{index:9, freq:48},{index:10, freq:48},{index:11, freq:48}]}, 
            movement:{type:"looping", r:200, cx:400, cy:400, dir:"down", loops:3, speed:4},
            powerup:null,
            time:32
        },
        {type:"star", 
            wave:{count:8, spaced:30},
            settings:{x:830, y:350, shooters:[{index:0, freq:40},{index:1, freq:40},{index:2, freq:80},{index:5, freq:80},{index:6, freq:120},{index:7, freq:160}]}, 
            movement:{type:"left", speed:2},
            powerup:null,
            time:40
        },
        {type:"bossMiniHexagon", 
            wave:{count:2, spaced:80},
            settings:{x:400, y:-30, points:200,
                turrets:[   
                    {type:"ellipse",x:0,y:-20,freq:20,bulletType:"bullet1"},
                    {type:"ellipse",x:0,y:20,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:300, rotate:true},
            time:50
        },
        {type:"square", 
            wave:{count:3, spaced:20},
            settings:{x:-30, y:450, shooters:[{index:0, freq:50},{index:2, freq:50}]}, 
            movement:{type:"right", speed:4, rotate:true},
            powerup:{type:"powerupHalfPower",index:1},
            time:58
        },
        {type:"bossSquare", 
            wave:{count:1, spaced:4},
            settings:{x:1000, y:300, points:2000,
                turrets:[   
                    {type:"star",x:0,y:0,freq:50,bulletType:"bullet1"},
                    {type:"square",x:100,y:100,freq:100,bulletType:"bullet1"},
                    {type:"square",x:-100,y:100,freq:100,bulletType:"bullet1"},
                    {type:"square",x:100,y:-100,freq:100,bulletType:"bullet1"},
                    {type:"square",x:-100,y:-100,freq:100,bulletType:"bullet1"},
                    {type:"square",x:0,y:-100,freq:100,bulletType:"bullet1"},
                    {type:"square",x:0,y:100,freq:100,bulletType:"bullet1"},
                    {type:"square",x:100,y:0,freq:100,bulletType:"bullet1"},
                    {type:"square",x:-100,y:0,freq:100,bulletType:"bullet1"}
                ]
            },
            movement:{type:"leftAndStop", speed:2, stopAt:400, rotate:true},
            time:62
        }
    ],
    [
        // LEVEL 3
        {levelTitle:"Walled Up",
            type:"circle", 
            wave:{count:20, spaced:30},
            settings:{x:-30, y:300, 
                shooters:[{index:1, freq:75, bulletType:"bullet1"},
                {index:3, freq:75, bulletType:"bullet1"},
                {index:5, freq:75, bulletType:"bullet1"},
                {index:7, freq:75, bulletType:"bullet1"},
                {index:9, freq:75, bulletType:"bullet1"},
                {index:11, freq:75, bulletType:"bullet1"},
                {index:13, freq:75, bulletType:"bullet1"},
                {index:15, freq:75, bulletType:"bullet1"},
                {index:17, freq:75, bulletType:"bullet1"},
                {index:19, freq:75, bulletType:"bullet1"}
                ]}, 
            movement:{type:"right",speed:2},
            powerup:{type:"powerupSuperDouble",index:2},
            time:1
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:200, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:200, rotate:true},
            time:7
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:300, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:200, rotate:true},
            time:9
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:400, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:200, rotate:true},
            time:11
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:500, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:200, rotate:true},
            time:13
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:600, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:200, rotate:true},
            time:15
        },
        {type:"ellipse", 
            wave:{count:12, spaced:40},
            settings:{x:400, y:0, shooters:[{index:0, freq:60},{index:1, freq:48},{index:2, freq:60},{index:9, freq:60},{index:10, freq:60},{index:11, freq:60}]}, 
            movement:{type:"looping", r:250, cx:400, cy:300, dir:"down", loops:1, speed:1, stop:true},
            powerup:{type:"powerupRapid",index:11},
            time:22
        },
        {type:"square", 
            wave:{count:8, spaced:20},
            settings:{x:100, y:-30, shooters:[{index:0, freq:50},{index:1, freq:50},{index:2, freq:50}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:null,
            time:32
        },
        {type:"circle", 
            wave:{count:8, spaced:20},
            settings:{x:150, y:-30, shooters:[{index:0, freq:50},{index:1, freq:50},{index:2, freq:50}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:null,
            time:36
        },
        {type:"square", 
            wave:{count:8, spaced:20},
            settings:{x:200, y:-30, shooters:[{index:0, freq:50},{index:1, freq:50},{index:2, freq:50}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:null,
            time:40
        },
        {type:"circle", 
            wave:{count:8, spaced:20},
            settings:{x:250, y:-30, shooters:[{index:0, freq:50},{index:1, freq:50},{index:2, freq:50}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:{type:"powerupHalfPower",index:6},
            time:44
        },
        {type:"square", 
            wave:{count:8, spaced:20},
            settings:{x:300, y:-30, shooters:[{index:0, freq:50},{index:1, freq:50},{index:2, freq:50}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:null,
            time:48
        },
        {type:"circle", 
            wave:{count:8, spaced:20},
            settings:{x:350, y:-30, shooters:[{index:0, freq:50},{index:1, freq:50},{index:2, freq:50}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:null,
            time:52
        },
        {type:"bossDecagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:400, points:2000,
                turrets:[   
                    {type:"star",x:0,y:0,freq:30,bulletType:"bullet2"},
                    {type:"triangle",x:80,y:80,freq:90,bulletType:"bullet1"},
                    {type:"triangle",x:-80,y:80,freq:90,bulletType:"bullet1"},
                    {type:"triangle",x:80,y:-80,freq:90,bulletType:"bullet1"},
                    {type:"triangle",x:-80,y:-80,freq:90,bulletType:"bullet1"},
                    {type:"triangle",x:0,y:-80,freq:90,bulletType:"bullet1"},
                    {type:"triangle",x:0,y:80,freq:90,bulletType:"bullet1"},
                    {type:"triangle",x:80,y:0,freq:90,bulletType:"bullet1"},
                    {type:"triangle",x:-80,y:0,freq:90,bulletType:"bullet1"}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:350, rotate:true},
            time:60
        },
        
    ],
    [
        // level 4
        {levelTitle:"Falling Stars",
            type:"star", 
            wave:{count:3, spaced:20},
            settings:{x:50, y:-30, shooters:[{index:0, freq:25, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:3},
            powerup:null,
            time:1
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:300, y:-30}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:3
        },
        {type:"star", 
            wave:{count:3, spaced:60},
            settings:{x:150, y:-30}, 
            movement:{type:"down",speed:2},
            powerup:null,
            time:6
        },
        {type:"square", 
            wave:{count:5, spaced:30},
            settings:{x:830, y:300, shooters:[{index:0, freq:50, bulletType:"bullet1"},{index:1, freq:50, bulletType:"bullet1"},{index:2, freq:50, bulletType:"bullet1"},{index:3, freq:50, bulletType:"bullet1"},{index:4, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"left",speed:4},
            powerup:{type:"powerupHeavy",index:4},
            time:7
        },
        {type:"star", 
            wave:{count:3, spaced:20},
            settings:{x:200, y:-30, shooters:[{index:1, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:3},
            powerup:null,
            time:9
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:550, y:-30}, 
            movement:{type:"down",speed:2},
            powerup:null,
            time:12
        },
        {type:"star", 
            wave:{count:3, spaced:20},
            settings:{x:350, y:-30, shooters:[{index:2, freq:25, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:3},
            powerup:null,         
            time:15
        },
        {type:"circle", 
            wave:{count:5, spaced:30},
            settings:{x:-30, y:400, shooters:[{index:0, freq:50, bulletType:"bullet1"},{index:1, freq:50, bulletType:"bullet1"},{index:2, freq:50, bulletType:"bullet1"},{index:3, freq:50, bulletType:"bullet1"},{index:4, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"right",speed:4},
            powerup:{type:"powerupPower",index:1},
            time:15
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:100, y:-30}, 
            movement:{type:"down",speed:2},
            powerup:null,
            time:18
        },        
        {type:"star", 
            wave:{count:3, spaced:20},
            settings:{x:650, y:-30, shooters:[{index:2, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:3},
            powerup:null,
            time:21
        },        
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:400, y:-30}, 
            movement:{type:"down",speed:2},
            powerup:null,
            time:24
        },
        {type:"star", 
            wave:{count:3, spaced:60},
            settings:{x:450, y:-30, shooters:[{index:1, freq:25, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:27
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:250, y:-30}, 
            movement:{type:"down",speed:2},
            powerup:null,
            time:30
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:750, y:-30, shooters:[{index:0, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:33
        },        
        {type:"star", 
            wave:{count:3, spaced:20},
            settings:{x:500, y:-30}, 
            movement:{type:"down",speed:3},
            powerup:null,
            time:36
        },
        {type:"star", 
            wave:{count:3, spaced:60},
            settings:{x:600, y:-30, shooters:[{index:2, freq:25, bulletType:"bullet1"}]}, 
            movement:{type:"down",speed:3},
            powerup:null,
            time:39
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:700, y:-30}, 
            movement:{type:"down",speed:2},
            powerup:null,
            time:42
        },

        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:100, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:1, freq:60, bulletType:"bullet1"},
                    {index:2, freq:70, bulletType:"bullet1"}
                ]}, 
            movement:{type:"downAndStop", stopAt:200, speed:4},
            powerup:null,
            time:44
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:150, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:1, freq:60, bulletType:"bullet1"},
                    {index:2, freq:70, bulletType:"bullet1"}
                ]}, 
            movement:{type:"downAndStop", stopAt:300, speed:4},
            powerup:null,
            time:44
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:700, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:1, freq:60, bulletType:"bullet1"},
                    {index:2, freq:70, bulletType:"bullet1"}
                ]},  
            movement:{type:"downAndStop", stopAt:300, speed:4},
            powerup:null,
            time:44
        },
        {type:"star", 
            wave:{count:3, spaced:30},
            settings:{x:750, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:1, freq:60, bulletType:"bullet1"},
                    {index:2, freq:70, bulletType:"bullet1"}
                ]}, 
            movement:{type:"downAndStop", stopAt:200, speed:4},
            powerup:null,
            time:44
        },
        {type:"bossSquare", 
            wave:{count:1, spaced:4},
            settings:{x:400, y:-200, points:2000,
                turrets:[   
                    {type:"star",x:-150,y:150,freq:50,bulletType:"bullet2"},
                    {type:"star",x:150,y:150,freq:60,bulletType:"bullet2"},
                    {type:"star",x:-150,y:-150,freq:70,bulletType:"bullet2"},
                    {type:"star",x:150,y:-150,freq:80,bulletType:"bullet2"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:200, rotate:true},
            time:50
        }
    ],
    [
        // level 5
        {levelTitle:"Heavy Artillery",
            type:"circle", 
            wave:{count:5, spaced:30},
            settings:{x:-30, y:300, shooters:[{index:0, freq:35, bulletType:"bullet1"}]}, 
            movement:{type:"right",speed:3},
            powerup:null,
            time:1
        },
        {type:"square", 
            wave:{count:5, spaced:40},
            settings:{x:830, y:400, shooters:[{index:0, freq:35, bulletType:"bullet1"}]}, 
            movement:{type:"left",speed:3},
            powerup:null,
            time:4
        },
        {type:"triangle", 
            wave:{count:5, spaced:50},
            settings:{x:275, y:830, shooters:[{index:0, freq:30, bulletType:"bullet2"}]}, 
            movement:{type:"up",speed:4},
            powerup:null,
            time:10
        },
        {type:"ellipse", 
            wave:{count:5, spaced:20},
            settings:{x:-30, y:200, shooters:[{index:0, freq:30, bulletType:"bullet2"}]}, 
            movement:{type:"right",speed:3},
            powerup:{type:"powerupSuperDouble",index:1},
            time:14
        },
        {type:"pentagon", 
            wave:{count:5, spaced:50},
            settings:{x:830, y:450, shooters:[{index:0, freq:50, bulletType:"bullet3"}]}, 
            movement:{type:"left",speed:2},
            powerup:null,
            time:20
        },
        {type:"bossMiniRhombus", 
            wave:{count:1, spaced:1},
            settings:{x:850, y:550, points:200,
                turrets:[   
                    {type:"rectangle",x:-30,y:0,freq:50,bulletType:"bullet2"},
                    {type:"rectangle",x:30,y:0,freq:100,bulletType:"bullet2"}
                ]
            },
            movement:{type:"leftAndStop", speed:3, stopAt:100, rotate:true},
            time:24
        },
        {type:"bossMiniRhombus", 
            wave:{count:1, spaced:1},
            settings:{x:-50, y:550, points:200,
                turrets:[   
                    {type:"rectangle",x:-30,y:0,freq:50,bulletType:"bullet2"},
                    {type:"rectangle",x:30,y:0,freq:100,bulletType:"bullet2"}
                ]
            },
            movement:{type:"rightAndStop", speed:3, stopAt:700, rotate:true},
            time:24
        },
        {type:"bossMiniRhombus", 
            wave:{count:1, spaced:1},
            settings:{x:400, y:-50, points:200,
                turrets:[   
                    {type:"rectangle",x:-30,y:0,freq:10,bulletType:"bullet1"},
                    {type:"rectangle",x:30,y:0,freq:10,bulletType:"bullet1"}
                ]
            },
            movement:{type:"downAndStop", speed:3, stopAt:200, rotate:false},
            time:26
        },
        {type:"triangle", 
            wave:{count:5, spaced:50},
            settings:{x:275, y:830, shooters:[{index:0, freq:30, bulletType:"bullet3"}]}, 
            movement:{type:"up",speed:4},
            powerup:null,
            time:30
        },
        {type:"ellipse", 
            wave:{count:5, spaced:20},
            settings:{x:-30, y:200, shooters:[{index:0, freq:30, bulletType:"bullet3"}]}, 
            movement:{type:"right",speed:3},
            powerup:{type:"powerupSuperDouble",index:1},
            time:34
        },
        {type:"nonagon", 
            wave:{count:5, spaced:50},
            settings:{x:830, y:450, shooters:[{index:0, freq:50, bulletType:"bullet3"}]}, 
            movement:{type:"left",speed:2},
            powerup:null,
            time:38
        },
        {type:"circle", 
            wave:{count:5, spaced:30},
            settings:{x:-30, y:300, shooters:[{index:0, freq:10, bulletType:"bullet1"}]}, 
            movement:{type:"right",speed:3},
            powerup:null,
            time:44
        },
        {type:"square", 
            wave:{count:5, spaced:40},
            settings:{x:830, y:435, shooters:[{index:0, freq:10, bulletType:"bullet1"}]}, 
            movement:{type:"left",speed:3},
            powerup:null,
            time:48
        },
        {type:"bossTriangle", 
            wave:{count:1, spaced:4},
            settings:{x:1000, y:225, points:2000,
                turrets:[   
                    {type:"rectangle",x:105,y:-105,freq:60,bulletType:"bullet2"},
                    {type:"rectangle",x:75,y:-75,freq:60,bulletType:"bullet2"},
                    {type:"rectangle",x:0,y:100,freq:70,bulletType:"bullet2"},
                    {type:"rectangle",x:-75,y:-75,freq:80,bulletType:"bullet2"},
                    {type:"rectangle",x:-105,y:-105,freq:80,bulletType:"bullet2"}
                ]
            },
            movement:{type:"leftAndStop", speed:4, stopAt:400, rotate:false},
            time:50
        },
        {type:"circle", 
            wave:{count:5, spaced:30},
            settings:{x:-30, y:200, shooters:[{index:0, freq:10, bulletType:"bullet1"}]}, 
            movement:{type:"right",speed:3},
            powerup:null,
            time:54
        },
        {type:"square", 
            wave:{count:5, spaced:40},
            settings:{x:830, y:300, shooters:[{index:0, freq:10, bulletType:"bullet1"}]}, 
            movement:{type:"left",speed:3},
            powerup:null,
            time:54
        }
    ],
    [
        // level 6
        {levelTitle:"Dizzy",
            type:"circle", 
            wave:{count:10, spaced:30},
            settings:{x:-30, y:-30, shooters:[{index:0, freq:35, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",angle:45,speed:2},
            powerup:null,
            time:1
        },
        {type:"circle", 
            wave:{count:10, spaced:30},
            settings:{x:830, y:-30, shooters:[{index:0, freq:35, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",angle:135,speed:2},
            powerup:{type:"powerupSpread",index:9},
            time:1
        },
        {type:"ellipse", 
            wave:{count:20, spaced:25},
            settings:{x:400, y:-30, shooters:[{index:0, freq:50, bulletType:"bullet1"},{index:5, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"looping", r:200, cx:400, cy:400, dir:"down", loops:8, speed:3},
            powerup:null,
            time:5
        },
        {type:"square", 
            wave:{count:20, spaced:25},
            settings:{x:830, y:400, shooters:[{index:0, freq:50, bulletType:"bullet1"},{index:5, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"looping", r:90, cx:400, cy:400, dir:"left", loops:8, speed:4},
            powerup:null,
            time:12
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:400, y:-50, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:25,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:25,bulletType:"bullet1"}
                ]
            },
            movement:{type:"downAndStop", speed:3, stopAt:200, rotate:false},
            time:20
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:-50, y:250, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:25,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:25,bulletType:"bullet1"}
                ]
            },
            movement:{type:"looping", r:75, cx:200, cy:250, dir:"right", loops:8, speed:4, stop:true},
            time:24
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:850, y:250, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:25,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:25,bulletType:"bullet1"}
                ]
            },
            movement:{type:"looping", r:75, cx:600, cy:250, dir:"left", loops:8, speed:4, stop:true},
            time:24
        },
        {type:"circle", 
            wave:{count:10, spaced:30},
            settings:{x:-30, y:-30, shooters:[{index:0, freq:35, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",angle:45,speed:2},
            powerup:null,
            time:30
        },
        {type:"circle", 
            wave:{count:10, spaced:30},
            settings:{x:830, y:-30, shooters:[{index:0, freq:35, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",angle:135,speed:2},
            powerup:{type:"powerupSuperSpread",index:0},
            time:30
        },
        {type:"pentagon", 
            wave:{count:12, spaced:25},
            settings:{x:200, y:-30, shooters:[{index:0, freq:60, bulletType:"bullet1"},{index:5, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"looping", r:150, cx:200, cy:500, dir:"down", loops:8, speed:2, rotate:true},
            powerup:null,
            time:38
        },
        {type:"nonagon", 
            wave:{count:12, spaced:25},
            settings:{x:600, y:-30, shooters:[{index:0, freq:60, bulletType:"bullet1"},{index:5, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"looping", r:150, cx:600, cy:400, dir:"down", loops:1.5, speed:4, rotate:true},
            powerup:null,
            time:48
        },
        {type:"star", 
            wave:{count:12, spaced:25},
            settings:{x:500, y:-30, shooters:[{index:0, freq:60, bulletType:"bullet1"},{index:5, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"looping", r:250, cx:500, cy:300, dir:"down", loops:8, speed:2, rotate:true},
            powerup:null,
            time:55
        },
        {type:"bossTriangle", 
            wave:{count:1, spaced:4},
            settings:{x:400, y:-200, points:2000,
                turrets:[   
                    {type:"nonagon",x:105,y:-105,freq:60,bulletType:"bullet2"},
                    {type:"nonagon",x:75,y:-75,freq:60,bulletType:"bullet2"},
                    {type:"nonagon",x:0,y:100,freq:70,bulletType:"bullet2"},
                    {type:"nonagon",x:-75,y:-75,freq:80,bulletType:"bullet2"},
                    {type:"nonagon",x:-105,y:-105,freq:80,bulletType:"bullet2"}
                ]
            },
            movement:{type:"looping", r:200, cx:400, cy:350, dir:"down", loops:8, speed:2, stop:true},
            time:60
        }
    ],
    [
        // level 7



    ]
    
];
