var levelManifest = [
    [

        
        // LEVEL 1
        /*
        {type:"circle", 
            wave:{count:5, spaced:30},
            settings:{x:500, y:0, hp:4, shooters:[{index:0, freq:48}]}, 
            movement:{type:"down",speed:2}
        },
        {type:"square", 
            wave:{count:2, spaced:20},
            settings:{x:300, y:0, hp:3, shooters:[{index:0, freq:48},{index:1, freq:48}]},
            movement:{type:"looping", r:225, cx:300, cy:300, dir:"down", loops:3, speed:4}
        },
        */
        
        {type:"bigboss_square", 
            wave:{count:1, spaced:4},
            settings:{x:400, y:-200, points:500,
                turrets:[   
                    {type:"circle",x:10,y:10,hp:1,freq:50},
                    {type:"square",x:60,y:60,hp:1,freq:100},
                    {type:"circle",x:100,y:100,hp:1,freq:25},
                    {type:"square",x:150,y:150,hp:1,freq:100}
                ]
            },
            movement:{type:"downAndStop", speed:2, stopY:250, rotate:true}
        }

    ]
    
];
