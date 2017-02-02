var Behaviours = {

    verticalDown:function(sprite){
        sprite.y++;
    },
    verticalUp:function(sprite){
        sprite.y--;
    },
    looping:function(sprite){
        // initializing leftLooping behaviour
        if (!sprite.behaviour.ready) {
            sprite.behaviour.stage = 0;
            if (sprite.behaviour.speed == undefined) sprite.behaviour.speed = 2;
            sprite.behaviour.ready = true;
            //if (sprite.behaviour.dir == "right") sprite.rotation = 180;
        }
        
        if (sprite.behaviour.dir == "left") {
            if (sprite.behaviour.stage == 0) {
                // ENTERING STAGE
                // move shape from left across stage
                sprite.x-=sprite.behaviour.speed;
                // ready to move onto looping stage?
                if (sprite.x <= (sprite.behaviour.cx + sprite.behaviour.r)) sprite.behaviour.stage = 1;
            } else if (sprite.behaviour.stage == 1) {
                // LOOPING STAGE
                // looping in circle - increment rotation of shape
                sprite.rotation+=sprite.behaviour.speed;
                // get current angle of rotation and convert to radians
                var angle = sprite.rotation * (Math.PI/180);
                // calculate X and Y location around circle
                sprite.x = sprite.behaviour.cx + sprite.behaviour.r * Math.cos(angle);
                sprite.y = sprite.behaviour.cy + sprite.behaviour.r * Math.sin(angle);
                // ready to move onto exit stage?
                if (sprite.rotation >= (360 * sprite.behaviour.loops)) sprite.behaviour.stage = 2;
            } else if (sprite.behaviour.stage == 2) {
                // EXIT STAGE
                sprite.x-=sprite.behaviour.speed;
                // off the left of the stage?
                if (sprite.x < -sprite.getBounds().width) return false;
            }
            return true;
        } else {
            if (sprite.behaviour.stage == 0) {
                // ENTERING STAGE
                // move shape from left across stage
                sprite.x+=sprite.behaviour.speed;
                // ready to move onto looping stage?
                if (sprite.x >= (sprite.behaviour.cx - sprite.behaviour.r)) sprite.behaviour.stage = 1;
            } else if (sprite.behaviour.stage == 1) {
                // LOOPING STAGE
                // looping in circle - increment rotation of shape
                sprite.rotation+=sprite.behaviour.speed;
                // get current angle of rotation and convert to radians
                var angle = (sprite.rotation + 180) * (Math.PI/180);
                // calculate X and Y location around circle
                sprite.x = sprite.behaviour.cx + sprite.behaviour.r * Math.cos(angle);
                sprite.y = sprite.behaviour.cy + sprite.behaviour.r * Math.sin(angle);
                // ready to move onto exit stage?
                if (sprite.rotation >= (360 * sprite.behaviour.loops)) sprite.behaviour.stage = 2;
            } else if (sprite.behaviour.stage == 2) {
                // EXIT STAGE
                sprite.x+=sprite.behaviour.speed;
                // off the left of the stage?
                if (sprite.x > Globals.stage.canvas.width + sprite.getBounds().width) return false;
            }
            return true;
        }
    }




};