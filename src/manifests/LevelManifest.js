var levelManifest = [
    [

        
        // LEVEL 1
        /*
        {type:"circle", 
            wave:{count:1, spaced:50},
            settings:{x:400, y:800, hp:3, points:100, shooters:[{index:0, freq:100, bulletType:1}]}, 
            movement:{type:"upAndStop",speed:4, stopAt:400},
            time:5
        }/*,
        {type:"pentagon", 
            wave:{count:10, spaced:20},
            settings:{x:300, y:0, hp:3, points:50, shooters:[{index:0, freq:48},{index:1, freq:48}]},
            movement:{type:"looping", r:225, cx:300, cy:300, dir:"down", loops:3, speed:4},
            time:10
        },
        */
        
        {type:"bossHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:250, points:1000,
                turrets:[   
                    {type:"circle",x:0,y:0,hp:4,freq:100},
                    {type:"square",x:100,y:100,hp:4,freq:150,bulletType:2},
                    {type:"square",x:-100,y:100,hp:4,freq:50,bulletType:2},
                    {type:"square",x:100,y:-100,hp:4,freq:200,bulletType:2},
                    {type:"circle",x:-100,y:-100,hp:4,freq:125}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:400, rotate:true},
            time:1
        }

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



    ]
    
];