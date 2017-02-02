var Behaviours = {

    down:function(sprite){
        if (!sprite.behaviour.ready) {
            if (sprite.behaviour.speed == undefined) sprite.behaviour.speed = 2;
            sprite.behaviour.ready = true;
        }
        sprite.y+=sprite.behaviour.speed;
        if (sprite.y > Globals.stage.canvas.height + sprite.getBounds().height) return false;
        return true;
    },

    up:function(sprite){
        if (!sprite.behaviour.ready) {
            if (sprite.behaviour.speed == undefined) sprite.behaviour.speed = 2;
            sprite.behaviour.ready = true;
        }
        sprite.y-=sprite.behaviour.speed;
        if (sprite.y <= -sprite.getBounds().height) return false;
        return true;
    },

    left:function(sprite) {
        if (!sprite.behaviour.ready) {
            if (sprite.behaviour.speed == undefined) sprite.behaviour.speed = 2;
            sprite.behaviour.ready = true;
        }
        sprite.x-=sprite.behaviour.speed;
        if (sprite.x <= -sprite.getBounds().width) return false;
        return true;
    },

    right:function(sprite) {
        if (!sprite.behaviour.ready) {
            if (sprite.behaviour.speed == undefined) sprite.behaviour.speed = 2;
            sprite.behaviour.ready = true;
        }
        sprite.x+=sprite.behaviour.speed;
        if (sprite.x >= Globals.stage.canvas.width + sprite.getBounds().width) return false;
        return true;
    },    

    diagonal:function(sprite) {
        if (!sprite.behaviour.ready) {
            if (sprite.behaviour.speed == undefined) sprite.behaviour.speed = 2;
            // adjust rotation of sprite
            sprite.rotation = sprite.behaviour.angle;
            // convert current rotation of object to radians
            var radians = Globals.radianMe(sprite.behaviour.angle);
            // calculating X and Y displacement
            sprite.behaviour.xDisplace = Math.cos(radians) * sprite.behaviour.speed;
            sprite.behaviour.yDisplace = Math.sin(radians) * sprite.behaviour.speed;
            sprite.behaviour.ready = true;
        }
        // move sprite on diagonal
        sprite.x = sprite.x + sprite.behaviour.xDisplace;
        sprite.y = sprite.y + sprite.behaviour.yDisplace;

        // check if object is off the stage
        if ((sprite.x < -sprite.getBounds().width) || (sprite.x > (Globals.stage.canvas.width + sprite.getBounds().width)) || (sprite.y < -sprite.getBounds().height) || (sprite.y > (Globals.stage.canvas.height + sprite.getBounds().height))) return false;
        return true;
    },    

    switch:function(sprite){
        if (!sprite.behaviour.ready) {
            if (sprite.behaviour.speed == undefined) sprite.behaviour.speed = 2;
            sprite.behaviour.stage = 0;
            sprite.behaviour.ready = true;
        }
        if (sprite.behaviour.stage == 0) {
            sprite.y+=sprite.behaviour.speed;
            if (sprite.y >= sprite.behaviour.y) sprite.behaviour.stage = 1;
        } else {
            sprite.y-=sprite.behaviour.speed;
            if (sprite.y <= -sprite.getBounds().height) return false;
        }
    },

    looping:function(sprite){
        // initializing leftLooping behaviour
        if (!sprite.behaviour.ready) {
            sprite.behaviour.stage = 0;
            if (sprite.behaviour.speed == undefined) sprite.behaviour.speed = 2;
            sprite.behaviour.ready = true;
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
                var radians = Globals.radianMe(sprite.rotation);
                // calculate X and Y location around circle
                sprite.x = sprite.behaviour.cx + sprite.behaviour.r * Math.cos(radians);
                sprite.y = sprite.behaviour.cy + sprite.behaviour.r * Math.sin(radians);
                // ready to move onto exit stage?
                if (sprite.rotation >= (360 * sprite.behaviour.loops)) sprite.behaviour.stage = 2;
            } else if (sprite.behaviour.stage == 2) {
                // EXIT STAGE
                sprite.x-=sprite.behaviour.speed;
                // off the left of the stage?
                if (sprite.x < -sprite.getBounds().width) return false;
            }
            return true;
        } else if (sprite.behaviour.dir == "right") {
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
                var radians = Globals.radianMe(sprite.rotation + 180);
                // calculate X and Y location around circle
                sprite.x = sprite.behaviour.cx + sprite.behaviour.r * Math.cos(radians);
                sprite.y = sprite.behaviour.cy + sprite.behaviour.r * Math.sin(radians);
                // ready to move onto exit stage?
                if (sprite.rotation >= (360 * sprite.behaviour.loops)) sprite.behaviour.stage = 2;
            } else if (sprite.behaviour.stage == 2) {
                // EXIT STAGE
                sprite.x+=sprite.behaviour.speed;
                // off the left of the stage?
                if (sprite.x > Globals.stage.canvas.width + sprite.getBounds().width) return false;
            }
            return true;
        } else if (sprite.behaviour.dir == "down") {
            if (sprite.behaviour.stage == 0) {
                // ENTERING STAGE
                // move shape from left across stage
                sprite.y+=sprite.behaviour.speed;
                // ready to move onto looping stage?
                if (sprite.y >= (sprite.behaviour.cy - sprite.behaviour.r)) sprite.behaviour.stage = 1;
            } else if (sprite.behaviour.stage == 1) {
                // LOOPING STAGE
                // looping in circle - increment rotation of shape
                sprite.rotation+=sprite.behaviour.speed;
                // get current angle of rotation and convert to radians
                var radians = Globals.radianMe(sprite.rotation + 270);
                // calculate X and Y location around circle
                sprite.x = sprite.behaviour.cx + sprite.behaviour.r * Math.cos(radians);
                sprite.y = sprite.behaviour.cy + sprite.behaviour.r * Math.sin(radians);
                // ready to move onto exit stage?
                if (sprite.rotation >= (360 * sprite.behaviour.loops)) sprite.behaviour.stage = 2;
            } else if (sprite.behaviour.stage == 2) {
                // EXIT STAGE
                sprite.y+=sprite.behaviour.speed;
                // off the left of the stage?
                if (sprite.y > Globals.stage.canvas.height + sprite.getBounds().height) return false;
            }
            return true;
        }
    }




};