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
        {type:"square", 
            wave:{count:5, spaced:20},
            settings:{x:100, y:-30, shooters:[{index:0, freq:50, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:{type:"powerupDouble",index:4},
            time:10
        },
        {type:"ellipse", 
            wave:{count:5, spaced:30},
            settings:{x:700, y:-30, shooters:[{index:0, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",speed:4,angle:135},
            powerup:null,
            time:15
        },
        {type:"circle", 
            wave:{count:10, spaced:15},
            settings:{x:200, y:0, shooters:[{index:0, freq:48},{index:1, freq:48}]}, 
            movement:{type:"looping", r:100, cx:200, cy:120, dir:"down", loops:2, speed:4},
            powerup:null,
            time:22
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-50, y:400, points:200, rotation:true,
                turrets:[   
                    {type:"triangle",x:0,y:0,hp:4,freq:25,bulletType:"bullet2"},
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:500, rotate:true},
            time:30
        },
        {type:"square", 
            wave:{count:10, spaced:15},
            settings:{x:300, y:0, rotation:true, shooters:[{index:0, freq:48},{index:1, freq:48}]}, 
            movement:{type:"looping", r:225, cx:300, cy:300, dir:"down", loops:2, speed:4},
            powerup:null,
            time:34
        },
        {type:"triangle", 
            wave:{count:6, spaced:30},
            settings:{x:-30, y:700, shooters:[{index:2, freq:60, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",speed:4,angle:310},
            powerup:null,
            time:40
        },
        {type:"square", 
            wave:{count:5, spaced:20},
            settings:{x:400, y:-50, shooters:[{index:0, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"switch",dir:"down",speed:4,y:625},
            powerup:null,
            time:44
        },
        {type:"ellipse", 
            wave:{count:1, spaced:30},
            settings:{x:650, y:830, shooters:[{index:0, freq:20, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4,stopAt:200},
            powerup:null,
            time:46
        },
        {type:"circle", 
            wave:{count:5, spaced:20},
            settings:{x:400, y:-50}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:50
        },
        {type:"bossHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:250, points:1000,
                turrets:[   
                    {type:"star",x:0,y:0,hp:4,freq:100,bulletType:"bullet2"},
                    {type:"square",x:100,y:100,hp:4,freq:150,bulletType:"bullet1"},
                    {type:"square",x:-100,y:100,hp:4,freq:50,bulletType:"bullet1"},
                    {type:"square",x:100,y:-100,hp:4,freq:200,bulletType:"bullet1"},
                    {type:"circle",x:-100,y:-100,hp:4,freq:125,bulletType:"bullet1"}
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
        {type:"square", 
            wave:{count:5, spaced:20},
            settings:{x:100, y:-30, shooters:[{index:0, freq:50, bulletType:"bullet1"},{index:1, freq:75, bulletType:"bullet1"},{index:2, freq:25, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",speed:4,angle:45},
            powerup:{type:"powerupDouble",index:4},
            time:10
        },
        {type:"ellipse", 
            wave:{count:5, spaced:30},
            settings:{x:700, y:-30, shooters:[{index:0, freq:50, bulletType:"bullet1"},{index:4, freq:100, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",speed:4,angle:135},
            powerup:null,
            time:15
        },
        {type:"circle", 
            wave:{count:10, spaced:15},
            settings:{x:200, y:0, shooters:[{index:0, freq:48},{index:1, freq:48}]}, 
            movement:{type:"looping", r:100, cx:200, cy:120, dir:"down", loops:2, speed:4},
            powerup:null,
            time:22
        },
        {type:"bossMiniHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:250, y:850, points:200,
                turrets:[   
                    {type:"triangle",x:0,y:0,hp:4,freq:25,bulletType:"bullet2"},
                ]
            },
            movement:{type:"upAndStop", speed:2, stopAt:500, rotate:true},
            time:30
        },
        {type:"square", 
            wave:{count:10, spaced:15},
            settings:{x:300, y:0, shooters:[{index:0, freq:48},{index:1, freq:48}]}, 
            movement:{type:"looping", r:225, cx:300, cy:300, dir:"down", loops:2, speed:4},
            powerup:null,
            time:34
        },
        {type:"triangle", 
            wave:{count:5, spaced:30},
            settings:{x:-30, y:700, shooters:[{index:0, freq:25, bulletType:"bullet1"},{index:2, freq:100, bulletType:"bullet1"},{index:4, freq:200, bulletType:"bullet1"}]}, 
            movement:{type:"diagonal",speed:4,angle:310},
            powerup:null,
            time:40
        },
        {type:"square", 
            wave:{count:5, spaced:20},
            settings:{x:400, y:-50, shooters:[{index:0, freq:35, bulletType:"bullet1"},{index:2, freq:55, bulletType:"bullet1"},{index:4, freq:65, bulletType:"bullet1"}]}, 
            movement:{type:"switch",dir:"down",speed:4,y:625},
            powerup:null,
            time:44
        },
        {type:"ellipse", 
            wave:{count:1, spaced:30},
            settings:{x:650, y:830, shooters:[{index:0, freq:20, bulletType:"bullet1"}]}, 
            movement:{type:"upAndStop",speed:4,stopAt:200},
            powerup:null,
            time:46
        },
        {type:"circle", 
            wave:{count:5, spaced:20},
            settings:{x:400, y:-50}, 
            movement:{type:"down",speed:4},
            powerup:null,
            time:50
        },
        {type:"bossHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:250, points:1000,
                turrets:[   
                    {type:"star",x:0,y:0,hp:4,freq:100,bulletType:"bullet2"},
                    {type:"square",x:100,y:100,hp:4,freq:150,bulletType:"bullet1"},
                    {type:"square",x:-100,y:100,hp:4,freq:50,bulletType:"bullet1"},
                    {type:"square",x:100,y:-100,hp:4,freq:200,bulletType:"bullet1"},
                    {type:"circle",x:-100,y:-100,hp:4,freq:125,bulletType:"bullet1"}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:400, rotate:true},
            time:58
        }
    ]
    
];
