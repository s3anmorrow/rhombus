var levelManifest = [
    [

        
        // LEVEL 1
        /*
        {type:"square", x:500, y:0, count:5, spaced:10, shooters:[{index:0, freq:48}], movement:{type:"down",speed:6}}
        */

        /*
        {type:"square", x:300, y:0, count:2, spaced:20, shooters:[{index:0, freq:48},{index:1, freq:48}], movement:{type:"looping", r:225, cx:300, cy:300, dir:"down", loops:3, speed:4}}
        */
        

        {type:"bigboss_square", x:400, y:-200, dropped:0, count:1, spaced:4, 
            turrets:[{x:100,y:10},{x:400,y:10}],
            movement:{type:"downAndStop", speed:2, stopY:250, rotate:false}}


    ]
    
];
