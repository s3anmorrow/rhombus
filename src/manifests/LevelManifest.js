/*
"circle": {hp:1,points:50},
"square": {hp:1,points:50},
"triangle": {hp:2,points:100},
"ellipse": {hp:2,points:100},
"pentagon": {hp:3,points:200},
"star": {hp:3,points:200},
"nonagon": {hp:4,points:400},
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
        {type:"circle", 
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
            wave:{count:8, spaced:25},
            settings:{x:550, y:830, shooters:[{index:0, freq:48},{index:1, freq:48}]}, 
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
                    {type:"circle",x:-100,y:-100,freq:125,bulletType:"bullet1"}
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
        {type:"square", 
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
        },
        {type:"square", 
            wave:{count:12, spaced:20},
            settings:{x:400, y:0}, 
            movement:{type:"looping", r:200, cx:400, cy:400, dir:"down", loops:3, speed:4},
            powerup:null,
            time:32
        }
    ],
    [
        // LEVEL 3
        {type:"circle", 
            wave:{count:20, spaced:30},
            settings:{x:-30, y:200, 
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
            movement:{type:"downAndStop", speed:2, stopAt:250, rotate:true},
            time:7
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:300, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:350, rotate:true},
            time:9
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:400, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:350, rotate:true},
            time:11
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:500, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:350, rotate:true},
            time:13
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:600, y:-30, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:35,bulletType:"bullet1"},
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:350, rotate:true},
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
        
    ]
    
];
