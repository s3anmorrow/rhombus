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

// to add:
// shape spawn turret

var levelManifest = [
    [
        // LEVEL 1
        {levelTitle:"Bunny",
            type:"square", 
            wave:{count:10, spaced:20},
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
            wave:{count:15, spaced:30},
            settings:{x:200, y:-30}, 
            movement:{type:"zigzag", angle:55, speed:4, rotate:true},
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
    ],
    [
        {levelTitle:"Crossed",
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
        // level 2
        {levelTitle:"Flipped",
            type:"circle", 
            wave:{count:5, spaced:20},
            settings:{x:200, y:830, shooters:[{index:1, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"up",speed:4},
            powerup:null,
            time:2
        },
        {type:"square", 
            wave:{count:5, spaced:20},
            settings:{x:700, y:830, shooters:[{index:4, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"up",speed:4},
            powerup:{type:"powerupSuperDouble",index:2},
            time:5
        },
        {type:"ellipse", 
            wave:{count:20, spaced:25},
            settings:{x:610, y:830, shooters:[{index:0, freq:30, bulletType:"bullet1"},{index:5, freq:30, bulletType:"bullet1"}]}, 
            movement:{type:"looping", r:100, cx:610, cy:625, dir:"up", loops:4, speed:4},
            powerup:null,
            time:8
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:425, y:850, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:20,bulletType:"bullet1"},
                ]
            },
            movement:{type:"upAndStop", speed:2, stopAt:625, rotate:true},
            time:14
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:125, y:850, points:200,
                turrets:[   
                    {type:"star",x:0,y:0,freq:20,bulletType:"bullet1"},
                ]
            },
            movement:{type:"upAndStop", speed:2, stopAt:625, rotate:true},
            time:16
        },
        {type:"ellipse", 
            wave:{count:10, spaced:10},
            settings:{x:430, y:830, points:200, 
                shooters:[
                    {index:0, freq:35, bulletType:"bullet1"},
                    {index:2, freq:35, bulletType:"bullet1"},
                    {index:6, freq:35, bulletType:"bullet1"},
                    {index:8, freq:35, bulletType:"bullet1"}
                ]},
            movement:{type:"switch", dir:"up", speed:6, switchAt:200, rotate:false},
            time:24
        },
        {type:"square", 
            wave:{count:10, spaced:20},
            settings:{x:200, y:830,
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:2, freq:100, bulletType:"bullet2"},
                    {index:6, freq:50, bulletType:"bullet1"},
                    {index:8, freq:100, bulletType:"bullet2"}
                ]}, 
            movement:{type:"diagonal",speed:4, angle:300, rotate:true},
            powerup:{type:"powerupShield",index:8},
            time:32
        },
        {type:"square", 
            wave:{count:10, spaced:30},
            settings:{x:-30, y:830, shooters:[{index:4, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",speed:4, angle:315, rotate:false},
            powerup:null,
            time:38
        },
        {type:"square", 
            wave:{count:10, spaced:30},
            settings:{x:830, y:830, shooters:[{index:4, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",speed:4, angle:225, rotate:false},
            powerup:{type:"powerupHeavy",index:4},
            time:38
        },
        {type:"triangle", 
            wave:{count:10, spaced:20},
            settings:{x:550, y:830,
                shooters:[
                    {index:0, freq:25, bulletType:"bullet1"},
                    {index:6, freq:50, bulletType:"bullet1"},
                    {index:8, freq:75, bulletType:"bullet1"}
                ]}, 
            movement:{type:"diagonal",speed:4, angle:240},
            powerup:null,
            time:44
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:200, y:850, points:200,
                turrets:[   
                    {type:"triangle",x:0,y:0,freq:30,bulletType:"bullet1"},
                ]
            },
            movement:{type:"diagonalAndStop", angle:315, speed:4, stopAt:625, rotate:true},
            time:50
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:600, y:850, points:200,
                turrets:[   
                    {type:"triangle",x:0,y:0,freq:30,bulletType:"bullet1"},
                ]
            },
            movement:{type:"diagonalAndStop", angle:225, speed:4, stopAt:225, rotate:true},
            time:50
        },
        {type:"bossDecagon", 
            wave:{count:1, spaced:4},
            settings:{x:400, y:1000, points:2000,
                turrets:[   
                    {type:"triangle",x:110,y:110,freq:10,bulletType:"bullet1"},
                    {type:"triangle",x:-110,y:110,freq:10,bulletType:"bullet1"},
                    {type:"triangle",x:110,y:-110,freq:10,bulletType:"bullet1"},
                    {type:"triangle",x:-110,y:-110,freq:10,bulletType:"bullet1"}
                ]
            },
            movement:{type:"upAndStop", speed:2, stopAt:400, rotate:true},
            time:55
        }
    ],
    [
        {levelTitle:"Mimick",
            type:"nonagon", 
            wave:{count:10, spaced:30},
            settings:{x:400, y:830, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:4, freq:100, bulletType:"bullet1"},
                    {index:9, freq:50, bulletType:"bullet1"}
                ]}, 
            movement:{type:"up",speed:2},
            powerup:{type:"powerupHalfPower",index:5},
            time:1
        },
        {type:"nonagon", 
            wave:{count:10, spaced:30},
            settings:{x:635, y:830, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:4, freq:100, bulletType:"bullet1"},
                    {index:9, freq:50, bulletType:"bullet1"}
                ]}, 
            movement:{type:"up",speed:2},
            powerup:{type:"powerupLaser",index:2},
            time:6
        },
        {type:"nonagon", 
            wave:{count:10, spaced:30},
            settings:{x:635, y:830, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:4, freq:100, bulletType:"bullet1"},
                    {index:9, freq:50, bulletType:"bullet1"}
                ]}, 
            movement:{type:"up",speed:2},
            powerup:{type:"powerupLife",index:2},
            time:12
        },
        {type:"pentagon", 
            wave:{count:1, spaced:30},
            settings:{x:100, y:830}, 
            movement:{type:"kamikaze",speed:2, rotate:true},
            powerup:null,
            time:16
        },
        {type:"pentagon", 
            wave:{count:1, spaced:30},
            settings:{x:830, y:-30, 
                shooters:[
                    {index:0, freq:25, bulletType:"bullet1"}
                ]},
            movement:{type:"kamikaze",speed:2, rotate:true},
            powerup:null,
            time:20
        },
        {type:"pentagon", 
            wave:{count:1, spaced:30},
            settings:{x:-30, y:600,
                shooters:[
                    {index:0, freq:25, bulletType:"bullet1"}
                ]},
            movement:{type:"kamikaze",speed:2, rotate:true},
            powerup:null,
            time:24
        },
        {type:"square", 
            wave:{count:14, spaced:20},
            settings:{x:100, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet2"},
                    {index:1, freq:50, bulletType:"bullet2"},
                    {index:2, freq:50, bulletType:"bullet2"}
                ]}, 
            movement:{type:"diagonal",speed:2,angle:60},
            powerup:{type:"powerupBounce",index:10},
            time:30
        },
        {type:"triangle", 
            wave:{count:10, spaced:35},
            settings:{x:-30, y:500}, 
            movement:{type:"looping", r:150, cx:250, cy:500, dir:"right", loops:8, speed:4, rotate:true},
            powerup:null,
            time:35
        },
        {type:"triangle", 
            wave:{count:10, spaced:35},
            settings:{x:830, y:500}, 
            movement:{type:"looping", r:150, cx:550, cy:500, dir:"left", loops:8, speed:4, rotate:true},
            powerup:null,
            time:35
        },
        {type:"triangle", 
            wave:{count:10, spaced:35},
            settings:{x:400, y:-30}, 
            movement:{type:"looping", r:150, cx:400, cy:300, dir:"down", loops:8, speed:4, rotate:true},
            powerup:null,
            time:35
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:850, y:600, points:200,
                turrets:[   
                    {type:"nonagon",x:25,y:-20,freq:100,bulletType:"bullet3"},
                    {type:"nonagon",x:-25,y:-20,freq:50,bulletType:"bullet2"},
                    {type:"nonagon",x:0,y:25,freq:25,bulletType:"bullet1"},
                ]
            },
            movement:{type:"kamikaze", speed:3, rotate:true},
            time:45
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:850, y:50, points:200,
                turrets:[   
                    {type:"nonagon",x:25,y:-20,freq:100,bulletType:"bullet3"},
                    {type:"nonagon",x:-25,y:-20,freq:50,bulletType:"bullet2"},
                    {type:"nonagon",x:0,y:25,freq:25,bulletType:"bullet1"},
                ]
            },
            movement:{type:"kamikaze", speed:3, rotate:true},
            time:50
        },
        {type:"bossTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:-200, y:400, points:5000,
                turrets:[   
                    {type:"nonagon",x:0,y:0,freq:100,bulletType:"bullet2"},
                    {type:"nonagon",x:0,y:-100,freq:50,bulletType:"bullet2"},
                    {type:"nonagon",x:0,y:100,freq:100,bulletType:"bullet2"},
                    {type:"nonagon",x:50,y:-100,freq:50,bulletType:"bullet2"},
                    {type:"nonagon",x:-50,y:-100,freq:100,bulletType:"bullet2"},
                    {type:"nonagon",x:-150,y:-100,freq:50,bulletType:"bullet2"},
                    {type:"nonagon",x:150,y:-100,freq:100,bulletType:"bullet2"}
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:54
        }
    ],
    [
        // LEVEL 3
        {levelTitle:"Walls",
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
            movement:{type:"zigzag",speed:6,angle:45,bounces:6},
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
        {levelTitle:"Starshower",
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
        {levelTitle:"Artillery",
            type:"circle", 
            wave:{count:5, spaced:30},
            settings:{x:-30, y:300, shooters:[{index:0, freq:35, bulletType:"bullet1"}]}, 
            movement:{type:"right",speed:3},
            powerup:{type:"powerupRapid",index:3},
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
        // level 6 - rating 5
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
        // level 7 - rating ?
        {levelTitle:"Vortex",
            type:"square", 
            wave:{count:10, spaced:20},
            settings:{x:830, y:400}, 
            movement:{type:"leftAndStop",speed:6, stopAt:400, rotate:true},
            powerup:null,
            time:2
        },
        {type:"star", 
            wave:{count:8, spaced:20},
            settings:{x:600, y:-30}, 
            movement:{type:"diagonal",speed:6, angle:105, rotate:true},
            powerup:{type:"powerupSuperDouble",index:2},
            time:5
        },        
        {type:"triangle", 
            wave:{count:10, spaced:20},
            settings:{x:-30, y:400, shooters:[{index:1, freq:20, bulletType:"bullet1"},{index:5, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"rightAndStop",speed:6, stopAt:400, rotate:true},
            powerup:null,
            time:7
        },
        {type:"star", 
            wave:{count:10, spaced:20},
            settings:{x:400, y:-30}, 
            movement:{type:"downAndStop",speed:6, stopAt:400, rotate:true},
            powerup:null,
            time:10
        },
        {type:"nonagon", 
            wave:{count:6, spaced:20},
            settings:{x:-30, y:-30, shooters:[{index:2, freq:30, bulletType:"bullet1"},{index:5, freq:15, bulletType:"bullet1"}]}, 
            movement:{type:"diagonalAndStop",angle:45,speed:6, stopAt:400, rotate:true},
            powerup:null,
            time:12
        },
        {type:"star", 
            wave:{count:5, spaced:30},
            settings:{x:-30, y:400}, 
            movement:{type:"looping", r:150, cx:400, cy:400, dir:"right", loops:8, speed:4, stop:true, rotate:true},
            powerup:null,
            time:16
        },
        {type:"star", 
            wave:{count:5, spaced:30},
            settings:{x:830, y:400}, 
            movement:{type:"looping", r:150, cx:400, cy:400, dir:"left", loops:8, speed:4, stop:true, rotate:true},
            powerup:null,
            time:20
        },
        {type:"nonagon", 
            wave:{count:6, spaced:20},
            settings:{x:-30, y:-30, shooters:[{index:2, freq:25, bulletType:"bullet1"},{index:5, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"diagonalAndStop",angle:45,speed:6, stopAt:400, rotate:true},
            powerup:null,
            time:22
        },          
        {type:"star", 
            wave:{count:5, spaced:30},
            settings:{x:400, y:-30}, 
            movement:{type:"looping", r:150, cx:400, cy:400, dir:"down", loops:8, speed:4, stop:true, rotate:true},
            powerup:null,
            time:24
        },
        {type:"star", 
            wave:{count:8, spaced:20},
            settings:{x:250, y:-30}, 
            movement:{type:"diagonal",speed:6, angle:62, rotate:true},
            powerup:{type:"powerupPower",index:2},
            time:26
        },
        {type:"triangle", 
            wave:{count:10, spaced:20},
            settings:{x:-30, y:400, shooters:[{index:0, freq:30, bulletType:"bullet1"},{index:5, freq:40, bulletType:"bullet1"},{index:9, freq:20, bulletType:"bullet1"}]}, 
            movement:{type:"rightAndStop",speed:6, stopAt:400, rotate:true},
            powerup:null,
            time:30
        },
        {type:"nonagon", 
            wave:{count:6, spaced:20},
            settings:{x:-30, y:-30, shooters:[{index:2, freq:30, bulletType:"bullet1"},{index:5, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"diagonalAndStop",angle:45,speed:6, stopAt:400, rotate:true},
            powerup:null,
            time:34
        },  
        {type:"star", 
            wave:{count:5, spaced:40},
            settings:{x:400, y:-30}, 
            movement:{type:"looping", r:150, cx:400, cy:400, dir:"down", loops:8, speed:2, rotate:true},
            powerup:{type:"powerupSpread",index:3},
            time:38
        },
        {type:"star", 
            wave:{count:5, spaced:30},
            settings:{x:400, y:-30}, 
            movement:{type:"looping", r:175, cx:400, cy:400, dir:"down", loops:8, speed:4, rotate:true},
            powerup:null,
            time:42
        },
        {type:"star", 
            wave:{count:8, spaced:20},
            settings:{x:250, y:-30}, 
            movement:{type:"diagonal",speed:6, angle:62, rotate:true},
            powerup:null,
            time:45
        },
        {type:"bossDecagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:-200, points:2000,
                turrets:[   
                    {type:"nonagon",x:0,y:0,freq:30,bulletType:"bullet3"},
                    {type:"nonagon",x:85,y:85,freq:20,bulletType:"bullet3"},
                    {type:"nonagon",x:-85,y:85,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:85,y:-85,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:-85,y:-85,freq:20,bulletType:"bullet3"}
                ]
            },
            movement:{type:"diagonalAndStop", speed:4, angle:45, stopAt:400, rotate:true},
            time:50
        },
        {type:"star", 
            wave:{count:5, spaced:40},
            settings:{x:400, y:-30}, 
            movement:{type:"looping", r:150, cx:400, cy:400, dir:"down", loops:8, speed:3, rotate:true},
            powerup:null,
            time:52
        },
        {type:"star", 
            wave:{count:5, spaced:30},
            settings:{x:400, y:-30}, 
            movement:{type:"looping", r:125, cx:400, cy:400, dir:"down", loops:8, speed:4, rotate:true},
            powerup:null,
            time:54
        }
    ],
    [
        // level 8 - rating 4
        {levelTitle:"Rhombi",
            type:"rhombus", 
            wave:{count:8, spaced:40},
            settings:{x:830, y:400}, 
            movement:{type:"left", speed:2},
            powerup:{type:"powerupSuperBounce",index:0},
            time:2
        },
        {type:"rhombus", 
            wave:{count:20, spaced:30},
            settings:{x:-30, y:300, shooters:[
                {index:0, freq:20, bulletType:"bullet1"},
                {index:3, freq:20, bulletType:"bullet1"},
                {index:6, freq:20, bulletType:"bullet1"},
                {index:9, freq:20, bulletType:"bullet1"},
                {index:12, freq:20, bulletType:"bullet1"},
                {index:15, freq:20, bulletType:"bullet1"},
                {index:18, freq:20, bulletType:"bullet1"}
                ]}, 
            movement:{type:"right", speed:1},
            powerup:null,
            time:10
        },
        {type:"rhombus", 
            wave:{count:20, spaced:40},
            settings:{x:830, y:200, shooters:[
                {index:0, freq:40, bulletType:"bullet2"},
                {index:5, freq:40, bulletType:"bullet2"},
                {index:10, freq:40, bulletType:"bullet2"},
                {index:15, freq:40, bulletType:"bullet2"},
                {index:19, freq:40, bulletType:"bullet2"}
                ]},  
            movement:{type:"left", speed:1},
            powerup:{type:"powerupSuperDouble",index:19},
            time:20
        },
        {type:"rhombus", 
            wave:{count:10, spaced:30},
            settings:{x:175, y:830}, 
            movement:{type:"zigzag", speed:5, angle:300, bounces:4, rotate:true},
            powerup:{type:"powerupShield",index:9},
            time:30
        },
        {type:"bossMiniRhombus", 
            wave:{count:1, spaced:1},
            settings:{x:200, y:-50, points:200,
                turrets:[   
                    {type:"rhombus",x:-20,y:0,freq:25,bulletType:"bullet1"},
                    {type:"rhombus",x:20,y:0,freq:25,bulletType:"bullet1"}
                ]
            },
            movement:{type:"diagonalAndStop", speed:4, angle:25, stopAt:500, rotate:true},
            time:40
        },
        {type:"bossMiniRhombus", 
            wave:{count:1, spaced:1},
            settings:{x:500, y:-50, points:200,
                turrets:[   
                    {type:"rhombus",x:-20,y:0,freq:25,bulletType:"bullet1"},
                    {type:"rhombus",x:20,y:0,freq:25,bulletType:"bullet1"}
                ]
            },
            movement:{type:"diagonalAndStop", speed:2, angle:140, stopAt:200, rotate:true},
            time:44
        },
        {type:"bossMiniRhombus", 
            wave:{count:1, spaced:1},
            settings:{x:400, y:-50, points:200,
                turrets:[   
                    {type:"rhombus",x:-20,y:0,freq:25,bulletType:"bullet1"},
                    {type:"rhombus",x:20,y:0,freq:25,bulletType:"bullet1"}
                ]
            },
            movement:{type:"diagonalAndStop", speed:2, angle:100, stopAt:300, rotate:true},
            time:46
        },
        {type:"bossRhombus", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:300, points:2000,
                turrets:[   
                    {type:"nonagon",x:0,y:0,freq:30,bulletType:"bullet1"},
                    {type:"nonagon",x:85,y:85,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:-85,y:85,freq:30,bulletType:"bullet1"},
                    {type:"nonagon",x:85,y:-85,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:-85,y:-85,freq:30,bulletType:"bullet1"}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:250, rotate:true},
            time:50
        },
        {type:"bossRhombus", 
            wave:{count:1, spaced:4},
            settings:{x:1000, y:300, points:2000,
                turrets:[   
                    {type:"nonagon",x:0,y:0,freq:30,bulletType:"bullet1"},
                    {type:"nonagon",x:85,y:85,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:-85,y:85,freq:30,bulletType:"bullet1"},
                    {type:"nonagon",x:85,y:-85,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:-85,y:-85,freq:30,bulletType:"bullet1"}
                ]
            },
            movement:{type:"leftAndStop", speed:2, stopAt:550, rotate:true},
            time:50
        }
    ],
    [
        // level 9 - rating 4
        {levelTitle:"Cluster",
            type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:200, y:-50, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:20,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:20,bulletType:"bullet1"}
                ]
            },
            movement:{type:"downAndStop", speed:6, stopAt:200, rotate:false},
            time:1
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:500, y:-50, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"downAndStop", speed:6, stopAt:300, rotate:false},
            time:2
        },
        {type:"circle", 
            wave:{count:5, spaced:20},
            settings:{x:830, y:600}, 
            movement:{type:"left",speed:4},
            powerup:{type:"powerupSuperDouble",index:0},
            time:2
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:300, y:850, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"upAndStop", speed:6, stopAt:400, rotate:false},
            time:3
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:850, y:300, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"leftAndStop", speed:6, stopAt:700, rotate:false},
            time:4
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:-50, y:500, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"rightAndStop", speed:6, stopAt:625, rotate:false},
            time:5
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:525, y:850, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"upAndStop", speed:6, stopAt:370, rotate:false},
            time:6
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:425, y:-50, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"downAndStop", speed:6, stopAt:500, rotate:false},
            time:7
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:575, y:850, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"upAndStop", speed:6, stopAt:350, rotate:false},
            time:8
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:-50, y:600, points:200,
                turrets:[   
                    {type:"circle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"circle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"rightAndStop", speed:6, stopAt:400, rotate:false},
            time:9
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:100, y:-50, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet2"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet2"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:500, rotate:true},
            time:20
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:200, y:-50, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet2"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet2"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:400, rotate:true},
            time:20
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:300, y:-50, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet2"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet2"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:300, rotate:true},
            time:20
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:400, y:-50, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet2"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet2"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:200, rotate:true},
            time:20
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:500, y:-50, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet2"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet2"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:300, rotate:true},
            time:20
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:600, y:-50, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet2"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet2"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:400, rotate:true},
            time:20
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:1},
            settings:{x:700, y:-50, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet2"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet2"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:500, rotate:true},
            time:20
        },
        {type:"circle", 
            wave:{count:5, spaced:20},
            settings:{x:830, y:600}, 
            movement:{type:"left",speed:4},
            powerup:{type:"powerupSuperDouble",index:0},
            time:30
        },
        {type:"ellipse", 
            wave:{count:6, spaced:10},
            settings:{x:600, y:-50, points:200, shooters:[{index:0, freq:35, bulletType:"bullet1"}]},
            movement:{type:"switch", dir:"down", speed:6, switchAt:700, rotate:false},
            time:30
        },
        {type:"ellipse", 
            wave:{count:6, spaced:10},
            settings:{x:200, y:-50, points:200, shooters:[{index:0, freq:35, bulletType:"bullet1"}]},
            movement:{type:"switch", dir:"down", speed:6, switchAt:675, rotate:false},
            time:36
        },
        {type:"ellipse", 
            wave:{count:10, spaced:10},
            settings:{x:300, y:-50, points:200, shooters:[{index:0, freq:35, bulletType:"bullet1"}]},
            movement:{type:"switch", dir:"down", speed:6, switchAt:525, rotate:false},
            powerup:{type:"powerupFullPower",index:0},
            time:40
        },
        {type:"ellipse", 
            wave:{count:6, spaced:10},
            settings:{x:350, y:850, points:200, shooters:[{index:0, freq:35, bulletType:"bullet1"}]},
            movement:{type:"switch", dir:"up", speed:6, switchAt:100, rotate:true},
            time:45
        },
        {type:"ellipse", 
            wave:{count:6, spaced:10},
            settings:{x:450, y:850, points:200, shooters:[{index:0, freq:35, bulletType:"bullet1"}]},
            movement:{type:"switch", dir:"up", speed:6, switchAt:100, rotate:true},
            time:50
        },
        {type:"bossHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:300, points:2000,
                turrets:[   
                    {type:"ellipse",x:100,y:100,freq:5,bulletType:"bullet1"},
                    {type:"ellipse",x:-100,y:100,freq:5,bulletType:"bullet1"},
                    {type:"ellipse",x:100,y:-100,freq:5,bulletType:"bullet1"},
                    {type:"ellipse",x:-100,y:-100,freq:5,bulletType:"bullet1"}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:400, rotate:true},
            time:55
        }
    ],
    [
        // level 11 - space invaders
        {levelTitle:"Invaders",
            type:"circle", 
            wave:{count:14, spaced:30},
            settings:{x:-30, y:400, 
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
            movement:{type:"right",speed:4},
            powerup:{type:"powerupRapid",index:8},
            time:2
        },
        {type:"square", 
            wave:{count:8, spaced:50},
            settings:{x:100, y:-30},
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"circle", 
            wave:{count:8, spaced:50},
            settings:{x:150, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:2, freq:50, bulletType:"bullet1"},
                    {index:4, freq:50, bulletType:"bullet1"},
                    {index:6, freq:50, bulletType:"bullet1"},
                ]}, 
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"square", 
            wave:{count:8, spaced:50},
            settings:{x:200, y:-30},
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"circle", 
            wave:{count:8, spaced:50},
            settings:{x:250, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:2, freq:50, bulletType:"bullet1"},
                    {index:4, freq:50, bulletType:"bullet1"},
                    {index:6, freq:50, bulletType:"bullet1"},
                ]}, 
            movement:{type:"down",speed:1},
            powerup:{type:"powerupLife", index:6},
            time:8
        },
        {type:"square", 
            wave:{count:8, spaced:50},
            settings:{x:300, y:-30},
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"circle", 
            wave:{count:8, spaced:50},
            settings:{x:350, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:2, freq:50, bulletType:"bullet1"},
                    {index:4, freq:50, bulletType:"bullet1"},
                    {index:6, freq:50, bulletType:"bullet1"},
                ]}, 
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"square", 
            wave:{count:8, spaced:50},
            settings:{x:400, y:-30},
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"circle", 
            wave:{count:8, spaced:50},
            settings:{x:450, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:2, freq:50, bulletType:"bullet1"},
                    {index:4, freq:50, bulletType:"bullet1"},
                    {index:6, freq:50, bulletType:"bullet1"},
                ]}, 
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"square", 
            wave:{count:8, spaced:50},
            settings:{x:500, y:-30},
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"circle", 
            wave:{count:8, spaced:50},
            settings:{x:550, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:2, freq:50, bulletType:"bullet1"},
                    {index:4, freq:50, bulletType:"bullet1"},
                    {index:6, freq:50, bulletType:"bullet1"},
                ]}, 
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"square", 
            wave:{count:8, spaced:50},
            settings:{x:600, y:-30},
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"circle", 
            wave:{count:8, spaced:50},
            settings:{x:650, y:-30, 
                shooters:[
                    {index:0, freq:50, bulletType:"bullet1"},
                    {index:2, freq:50, bulletType:"bullet1"},
                    {index:4, freq:50, bulletType:"bullet1"},
                    {index:6, freq:50, bulletType:"bullet1"},
                ]}, 
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"square", 
            wave:{count:8, spaced:50},
            settings:{x:700, y:-30},
            movement:{type:"down",speed:1},
            powerup:null,
            time:8
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:850, y:650, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"leftAndStop", speed:4, stopAt:200, rotate:false},
            time:35
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:-50, y:650, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"rightAndStop", speed:4, stopAt:600, rotate:false},
            time:35
        },
        {type:"bossMiniTriangle", 
            wave:{count:1, spaced:1},
            settings:{x:400, y:850, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"upAndStop", speed:4, stopAt:650, rotate:false},
            time:35
        },
        {type:"triangle", 
            wave:{count:10, spaced:30},
            settings:{x:-30, y:550, 
                shooters:[{index:1, freq:75, bulletType:"bullet1"},
                {index:3, freq:75, bulletType:"bullet1"},
                {index:5, freq:75, bulletType:"bullet1"},
                {index:7, freq:75, bulletType:"bullet1"},
                {index:9, freq:75, bulletType:"bullet1"}
                ]}, 
            movement:{type:"looping", r:150, cx:550, cy:550, dir:"right", loops:4.5, speed:2, stop:true, rotate:true},
            powerup:null,
            time:45
        },
        {type:"bossTriangle", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:320, points:2000,
                turrets:[   
                    {type:"nonagon",x:105,y:-105,freq:60,bulletType:"bullet2"},
                    {type:"nonagon",x:75,y:-75,freq:60,bulletType:"bullet2"},
                    {type:"nonagon",x:0,y:100,freq:70,bulletType:"bullet2"},
                    {type:"nonagon",x:-75,y:-75,freq:80,bulletType:"bullet2"},
                    {type:"nonagon",x:-105,y:-105,freq:80,bulletType:"bullet2"}
                ]
            },
            movement:{type:"looping", r:130, cx:400, cy:320, dir:"right", loops:6, speed:2, stop:true, rotate:true},
            time:50
        }
        
    ],
    [
        // level 12
        {levelTitle:"Sandwich",
            type:"ellipse", 
            wave:{count:10, spaced:20},
            settings:{x:830, y:300, 
                shooters:[{index:1, freq:40, bulletType:"bullet1"},{index:8, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"left",speed:4, rotate:false},
            powerup:null,
            time:1
        },
        {type:"ellipse", 
            wave:{count:10, spaced:20},
            settings:{x:-30, y:400, 
                shooters:[{index:1, freq:40, bulletType:"bullet1"},{index:8, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"right",speed:4, rotate:false},
            powerup:{type:"powerupRapid",index:4},
            time:4
        },

        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:100, y:-30, 
                shooters:[{index:0, freq:80, bulletType:"bullet1"}]}, 
            movement:{type:"downAndStop",speed:4, stopAt:100, rotate:true},
            powerup:null,
            time:8
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:200, y:-30, 
                shooters:[{index:0, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"downAndStop",speed:4, stopAt:100, rotate:true},
            powerup:null,
            time:9
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:300, y:-30, 
                shooters:[{index:0, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"downAndStop",speed:4, stopAt:100, rotate:true},
            powerup:null,
            time:10
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:400, y:-30, 
                shooters:[{index:0, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"downAndStop",speed:4, stopAt:100, rotate:true},
            powerup:null,
            time:11
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:500, y:-30, 
                shooters:[{index:0, freq:80, bulletType:"bullet1"}]}, 
            movement:{type:"downAndStop",speed:4, stopAt:100, rotate:true},
            powerup:null,
            time:12
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:600, y:-30, 
                shooters:[{index:0, freq:80, bulletType:"bullet1"}]}, 
            movement:{type:"downAndStop",speed:4, stopAt:100, rotate:true},
            powerup:null,
            time:13
        },
        {type:"rectangle", 
            wave:{count:1, spaced:40},
            settings:{x:700, y:-30, 
                shooters:[{index:0, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"downAndStop",speed:4, stopAt:100, rotate:true},
            powerup:null,
            time:14
        },
        {type:"triangle", 
            wave:{count:8, spaced:20},
            settings:{x:100, y:-30, shooters:[{index:0, freq:50, bulletType:"bullet2"},{index:1, freq:50, bulletType:"bullet2"},{index:2, freq:50, bulletType:"bullet2"}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:{type:"powerupLife",index:7},
            time:22
        },
        {type:"triangle", 
            wave:{count:8, spaced:20},
            settings:{x:700, y:-30, shooters:[{index:0, freq:50, bulletType:"bullet2"},{index:1, freq:50, bulletType:"bullet2"},{index:2, freq:50, bulletType:"bullet2"}]}, 
            movement:{type:"diagonal",speed:4,angle:135},
            powerup:{type:"powerupSuperSpread",index:3},
            time:22
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:700, y:830, 
                shooters:[{index:0, freq:80, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4, stopAt:700, rotate:true},
            powerup:null,
            time:28
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:600, y:830, 
                shooters:[{index:0, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4, stopAt:700, rotate:true},
            powerup:null,
            time:29
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:500, y:830, 
                shooters:[{index:0, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4, stopAt:700, rotate:true},
            powerup:null,
            time:30
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:400, y:830, 
                shooters:[{index:0, freq:80, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4, stopAt:700, rotate:true},
            powerup:null,
            time:31
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:300, y:830, 
                shooters:[{index:0, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4, stopAt:700, rotate:true},
            powerup:{type:"powerupShield",index:3},
            time:32
        },
        {type:"rectangle", 
            wave:{count:1, spaced:20},
            settings:{x:200, y:830, 
                shooters:[{index:0, freq:40, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4, stopAt:700, rotate:true},
            powerup:null,
            time:33
        },
        {type:"rectangle", 
            wave:{count:1, spaced:40},
            settings:{x:100, y:830, 
                shooters:[{index:0, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4, stopAt:700, rotate:true},
            powerup:null,
            time:34
        },
        {type:"bossHexagon", 
            wave:{count:3, spaced:60},
            settings:{x:400, y:-200, points:2000,
                turrets:[   
                    {type:"nonagon",x:100,y:100,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:-100,y:100,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:100,y:-100,freq:20,bulletType:"bullet1"},
                    {type:"nonagon",x:-100,y:-100,freq:20,bulletType:"bullet1"}
                ]
            },
            movement:{type:"downAndStop", speed:2, stopAt:400, rotate:true},
            time:48
        }

    ],
    [
        // level 14 - miniBosses
        {levelTitle:"Blurred",
            type:"triangle", 
            wave:{count:10, spaced:2},
            settings:{x:450, y:830}, 
            movement:{type:"looping", r:200, cx:450, cy:400, dir:"up", loops:2.75, speed:4},
            powerup:{type:"powerupSuperDouble",index:4},
            time:2
        },
        {
            type:"bossMiniTriangle", 
            wave:{count:3, spaced:2},
            settings:{x:850, y:550, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"looping", r:200, cx:500, cy:550, dir:"left", loops:10, speed:2, stop:true, rotate:true},
            time:8
        },
        {type:"bossMiniTriangle", 
            wave:{count:3, spaced:2},
            settings:{x:-50, y:250, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"looping", r:200, cx:300, cy:250, dir:"right", loops:10, speed:2, stop:true, rotate:true},
            time:12
        },
        {type:"circle", 
            wave:{count:10, spaced:40},
            settings:{x:450, y:-30}, 
            movement:{type:"looping", r:200, cx:450, cy:400, dir:"down", loops:1.25, speed:4, rotate:true},
            powerup:null,
            time:20
        },
        {type:"circle", 
            wave:{count:10, spaced:40},
            settings:{x:350, y:-30}, 
            movement:{type:"looping", r:200, cx:350, cy:400, dir:"down", loops:1.75, speed:4, rotate:true},
            powerup:null,
            time:20
        },
        {type:"bossMiniTriangle", 
            wave:{count:3, spaced:2},
            settings:{x:-50, y:600, points:200,
                turrets:[   
                    {type:"nonagon",x:25,y:-20,freq:100,bulletType:"bullet2"},
                    {type:"nonagon",x:-25,y:-20,freq:50,bulletType:"bullet2"},
                    {type:"nonagon",x:0,y:25,freq:25,bulletType:"bullet2"},
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:27
        },
        {type:"bossMiniTriangle", 
            wave:{count:3, spaced:2},
            settings:{x:850, y:600, points:200,
                turrets:[   
                    {type:"nonagon",x:25,y:-20,freq:100,bulletType:"bullet2"},
                    {type:"nonagon",x:-25,y:-20,freq:50,bulletType:"bullet2"},
                    {type:"nonagon",x:0,y:25,freq:25,bulletType:"bullet2"},
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:27
        },
        {type:"rectangle", 
            wave:{count:20, spaced:2},
            settings:{x:750, y:830, shooters:[{index:9, freq:60, bulletType:"bullet1"},{index:19, freq:60, bulletType:"bullet1"}]},
            movement:{type:"diagonal", speed:4, angle:215, rotate:true},
            powerup:{type:"powerupLaser",index:12},
            time:32
        },
        {type:"rectangle", 
            wave:{count:20, spaced:2},
            settings:{x:50, y:830, shooters:[{index:9, freq:60, bulletType:"bullet1"},{index:19, freq:60, bulletType:"bullet1"}]},
            movement:{type:"diagonal", speed:4, angle:300, rotate:true},
            powerup:{type:"powerupShield",index:4},
            time:40
        },
        {type:"bossSquare", 
            wave:{count:5, spaced:4},
            settings:{x:-200, y:-200, points:2000,
                turrets:[   
                    {type:"nonagon",x:0,y:0,freq:35,bulletType:"bullet2"},
                    {type:"nonagon",x:85,y:85,freq:25,bulletType:"bullet2"},
                    {type:"nonagon",x:-85,y:85,freq:35,bulletType:"bullet2"},
                    {type:"nonagon",x:85,y:-85,freq:25,bulletType:"bullet2"},
                    {type:"nonagon",x:-85,y:-85,freq:35,bulletType:"bullet2"}
                ]
            },
            movement:{type:"diagonalAndStop", speed:4, angle:45, stopAt:400, rotate:true},
            time:45
        },
        {type:"bossMiniTriangle", 
            wave:{count:3, spaced:2},
            settings:{x:250, y:850, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:50
        },
        {type:"bossMiniTriangle", 
            wave:{count:3, spaced:2},
            settings:{x:600, y:850, points:200,
                turrets:[   
                    {type:"triangle",x:-20,y:0,freq:40,bulletType:"bullet1"},
                    {type:"triangle",x:20,y:0,freq:40,bulletType:"bullet1"}
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:50
        }
    ],
    [
        // level 15
        {levelTitle:"Kong",
            type:"square", 
            wave:{count:15, spaced:25},
            settings:{x:50, y:-30}, 
            movement:{type:"zigzag", angle:10, speed:7, bounces:10, rotate:false},
            powerup:null,
            time:2
        },
        {type:"ellipse", 
            wave:{count:15, spaced:25},
            settings:{x:100, y:-20, shooters:[
                {index:4, freq:10, bulletType:"bullet1"}
            ]},  
            movement:{type:"zigzag", angle:10, speed:7, bounces:10, rotate:false},
            powerup:{type:"powerupRapid",index:8},
            time:10
        },
        {type:"pentagon", 
            wave:{count:15, spaced:30},
            settings:{x:150, y:-30, shooters:[
                {index:12, freq:10, bulletType:"bullet1"}
            ]},  
            movement:{type:"zigzag", angle:10, speed:8, bounces:10, rotate:false},
            powerup:null,
            time:20
        },
        {type:"nonagon", 
            wave:{count:15, spaced:25},
            settings:{x:200, y:-30, shooters:[
                {index:7, freq:10, bulletType:"bullet1"},
            ]},   
            movement:{type:"zigzag", angle:10, speed:8, bounces:10, rotate:false},
            powerup:{type:"powerupLife",index:4},
            time:30
        },
        {type:"hexagon", 
            wave:{count:12, spaced:35},
            settings:{x:250, y:-30}, 
            movement:{type:"zigzag", angle:10, speed:10, bounces:10, rotate:true},
            powerup:{type:"powerupSuperBounce",index:2},
            time:40
        },
        {type:"rhombus", 
            wave:{count:12, spaced:35},
            settings:{x:300, y:-30, shooters:[
                {index:4, freq:40, bulletType:"bullet3"},
                {index:10, freq:40, bulletType:"bullet3"}
            ]},  
            movement:{type:"zigzag", angle:10, speed:10, bounces:10, rotate:false},
            powerup:{type:"powerupShield",index:0},
            time:50
        },
        {type:"bossRhombus", 
            wave:{count:1, spaced:4},
            settings:{x:100, y:1000, points:5000,
                turrets:[   
                    {type:"nonagon",x:0,y:0,freq:20,bulletType:"bullet2"},
                    {type:"nonagon",x:85,y:85,freq:22,bulletType:"bullet2"},
                    {type:"nonagon",x:-85,y:85,freq:24,bulletType:"bullet2"},
                    {type:"nonagon",x:85,y:-85,freq:26,bulletType:"bullet2"},
                    {type:"nonagon",x:-85,y:-85,freq:28,bulletType:"bullet2"}
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:65
        },
        {type:"bossRhombus", 
            wave:{count:1, spaced:4},
            settings:{x:700, y:1000, points:5000,
                turrets:[   
                    {type:"nonagon",x:0,y:0,freq:30,bulletType:"bullet2"},
                    {type:"nonagon",x:85,y:85,freq:32,bulletType:"bullet2"},
                    {type:"nonagon",x:-85,y:85,freq:34,bulletType:"bullet2"},
                    {type:"nonagon",x:85,y:-85,freq:36,bulletType:"bullet2"},
                    {type:"nonagon",x:-85,y:-85,freq:38,bulletType:"bullet2"}
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:65
        }
    ],
    [
        // level 16
        {levelTitle:"Multiplication!",
            type:"triangle",
            wave:{count:15, spaced:20},
            settings:{x:830, y:400, shooters:[
                {index:14, freq:20, bulletType:"bullet1"}
            ]},   
            movement:{type:"left", speed:4, rotate:true},
            powerup:{type:"powerupLife",index:28},
            time:2
        },
        {type:"circle",
            wave:{count:20, spaced:20},
            settings:{x:-30, y:150, shooters:[
                {index:7, freq:20, bulletType:"bullet1"},
                {index:14, freq:30, bulletType:"bullet1"},
                {index:23, freq:20, bulletType:"bullet1"}
            ]},   
            movement:{type:"right", speed:6, rotate:true},
            powerup:{type:"powerupSuperDouble",index:6},
            time:2
        },
        {type:"ellipse",
            wave:{count:15, spaced:20},
            settings:{x:-30, y:650, shooters:[
                {index:7, freq:20, bulletType:"bullet1"},
                {index:14, freq:30, bulletType:"bullet1"},
                {index:23, freq:20, bulletType:"bullet1"}
            ]},   
            movement:{type:"right", speed:4, rotate:true},
            powerup:{type:"powerupShield",index:28},
            time:16
        },
        {type:"square",
            wave:{count:20, spaced:20},
            settings:{x:830, y:500, shooters:[
                {index:14, freq:20, bulletType:"bullet1"}
            ]},   
            movement:{type:"left", speed:4, rotate:true},
            powerup:{type:"powerupHeavy",index:28},
            time:19
        },
        {type:"bossSquare", 
            wave:{count:1, spaced:4},
            settings:{x:400, y:-200, points:5000,
                turrets:[   
                    {type:"hexagon",x:0,y:0,freq:120,bulletType:"square"},
                    {type:"hexagon",x:45,y:45,freq:60,bulletType:"square"},
                    {type:"nonagon",x:-65,y:60,freq:30,bulletType:"bullet2"},
                    {type:"nonagon",x:60,y:-60,freq:30,bulletType:"bullet2"},
                    {type:"hexagon",x:-45,y:-45,freq:120,bulletType:"square"}
                ]
            },
            movement:{type:"downAndStop", speed:4, stopAt:500, rotate:true},
            time:32
        },
        {type:"bossMiniTriangle", 
            wave:{count:3, spaced:120},
            settings:{x:200, y:850, points:200,
                turrets:[   
                    {type:"nonagon",x:25,y:-20,freq:120,bulletType:"triangle"},
                    {type:"nonagon",x:-25,y:-20,freq:120,bulletType:"triangle"},
                    {type:"nonagon",x:0,y:25,freq:60,bulletType:"bullet1"}
                ]
            },
            movement:{type:"zigzag", angle:280, speed:4, bounces:20, rotate:true},
            time:50
        }
    ],
    [
        // level 17
        {levelTitle:"Trapped!",
            type:"triangle",
            wave:{count:30, spaced:30},
            settings:{x:400, y:-30, shooters:[
                {index:0, freq:15, bulletType:"bullet1"}
            ]},   
            movement:{type:"zigzag", angle:45, speed:8, bounces:20, rotate:true},
            powerup:{type:"powerupDouble",index:28},
            time:2
        },
        {type:"ellipse",
            wave:{count:30, spaced:30},
            settings:{x:375, y:-20, shooters:[
                {index:10, freq:15, bulletType:"bullet1"}
            ]},   
            movement:{type:"zigzag", angle:45, speed:6, bounces:20, rotate:true},
            powerup:null,
            time:14
        },
        {type:"square",
            wave:{count:30, spaced:30},
            settings:{x:400, y:-30, shooters:[
                {index:10, freq:30, bulletType:"bullet2"}
            ]},   
            movement:{type:"zigzag", angle:135, speed:6, bounces:20, rotate:true},
            powerup:{type:"powerupSuperDouble",index:10},
            time:22
        },
        {type:"star",
            wave:{count:30, spaced:30},
            settings:{x:375, y:-30, shooters:[
                {index:10, freq:40, bulletType:"bullet2"}
            ]},   
            movement:{type:"zigzag", angle:135, speed:8, bounces:20, rotate:true},
            powerup:{type:"powerupHeavy",index:10},
            time:30
        },
        {type:"nonagon",
            wave:{count:30, spaced:30},
            settings:{x:425, y:-30, shooters:[
                {index:10, freq:50, bulletType:"bullet3"}
            ]},   
            movement:{type:"zigzag", angle:45, speed:6, bounces:20, rotate:true},
            powerup:{type:"powerupLaser",index:28},
            time:38
        },
        {type:"bossRhombus", 
            wave:{count:1, spaced:4},
            settings:{x:700, y:1000, points:5000,
                turrets:[   
                    {type:"nonagon",x:0,y:0,freq:20,bulletType:"bullet3"},
                    {type:"nonagon",x:85,y:85,freq:22,bulletType:"bullet3"},
                    {type:"nonagon",x:-85,y:85,freq:24,bulletType:"bullet3"},
                    {type:"nonagon",x:85,y:-85,freq:26,bulletType:"bullet3"},
                    {type:"nonagon",x:-85,y:-85,freq:28,bulletType:"bullet3"}
                ]
            },
            movement:{type:"kamikaze", speed:2, rotate:true},
            time:65
        }
    ],
    [
        // the matrix
        // back and forth
        // finale has loads of big bosses

    ]
    
];
