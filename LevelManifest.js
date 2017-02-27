var levelManifest = [
    [

        
        // LEVEL 1
        {type:"circle", 
            wave:{count:5, spaced:30},
            settings:{x:500, y:-30, hp:1, points:100, shooters:[{index:0, freq:100}]}, 
            movement:{type:"down",speed:2},
            time:5
        },
        {type:"pentagon", 
            wave:{count:10, spaced:20},
            settings:{x:300, y:0, hp:3, points:50, shooters:[{index:0, freq:48},{index:1, freq:48}]},
            movement:{type:"looping", r:225, cx:300, cy:300, dir:"down", loops:3, speed:4},
            time:10
        },
        
        {type:"bossHexagon", 
            wave:{count:1, spaced:4},
            settings:{x:-200, y:250, points:1000,
                turrets:[   
                    {type:"circle",x:0,y:0,hp:4,freq:100},
                    {type:"square",x:100,y:100,hp:4,freq:150},
                    {type:"square",x:-100,y:100,hp:4,freq:50},
                    {type:"square",x:100,y:-100,hp:4,freq:200},
                    {type:"circle",x:-100,y:-100,hp:4,freq:125}
                ]
            },
            movement:{type:"rightAndStop", speed:2, stopAt:400, rotate:true},
            time:1
        }

    ]
    
];
